"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// We get subscriber data from layout via session — but for display we re-fetch
import { useEffect } from "react";

interface BillingInfo {
  name: string;
  status: string;
  nextBillingDate: string;
  signupDate: string;
  profession: string;
}

export default function BillingPage() {
  const router = useRouter();
  const [info, setInfo] = useState<BillingInfo | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => { if (d.subscriber) setInfo(d.subscriber); })
      .catch(() => {});
  }, []);

  async function handleCancel() {
    setCancelError("");
    setCancelLoading(true);
    try {
      const res = await fetch("/api/cancel-subscription", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to cancel.");
      setCancelled(true);
      setShowCancelModal(false);
    } catch (err: unknown) {
      setCancelError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setCancelLoading(false);
    }
  }

  const nextBillingFormatted = info?.nextBillingDate
    ? new Date(info.nextBillingDate).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const signupFormatted = info?.signupDate
    ? new Date(info.signupDate).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
        <p className="text-[#a1a1aa] mt-1">Manage your Voxen subscription.</p>
      </div>

      {cancelled && (
        <div className="glass-card p-5 mb-6" style={{ borderColor: "rgba(34,197,94,0.3)" }}>
          <p className="text-green-400 text-sm font-medium">
            ✓ Your subscription has been cancelled. You&apos;ll continue to receive posts until the end of your current billing period.
          </p>
        </div>
      )}

      {/* Plan details */}
      <div className="glass-card p-6 mb-6">
        <h3 className="text-white font-semibold mb-6">Current Plan</h3>

        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-2xl font-bold text-white">Voxen</p>
            <p className="text-[#a1a1aa] text-sm mt-1">3 posts per week · Mon / Wed / Fri</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">$250</p>
            <p className="text-[#52525b] text-xs">AUD/month</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-5 space-y-3">
          {[
            { label: "Status", value: info?.status === "active" ? "Active" : info?.status === "cancelled" ? "Cancelled" : "—", highlight: true },
            { label: "Next billing date", value: nextBillingFormatted, highlight: false },
            { label: "Member since", value: signupFormatted, highlight: false },
            { label: "Profession", value: info?.profession ?? "—", highlight: false },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-[#a1a1aa] text-sm">{row.label}</span>
              <span className={`text-sm font-medium ${
                row.highlight && info?.status === "active" ? "text-green-400" :
                row.highlight && info?.status === "cancelled" ? "text-red-400" : "text-white"
              }`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* What's included */}
      <div className="glass-card p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">What&apos;s included</h3>
        <ul className="space-y-2.5">
          {[
            "3 LinkedIn posts per week",
            "Posts written in your voice",
            "Delivered Monday, Wednesday & Friday",
            "Email delivery between 7am–10am AEST",
            "Cancel anytime",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-[#a1a1aa]">
              <div className="w-5 h-5 rounded-full bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Cancel */}
      {info?.status !== "cancelled" && !cancelled && (
        <div className="glass-card p-6">
          <h3 className="text-white font-semibold mb-2">Cancel Subscription</h3>
          <p className="text-[#a1a1aa] text-sm mb-4">
            You can cancel at any time. You&apos;ll continue to receive posts until the end of your current billing period.
          </p>
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-[border-color,background-color] duration-200"
          >
            Cancel Subscription
          </button>
        </div>
      )}

      {/* Cancel modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="glass-card p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-3">Cancel your subscription?</h3>
            <p className="text-[#a1a1aa] text-sm mb-6">
              Are you sure? You&apos;ll still receive posts until the end of your current billing period, but no further charges will be made.
            </p>

            {cancelError && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 mb-4">
                {cancelError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={cancelLoading}
                className="flex-1 px-4 py-3 bg-red-500/15 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/25 transition-[background-color] duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {cancelLoading ? "Cancelling..." : "Yes, cancel my subscription"}
              </button>
              <button
                onClick={() => { setShowCancelModal(false); setCancelError(""); }}
                className="flex-1 btn-primary py-3 text-sm"
              >
                Keep My Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
