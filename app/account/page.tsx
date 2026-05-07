import { getSessionSubscriber } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { nextDeliveryDay } from "@/lib/utils";

export default async function AccountPage() {
  const subscriber = await getSessionSubscriber();
  if (!subscriber) redirect("/login");

  const firstName = subscriber.name.split(" ")[0];
  const nextDelivery = nextDeliveryDay();

  const nextBillingFormatted = subscriber.nextBillingDate
    ? new Date(subscriber.nextBillingDate).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Hey {firstName} 👋
        </h1>
        <p className="text-[#a1a1aa] mt-1">Here&apos;s what&apos;s happening with your account.</p>
      </div>

      {/* Status + delivery cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* Subscription status */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Subscription</h3>
            <span className={`badge text-xs ${
              subscriber.status === "active"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
              {subscriber.status === "active" ? "Active" : "Cancelled"}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">Voxen</p>
          <p className="text-[#a1a1aa] text-sm mt-1">$250 AUD / month</p>
          <p className="text-[#52525b] text-xs mt-3">
            Next billing: <span className="text-[#a1a1aa]">{nextBillingFormatted}</span>
          </p>
        </div>

        {/* Next post */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <h3 className="text-white font-semibold">Next Post</h3>
          </div>
          <p className="text-2xl font-bold text-white">{nextDelivery}</p>
          <p className="text-[#a1a1aa] text-sm mt-1">Between 7am – 10am AEST</p>
          <p className="text-[#52525b] text-xs mt-3">
            3 posts per week · Mon · Wed · Fri
          </p>
        </div>
      </div>

      {/* Profile details */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold">My Profile</h3>
          <Link
            href="/onboarding"
            className="text-sm text-[#3b82f6] hover:text-white transition-[color] duration-200 flex items-center gap-1"
          >
            Update profile
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Name", value: subscriber.name },
            { label: "Email", value: subscriber.email },
            { label: "Profession", value: subscriber.profession },
            { label: "Plan", value: "Voxen — $250 AUD/month" },
            {
              label: "Member since",
              value: new Date(subscriber.signupDate).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            },
            {
              label: "Onboarding",
              value: subscriber.onboardingCompleted ? "Completed ✓" : "Not completed",
            },
          ].map((row, i) => (
            <div key={i}>
              <p className="text-xs text-[#52525b] mb-0.5">{row.label}</p>
              <p className="text-sm text-white font-medium">{row.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding CTA if not done */}
      {!subscriber.onboardingCompleted && (
        <div
          className="glass-card p-6"
          style={{ borderColor: "rgba(59,130,246,0.3)" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-1">Complete your onboarding</h4>
              <p className="text-[#a1a1aa] text-sm mb-4">
                To start receiving your posts, we need to know a bit about you. It takes less than 5 minutes.
              </p>
              <Link href="/onboarding" className="btn-primary text-sm inline-flex items-center gap-2 px-6 py-2.5">
                Complete Onboarding →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
