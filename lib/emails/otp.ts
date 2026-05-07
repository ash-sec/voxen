import { emailWrapper } from "./base";

export function OTPEmailTemplate({ name, code }: { name: string; code: string }): string {
  return emailWrapper(`
    <h1>Verify your email</h1>
    <p>Hey ${name.split(" ")[0]}! Here's your 6-digit verification code to complete your Voxen signup:</p>

    <div class="code-box">
      <div class="otp">${code}</div>
      <p style="font-size:13px; color:#52525b; margin-top:12px; margin-bottom:0;">Expires in 10 minutes</p>
    </div>

    <p style="font-size:13px; color:#52525b;">Didn't request this? You can safely ignore this email.</p>
  `);
}
