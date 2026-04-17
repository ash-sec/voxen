import { NextRequest } from "next/server";
import { getSessionSubscriber } from "@/lib/auth";
import { updateSubscriber } from "@/lib/kv";
import type { OnboardingAnswers } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const subscriber = await getSessionSubscriber();

    if (!subscriber) {
      return Response.json({ error: "Not authenticated." }, { status: 401 });
    }

    const answers: OnboardingAnswers = await req.json();

    // Basic validation
    if (!answers.jobTitle || !answers.wantKnownFor || !answers.personality) {
      return Response.json({ error: "Missing required onboarding fields." }, { status: 400 });
    }

    await updateSubscriber(subscriber.id, {
      onboarding: answers,
      onboardingCompleted: true,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("onboarding error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subscriber = await getSessionSubscriber();
    if (!subscriber) {
      return Response.json({ error: "Not authenticated." }, { status: 401 });
    }
    return Response.json({ onboarding: subscriber.onboarding ?? null });
  } catch (err) {
    console.error("onboarding GET error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
