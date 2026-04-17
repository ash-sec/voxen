"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PERSONALITY_OPTIONS, TOPIC_OPTIONS, AUDIENCE_OPTIONS } from "@/lib/types";
import type { OnboardingAnswers } from "@/lib/types";

const TOTAL_STEPS = 8;

export default function OnboardingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sessionId = searchParams.get("session_id");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({
    topics: [],
  });

  function updateAnswer<K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleTopic(topic: string) {
    const current = answers.topics ?? [];
    if (current.includes(topic)) {
      updateAnswer("topics", current.filter((t) => t !== topic));
    } else {
      updateAnswer("topics", [...current, topic]);
    }
  }

  function canProceed(): boolean {
    switch (step) {
      case 1: return !!answers.jobTitle?.trim();
      case 2: return !!answers.wantKnownFor?.trim();
      case 3: return !!answers.personality;
      case 4: return (answers.topics?.length ?? 0) > 0;
      case 5: return !!answers.frustration?.trim();
      case 6: return !!answers.recentWin?.trim();
      case 7: return !!answers.audience;
      case 8: return true;
      default: return false;
    }
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save onboarding.");
      router.push("/account?welcome=1");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "#0A0F1E" }}
    >
      <div className="orb w-96 h-96 top-0 right-0 pointer-events-none" style={{ background: "rgba(59,130,246,0.07)" }} />
      <div className="orb w-64 h-64 bottom-10 left-0 pointer-events-none" style={{ background: "rgba(99,102,241,0.05)", animationDelay: "3s" }} />

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: "#ffffff", textShadow: "0 0 20px rgba(59,130,246,0.6)" }}>
              Voxen
            </span>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-500">Step {step} of {TOTAL_STEPS}</span>
            <span className="text-xs text-slate-500">{Math.round(progress)}% complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="glass-card p-8">
          {step === 1 && (
            <div className="mb-2">
              <div className="badge inline-flex mb-4">Let&apos;s get to know you</div>
              <h1 className="text-2xl font-bold text-white mb-2">Let&apos;s get to know you</h1>
              <p className="text-slate-400 text-sm">This takes less than 5 minutes and helps us write posts that actually sound like you.</p>
            </div>
          )}

          <div className="mt-6">
            {step === 1 && (
              <div>
                <label className="block text-base font-semibold text-white mb-2">
                  What&apos;s your job title and how long have you been doing it?
                </label>
                <p className="text-slate-500 text-sm mb-4">e.g. &quot;Registered Nurse, 6 years&quot; or &quot;Electrician, 12 years&quot;</p>
                <input
                  type="text"
                  value={answers.jobTitle ?? ""}
                  onChange={(e) => updateAnswer("jobTitle", e.target.value)}
                  placeholder="e.g. Registered Nurse, 6 years"
                  className="input-field"
                  autoFocus
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block text-base font-semibold text-white mb-2">
                  What do you want people to know you for on LinkedIn?
                </label>
                <p className="text-slate-500 text-sm mb-4">Think about your expertise, values, or the impression you want to leave.</p>
                <textarea
                  value={answers.wantKnownFor ?? ""}
                  onChange={(e) => updateAnswer("wantKnownFor", e.target.value)}
                  placeholder="e.g. Being an advocate for better nurse-to-patient ratios and mental health in healthcare..."
                  className="input-field min-h-[120px] resize-none"
                  autoFocus
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="block text-base font-semibold text-white mb-4">
                  How would you describe your personality at work?
                </label>
                <div className="space-y-3">
                  {PERSONALITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateAnswer("personality", opt.value as OnboardingAnswers["personality"])}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        answers.personality === opt.value
                          ? "border-blue-500 bg-blue-500/15 text-white"
                          : "border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <label className="block text-base font-semibold text-white mb-2">
                  What topics do you care most about in your industry?
                </label>
                <p className="text-slate-500 text-sm mb-4">Select all that apply.</p>
                <div className="flex flex-wrap gap-2">
                  {TOPIC_OPTIONS.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => toggleTopic(topic)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                        answers.topics?.includes(topic)
                          ? "border-blue-500 bg-blue-500/15 text-white"
                          : "border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <label className="block text-base font-semibold text-white mb-2">
                  What&apos;s one thing that frustrates you about your industry that you&apos;d be happy to talk about publicly?
                </label>
                <p className="text-slate-500 text-sm mb-4">Be honest — raw authenticity gets engagement.</p>
                <textarea
                  value={answers.frustration ?? ""}
                  onChange={(e) => updateAnswer("frustration", e.target.value)}
                  placeholder="e.g. The lack of support for new grads during their first year on the ward..."
                  className="input-field min-h-[120px] resize-none"
                  autoFocus
                />
              </div>
            )}

            {step === 6 && (
              <div>
                <label className="block text-base font-semibold text-white mb-2">
                  Tell us about a recent win, challenge or moment at work.
                </label>
                <p className="text-slate-500 text-sm mb-4">Real stories make the best posts. Doesn&apos;t need to be huge.</p>
                <textarea
                  value={answers.recentWin ?? ""}
                  onChange={(e) => updateAnswer("recentWin", e.target.value)}
                  placeholder="e.g. Last week a patient I'd been treating for months finally got to go home — it was a tough case and the whole team was emotional..."
                  className="input-field min-h-[120px] resize-none"
                  autoFocus
                />
              </div>
            )}

            {step === 7 && (
              <div>
                <label className="block text-base font-semibold text-white mb-4">
                  Who is your ideal LinkedIn audience?
                </label>
                <div className="space-y-3">
                  {AUDIENCE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateAnswer("audience", opt.value as OnboardingAnswers["audience"])}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        answers.audience === opt.value
                          ? "border-blue-500 bg-blue-500/15 text-white"
                          : "border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 8 && (
              <div>
                <label className="block text-base font-semibold text-white mb-2">
                  Any words, phrases or slang you use regularly at work? <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <p className="text-slate-500 text-sm mb-4">e.g. &quot;arvo&quot;, &quot;on the tools&quot;, &quot;double shift&quot;, &quot;knock off time&quot;</p>
                <input
                  type="text"
                  value={answers.slang ?? ""}
                  onChange={(e) => updateAnswer("slang", e.target.value)}
                  placeholder="e.g. arvo, smoko, on the tools, knock off"
                  className="input-field"
                  autoFocus
                />
              </div>
            )}
          </div>

          {error && (
            <p className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            <button
              onClick={() => { setStep((s) => s - 1); setError(""); }}
              disabled={step === 1}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>

            {step < TOTAL_STEPS ? (
              <button
                onClick={() => { if (canProceed()) { setStep((s) => s + 1); setError(""); } }}
                disabled={!canProceed()}
                className="btn-primary px-8 py-3 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary px-8 py-3 text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    All Done! Let&apos;s Go 🚀
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
