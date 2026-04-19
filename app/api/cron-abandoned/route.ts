import { NextRequest } from "next/server";
import {
  getAbandonedPendingTokens,
  getPendingSignup,
  savePendingSignup,
  getSubscriberByEmail,
} from "@/lib/kv";
import { stripe } from "@/lib/stripe";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { AbandonedSignupEmailTemplate } from "@/lib/emails/abandoned-signup";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://voxen.co";

// Check records completed 24–72 hours ago
const MIN_AGE_MS = 24 * 60 * 60 * 1000;  // 24h
const MAX_AGE_MS = 72 * 60 * 60 * 1000;  // 72h (stop chasing after 3 days)

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tokens = await getAbandonedPendingTokens(MIN_AGE_MS, MAX_AGE_MS);

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const token of tokens) {
    try {
      const pending = await getPendingSignup(token);

      // Skip if already sent, no questionnaire, or subscriber already exists
      if (!pending || pending.abandonedEmailSent || !pending.questionnaire) {
        skipped++;
        continue;
      }

      const subscriber = await getSubscriberByEmail(pending.email);
      if (subscriber) {
        // Already subscribed — clean up and skip
        skipped++;
        continue;
      }

      // Recreate a Stripe checkout URL for the abandoned email CTA
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: pending.email,
        line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
        success_url: `${BASE_URL}/account?new=1`,
        cancel_url: `${BASE_URL}/signup?cancelled=true`,
        metadata: {
          name: pending.name,
          email: pending.email,
          profession: pending.profession,
          pendingToken: token,
        },
        subscription_data: {
          metadata: {
            name: pending.name,
            email: pending.email,
            profession: pending.profession,
            pendingToken: token,
          },
        },
      });

      await resend.emails.send({
        from: FROM_EMAIL,
        to: pending.email,
        subject: "Hey, you never finished setting up your Voxen account 👋",
        html: AbandonedSignupEmailTemplate({
          name: pending.name,
          checkoutUrl: session.url!,
        }),
      });

      // Mark as sent so we don't email them again
      await savePendingSignup({ ...pending, abandonedEmailSent: true });
      sent++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${token}: ${msg}`);
      console.error(`Abandoned email failed for token ${token}:`, err);
    }
  }

  return Response.json({ total: tokens.length, sent, skipped, errors });
}
