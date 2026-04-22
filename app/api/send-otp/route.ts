import { NextRequest } from "next/server";
import { saveOTP } from "@/lib/kv";
import { resend, FROM_EMAIL, REPLY_TO } from "@/lib/resend";
import { generateOTP } from "@/lib/utils";
import { OTPEmailTemplate } from "@/lib/emails/otp";

export async function POST(req: NextRequest) {
  try {
    const { name, email, profession } = await req.json();

    if (!name || !email || !profession) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();
    const code = generateOTP();

    await saveOTP({
      email: emailLower,
      code,
      name: name.trim(),
      profession,
      expiresAt: Date.now() + 10 * 60 * 1000,
      verified: false,
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,
      to: emailLower,
      subject: `${code} — Your Voxen verification code`,
      html: OTPEmailTemplate({ name: name.trim(), code }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("send-otp error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
