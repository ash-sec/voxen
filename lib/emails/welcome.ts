import { emailWrapper, BASE_URL } from "./base";

export function WelcomeEmailTemplate({
  name,
  onboardingUrl,
}: {
  name: string;
  onboardingUrl: string;
}): string {
  const firstName = name.split(" ")[0];

  return emailWrapper(`
    <h1>Welcome to Voxen, ${firstName}! 🎉</h1>
    <p>You're in! Really stoked to have you on board.</p>
    <p>Here's what happens next:</p>

    <ul style="padding-left: 20px; color: #94a3b8; font-size: 15px; line-height: 2;">
      <li>Complete your quick 5-minute onboarding questionnaire</li>
      <li>We'll use your answers to write posts that sound exactly like you</li>
      <li>Your first post arrives this coming Monday morning — ready to copy and paste straight into LinkedIn</li>
    </ul>

    <p>To get everything set up, complete your onboarding now:</p>

    <a href="${onboardingUrl}" class="btn">Complete My Onboarding →</a>

    <hr class="divider" />

    <p style="font-size: 14px;">Posts arrive every Monday, Wednesday and Friday between 7am–10am AEST. Just copy, paste, and post. That's it.</p>

    <p style="font-size: 14px;">If you have any questions at all, just reply to this email — we're real people and we actually read them.</p>

    <p style="font-size: 15px; color: #e2e8f0; margin-top: 24px;">Cheers,<br><strong>The Voxen Team</strong></p>
  `);
}
