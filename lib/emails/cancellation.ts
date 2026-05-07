import { emailWrapper, BASE_URL } from "./base";

export function CancellationEmailTemplate({ name }: { name: string }): string {
  const firstName = name.split(" ")[0];

  return emailWrapper(`
    <h1>Your subscription has been cancelled</h1>
    <p>Hey ${firstName}, we've confirmed your Voxen subscription has been cancelled.</p>

    <p>You'll continue to receive your posts until the end of your current billing period. After that, no further charges will be made.</p>

    <p>We're genuinely sorry to see you go. If there was something we could have done better, we'd love to hear it — just reply to this email.</p>

    <hr class="divider" />

    <p style="font-size: 14px; color: #52525b;">Changed your mind? You can reactivate your subscription anytime from your account page:</p>

    <a href="${BASE_URL}/account" class="btn" style="display:inline-block; margin: 8px 0;">Reactivate My Account</a>

    <p style="font-size: 15px; color: #d4d4d4; margin-top: 24px;">All the best,<br><strong>The Voxen Team</strong></p>
  `);
}
