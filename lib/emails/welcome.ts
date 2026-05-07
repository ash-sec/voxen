import { emailWrapper, BASE_URL } from "./base";

export function WelcomeEmailTemplate({
  name,
  onboardingUrl,
  onboardingDone = false,
}: {
  name: string;
  onboardingUrl: string;
  onboardingDone?: boolean;
}): string {
  const firstName = name.split(" ")[0];

  if (onboardingDone) {
    return emailWrapper(`
      <h1>Welcome to Voxen, ${firstName}! 🎉</h1>
      <p>You're all set! Your profile is saved and we're already getting your first post ready.</p>

      <ul style="padding-left: 20px; color: #a1a1aa; font-size: 15px; line-height: 2;">
        <li>Your first post arrives this coming Monday morning</li>
        <li>Posts arrive every Monday, Wednesday and Friday between 7am–10am AEST</li>
        <li>Just copy the post from your email and paste it straight into LinkedIn</li>
      </ul>

      <p>You can view your account and manage your subscription anytime:</p>

      <a href="${onboardingUrl}" class="btn">Go to My Account →</a>

      <hr class="divider" />

      <p style="font-size: 14px;">If you have any questions, just reply to this email — we actually read them.</p>

      <p style="font-size: 15px; color: #d4d4d4; margin-top: 24px;">Cheers,<br><strong>The Voxen Team</strong></p>
    `);
  }

  return emailWrapper(`
    <h1>Welcome to Voxen, ${firstName}! 🎉</h1>
    <p>You're in! Really stoked to have you on board.</p>
    <p>Here's what happens next:</p>

    <ul style="padding-left: 20px; color: #a1a1aa; font-size: 15px; line-height: 2;">
      <li>Complete your quick 5-minute onboarding questionnaire</li>
      <li>We'll use your answers to write posts that sound exactly like you</li>
      <li>Your first post arrives this coming Monday morning — ready to copy and paste straight into LinkedIn</li>
    </ul>

    <p>To get everything set up, complete your onboarding now:</p>

    <a href="${onboardingUrl}" class="btn">Complete My Onboarding →</a>

    <hr class="divider" />

    <p style="font-size: 14px;">Posts arrive every Monday, Wednesday and Friday between 7am–10am AEST. Just copy, paste, and post. That's it.</p>

    <p style="font-size: 14px;">If you have any questions at all, just reply to this email — we're real people and we actually read them.</p>

    <p style="font-size: 15px; color: #d4d4d4; margin-top: 24px;">Cheers,<br><strong>The Voxen Team</strong></p>
  `);
}
