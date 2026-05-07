import { emailWrapper, BASE_URL } from "./base";

export function AbandonedSignupEmailTemplate({
  name,
  checkoutUrl,
}: {
  name: string;
  checkoutUrl: string;
}): string {
  const firstName = name.split(" ")[0];

  return emailWrapper(`
    <h1>Hey ${firstName}, you never finished setting up 👋</h1>
    <p>Noticed you filled in your profile but didn't quite make it to the subscription step. No stress — life gets busy.</p>

    <p>Your profile and questionnaire answers are all saved. You're literally one click away from having 3 LinkedIn posts land in your inbox every week.</p>

    <p>Just pick up where you left off:</p>

    <a href="${checkoutUrl}" class="btn" style="display:inline-block; margin: 8px 0;">Complete My Subscription →</a>

    <hr class="divider" />

    <p style="font-size: 14px; color: #52525b;">Not interested? No worries — you won't hear from us again after this.</p>
    <p style="font-size: 14px; color: #52525b;">Got questions? Reply to this email and we'll sort it out.</p>

    <p style="font-size: 15px; color: #d4d4d4; margin-top: 24px;">Cheers,<br><strong>The Voxen Team</strong></p>
  `);
}
