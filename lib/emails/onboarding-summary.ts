import { emailWrapper, BASE_URL } from "./base";
import type { OnboardingAnswers } from "../types";

const PERSONALITY_LABELS: Record<string, string> = {
  straight: "Straight to the point",
  warm: "Warm and supportive",
  funny: "Funny and casual",
  passionate: "Passionate and motivated",
};

const AUDIENCE_LABELS: Record<string, string> = {
  professionals: "Other professionals in my field",
  employers: "Employers and recruiters",
  public: "General public",
  clients: "Future clients",
};

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid rgba(59,130,246,0.08); vertical-align: top; width: 38%;">
        <span style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">${label}</span>
      </td>
      <td style="padding: 10px 0 10px 16px; border-bottom: 1px solid rgba(59,130,246,0.08); vertical-align: top;">
        <span style="font-size: 14px; color: #e2e8f0;">${value}</span>
      </td>
    </tr>
  `;
}

export function OnboardingSummaryEmailTemplate({
  name,
  profession,
  answers,
  checkoutUrl,
}: {
  name: string;
  profession: string;
  answers: OnboardingAnswers;
  checkoutUrl: string;
}): string {
  const firstName = name.split(" ")[0];

  return emailWrapper(`
    <h1>Your Voxen profile is ready ✅</h1>
    <p>Nice one, ${firstName}! We've saved everything and your profile is set up. Here's a summary of what we've got:</p>

    <div style="background: #0a1525; border: 1px solid rgba(59,130,246,0.2); border-radius: 12px; padding: 20px; margin: 24px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        ${row("Name", name)}
        ${row("Profession", profession)}
        ${row("Job title", answers.jobTitle)}
        ${row("Personality", PERSONALITY_LABELS[answers.personality] ?? answers.personality)}
        ${row("Topics", answers.topics.join(", "))}
        ${row("Audience", AUDIENCE_LABELS[answers.audience] ?? answers.audience)}
        ${answers.slang ? row("Your lingo", answers.slang) : ""}
      </table>
    </div>

    <p>We'll use all of this to write posts that genuinely sound like you. The first one will be crafted based on this exact profile.</p>

    <p>One last thing — complete your subscription to start receiving your posts:</p>

    <a href="${checkoutUrl}" class="btn" style="display:inline-block; margin: 8px 0;">Complete My Subscription →</a>

    <hr class="divider" />

    <p style="font-size: 14px; color: #64748b;">If you have any questions before subscribing, just reply to this email. We actually read them.</p>

    <p style="font-size: 15px; color: #e2e8f0; margin-top: 24px;">Cheers,<br><strong>The Voxen Team</strong></p>
  `);
}
