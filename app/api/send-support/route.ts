import { NextRequest } from "next/server";
import { resend, FROM_EMAIL, SUPPORT_EMAIL } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: SUPPORT_EMAIL,
      replyTo: email,
      subject: `[Voxen Support] Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">New Support Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; border-left: 4px solid #3B82F6;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("send-support error:", err);
    return Response.json({ error: "Failed to send message. Please email us directly." }, { status: 500 });
  }
}
