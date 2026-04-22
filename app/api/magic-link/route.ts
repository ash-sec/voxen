import { NextRequest } from "next/server";
import { getSubscriberByEmail, saveMagicSession } from "@/lib/kv";
import { resend, FROM_EMAIL, REPLY_TO } from "@/lib/resend";
import { MagicLinkEmailTemplate } from "@/lib/emails/magic-link";
import { generateToken } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://voxen.co";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    const subscriber = await getSubscriberByEmail(email);

    // Always respond with success to avoid leaking which emails are registered
    if (!subscriber) {
      return Response.json({ success: true });
    }

    const token = generateToken();

    await saveMagicSession(token, {
      email: email.toLowerCase(),
      subscriberId: subscriber.id,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });

    const loginUrl = `${BASE_URL}/login/verify?token=${token}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,
      to: email.toLowerCase(),
      subject: "Your Voxen login link 🔑",
      html: MagicLinkEmailTemplate({ name: subscriber.name, loginUrl }),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("magic-link error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
