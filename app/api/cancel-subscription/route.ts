import { NextRequest } from "next/server";
import { getSessionSubscriber } from "@/lib/auth";
import { updateSubscriber, removeFromActiveSet } from "@/lib/kv";
import { stripe } from "@/lib/stripe";

export async function POST(_req: NextRequest) {
  try {
    const subscriber = await getSessionSubscriber();

    if (!subscriber) {
      return Response.json({ error: "Not authenticated." }, { status: 401 });
    }

    if (!subscriber.subscriptionId) {
      return Response.json({ error: "No active subscription found." }, { status: 400 });
    }

    if (subscriber.status === "cancelled") {
      return Response.json({ error: "Subscription is already cancelled." }, { status: 400 });
    }

    // Cancel at period end so they keep access until billing date
    await stripe.subscriptions.update(subscriber.subscriptionId, {
      cancel_at_period_end: true,
    });

    await updateSubscriber(subscriber.id, { status: "cancelled" });
    await removeFromActiveSet(subscriber.id);

    return Response.json({ success: true });
  } catch (err) {
    console.error("cancel-subscription error:", err);
    return Response.json({ error: "Failed to cancel subscription. Please contact support." }, { status: 500 });
  }
}
