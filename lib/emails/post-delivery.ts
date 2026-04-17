import { emailWrapper, BASE_URL } from "./base";

export function PostDeliveryEmailTemplate({
  name,
  post,
  opener,
  dayOfWeek,
}: {
  name: string;
  post: string;
  opener: string;
  dayOfWeek: string;
}): string {
  // Convert line breaks to HTML paragraphs
  const postHtml = post
    .split(/\n\n+/)
    .map((para) => `<p style="color: #e2e8f0; font-size: 15px; line-height: 1.7; margin-bottom: 12px;">${para.replace(/\n/g, "<br>")}</p>`)
    .join("");

  return emailWrapper(`
    <p style="font-size: 15px; color: #94a3b8;">${opener}</p>

    <div class="post-box">
      ${postHtml}
    </div>

    <p style="font-size: 14px; color: #64748b; margin-top: 4px;">
      📋 Just copy and paste this straight into LinkedIn.
    </p>

    <hr class="divider" />

    <p style="font-size: 14px; color: #475569;">Cheers,<br><strong style="color: #94a3b8;">The Voxen Team</strong></p>

    <p style="font-size: 12px; color: #334155; margin-top: 16px;">
      <a href="${BASE_URL}/account" style="color: #475569;">Manage your subscription</a> ·
      <a href="${BASE_URL}/account/billing" style="color: #475569;">Billing</a>
    </p>
  `);
}
