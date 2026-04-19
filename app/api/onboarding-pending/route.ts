import { NextRequest } from "next/server";
import { getPendingSignup, savePendingSignup, indexPendingSignup } from "@/lib/kv";
import { stripe } from "@/lib/stripe";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { OnboardingSummaryEmailTemplate } from "@/lib/emails/onboarding-summary";
import type { OnboardingAnswers } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://voxen.co";

export async function POST(req: NextRequest) {
  try {
    const { signupToken, answers }: { signupToken: string; answers: OnboardingAnswers } =
      await req.json();

    if (!signupToken || !answers) {
      return Response.json({ error: "Missing signupToken or answers." }, { status: 400 });
    }

    // Validate required fields
    if (!answers.jobTitle || !answers.wantKnownFor || !answers.personality) {
      return Response.json({ error: "Missing required onboarding fields." }, { status: 400 });
    }

    const pending = await getPendingSignup(signupToken);
    if (!pending) {
      return Response.json(
        { error: "Session expired. Please start again from the signup page." },
        { status: 400 }
      );
    }

    const questionnaireCompletedAt = Date.now();

    // Save questionnaire answers to the pending record
    const updatedPending = {
      ...pending,
      questionnaire: answers,
      questionnaireCompletedAt,
    };
    await savePendingSignup(updatedPending);

    // Index for abandoned-flow cron (score = questionnaire completion time)
    await indexPendingSignup(signupToken, questionnaireCompletedAt);

    // Create Stripe Checkout session
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
        pendingToken: signupToken,
      },
      subscription_data: {
        metadata: {
          name: pending.name,
          email: pending.email,
          profession: pending.profession,
          pendingToken: signupToken,
        },
      },
    });

    // Send "Your Voxen profile is ready" email (fire-and-forget — don't block checkout)
    resend.emails.send({
      from: FROM_EMAIL,
      to: pending.email,
      subject: "Your Voxen profile is ready ✅",
      html: OnboardingSummaryEmailTemplate({
        name: pending.name,
        profession: pending.profession,
        answers,
        checkoutUrl: session.url!,
      }),
    }).catch((err) => console.error("onboarding-summary email failed:", err));

    return Response.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("onboarding-pending error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
