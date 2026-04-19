import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  saveSubscriber,
  getSubscriberByEmail,
  updateSubscriber,
  removeFromActiveSet,
  getPendingSignup,
  deletePendingSignup,
} from "@/lib/kv";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { WelcomeEmailTemplate } from "@/lib/emails/welcome";
import { CancellationEmailTemplate } from "@/lib/emails/cancellation";
import { generateId, randomSendTime } from "@/lib/utils";
import Stripe from "stripe";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://voxen.co";

/** billing_cycle_anchor is the closest we have to "next billing date" in the new Stripe API */
function getBillingDate(subscription: Stripe.Subscription): string {
  const anchor = subscription.billing_cycle_anchor * 1000;
  const now = Date.now();
  if (anchor > now) {
    return new Date(anchor).toISOString();
  }
  return new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription") break;

        const { name, email, profession, pendingToken } = session.metadata ?? {};
        if (!name || !email || !profession) break;

        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const nextBilling = getBillingDate(subscription);
        const { sendHour, sendMinute } = randomSendTime();

        // Load questionnaire answers from the pending signup record if available
        let questionnaire = undefined;
        let onboardingCompleted = false;

        if (pendingToken) {
          const pending = await getPendingSignup(pendingToken);
          if (pending?.questionnaire) {
            questionnaire = pending.questionnaire;
            onboardingCompleted = true;
          }
          // Clean up pending record
          await deletePendingSignup(pendingToken);
        }

        const subscriber = {
          id: generateId(),
          name,
          email: email.toLowerCase(),
          profession,
          plan: "voxen-monthly",
          subscriptionId,
          stripeCustomerId: customerId,
          status: "active" as const,
          signupDate: new Date().toISOString(),
          onboardingCompleted,
          onboarding: questionnaire,
          nextBillingDate: nextBilling,
          sendHour,
          sendMinute,
        };

        await saveSubscriber(subscriber);

        // Welcome email — onboarding is already done, so no onboarding CTA
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email.toLowerCase(),
          subject: "Welcome to Voxen 👋 You're all set!",
          html: WelcomeEmailTemplate({
            name,
            onboardingUrl: onboardingCompleted
              ? `${BASE_URL}/account`
              : `${BASE_URL}/onboarding`,
            onboardingDone: onboardingCompleted,
          }),
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const email = subscription.metadata?.email;
        if (!email) break;

        const sub = await getSubscriberByEmail(email);
        if (!sub) break;

        await updateSubscriber(sub.id, { status: "cancelled" });
        await removeFromActiveSet(sub.id);

        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: "Your Voxen subscription has been cancelled",
          html: CancellationEmailTemplate({ name: sub.name }),
        });

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const email = subscription.metadata?.email;
        if (!email) break;

        const sub = await getSubscriberByEmail(email);
        if (!sub) break;

        const status =
          subscription.status === "active" ? "active" :
          subscription.status === "canceled" ? "cancelled" : "past_due";

        await updateSubscriber(sub.id, {
          status,
          nextBillingDate: getBillingDate(subscription),
        });

        if (status === "cancelled") {
          await removeFromActiveSet(sub.id);
        }

        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return Response.json({ error: "Handler error." }, { status: 500 });
  }

  return Response.json({ received: true });
}
