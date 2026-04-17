import { getSessionSubscriber } from "@/lib/auth";

export async function GET() {
  try {
    const subscriber = await getSessionSubscriber();
    if (!subscriber) {
      return Response.json({ error: "Not authenticated." }, { status: 401 });
    }
    // Return safe subset (no internal IDs)
    return Response.json({
      subscriber: {
        name: subscriber.name,
        email: subscriber.email,
        profession: subscriber.profession,
        status: subscriber.status,
        plan: subscriber.plan,
        signupDate: subscriber.signupDate,
        nextBillingDate: subscriber.nextBillingDate,
        onboardingCompleted: subscriber.onboardingCompleted,
      },
    });
  } catch (err) {
    console.error("/api/me error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
