import { NextRequest } from "next/server";
import { getAllActiveSubscriberIds, getSubscriber } from "@/lib/kv";
import { generateLinkedInPost } from "@/lib/claude";
import { resend, FROM_EMAIL, REPLY_TO, randomSubjectLine, randomOpener } from "@/lib/resend";
import { PostDeliveryEmailTemplate } from "@/lib/emails/post-delivery";
import { getCurrentDayName, getAESTHour } from "@/lib/utils";

// Only runs Mon/Wed/Fri — Vercel cron handles the schedule
// But we also double-check the day and honour per-subscriber send windows

export async function GET(req: NextRequest) {
  // Validate cron secret to prevent unauthorised access
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dayOfWeek = getCurrentDayName();

  // Only send on Mon/Wed/Fri
  const sendDays = ["Monday", "Wednesday", "Friday"];
  if (!sendDays.includes(dayOfWeek)) {
    return Response.json({ message: `Not a send day (${dayOfWeek}). Skipping.` });
  }

  const subscriberIds = await getAllActiveSubscriberIds();

  // Get current AEST hour using Australia/Sydney timezone (handles DST automatically)
  const aestHour = getAESTHour();

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const id of subscriberIds) {
    try {
      const subscriber = await getSubscriber(id);

      if (!subscriber || subscriber.status !== "active") {
        skipped++;
        continue;
      }

      if (!subscriber.onboardingCompleted || !subscriber.onboarding) {
        skipped++;
        continue;
      }

      // Check if this subscriber's send window matches current AEST hour
      if (subscriber.sendHour !== undefined && subscriber.sendHour !== aestHour) {
        skipped++;
        continue;
      }

      const post = await generateLinkedInPost(
        subscriber.name,
        subscriber.profession,
        subscriber.onboarding,
        dayOfWeek
      );

      const opener = randomOpener();
      const subject = randomSubjectLine(dayOfWeek);

      await resend.emails.send({
        from: FROM_EMAIL,
        replyTo: REPLY_TO,
        to: subscriber.email,
        subject,
        html: PostDeliveryEmailTemplate({
          name: subscriber.name,
          post,
          opener,
          dayOfWeek,
        }),
      });

      sent++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${id}: ${msg}`);
      console.error(`Post delivery failed for ${id}:`, err);
    }
  }

  return Response.json({
    day: dayOfWeek,
    aestHour,
    total: subscriberIds.length,
    sent,
    skipped,
    errors,
  });
}
