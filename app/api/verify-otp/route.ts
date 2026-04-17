import { NextRequest } from "next/server";
import { getOTP, deleteOTP } from "@/lib/kv";
import { stripe } from "@/lib/stripe";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://voxen.co";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return Response.json({ error: "Missing email or code." }, { status: 400 });
    }

    const record = await getOTP(email);

    if (!record) {
      return Response.json(
        { error: "Code expired or not found. Please request a new one." },
        { status: 400 }
      );
    }

    if (Date.now() > record.expiresAt) {
      await deleteOTP(email);
      return Response.json({ error: "Code has expired. Please request a new one." }, { status: 400 });
    }

    if (record.code !== code.toString().trim()) {
      return Response.json({ error: "Incorrect code. Please try again." }, { status: 400 });
    }

    // Mark as verified
    record.verified = true;
    await deleteOTP(email);

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email.toLowerCase(),
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${BASE_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/signup?cancelled=true`,
      metadata: {
        name: record.name,
        email: email.toLowerCase(),
        profession: record.profession,
      },
      subscription_data: {
        metadata: {
          name: record.name,
          email: email.toLowerCase(),
          profession: record.profession,
        },
      },
    });

    return Response.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("verify-otp error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
