import { emailWrapper } from "./base";

export function MagicLinkEmailTemplate({
  name,
  loginUrl,
}: {
  name: string;
  loginUrl: string;
}): string {
  const firstName = name.split(" ")[0];

  return emailWrapper(`
    <h1>Your login link 🔑</h1>
    <p>Hey ${firstName}! Click the button below to sign in to your Voxen account. This link expires in 15 minutes.</p>

    <a href="${loginUrl}" class="btn" style="display:inline-block; margin: 8px 0;">Sign in to Voxen →</a>

    <hr class="divider" />

    <p style="font-size: 13px; color: #52525b;">If you didn't request this, you can safely ignore this email. Your account is secure.</p>

    <p style="font-size: 13px; color: #52525b; margin-top: 8px;">
      Or copy and paste this URL into your browser:<br>
      <span style="color: #3B82F6; word-break: break-all;">${loginUrl}</span>
    </p>
  `);
}
