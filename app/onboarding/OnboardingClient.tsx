"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PERSONALITY_OPTIONS, TOPIC_OPTIONS, AUDIENCE_OPTIONS } from "@/lib/types";
import type { OnboardingAnswers } from "@/lib/types";
import SignupStepIndicator from "@/components/SignupStepIndicator";

const TOTAL_STEPS = 8;
const LS_ANSWERS_KEY = "voxen_signup_answers";

// ── Autosave indicator ────────────────────────────────────────────────────────
function SavedIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      className="flex items-center gap-1.5 text-xs text-green-400 transition-all duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden={!visible}
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Progress saved
    </div>
  );
}

// ── Celebration / transition screen ──────────────────────────────────────────
function CelebrationScreen({
  checkoutUrl,
  onProceed,
}: {
  checkoutUrl: string;
  onProceed: () => void;
}) {
  const [phase, setPhase] = useState<"celebrate" | "reveal">("celebrate");

  useEffect(() => {
    const t = setTimeout(() => setPhase("reveal"), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "#000000" }}>
      <div className="relative z-10 w-full max-w-md text-center">
        {/* Celebration phase */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: phase === "celebrate" ? 1 : 0,
            transform: phase === "celebrate" ? "scale(1)" : "scale(0.95)",
            pointerEvents: phase === "celebrate" ? "auto" : "none",
            position: phase === "reveal" ? "absolute" : "relative",
          }}
        >
          {/* Animated check */}
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "2px solid rgba(59,130,246,0.4)",
              boxShadow: "0 0 40px rgba(59,130,246,0.3)",
            }}
          >
            <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            You&apos;re all set! 🎉
          </h1>
          <p className="text-[#a1a1aa] text-base">
            Taking you to the final step...
          </p>

          {/* Animated dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#3B82F6",
                  opacity: 0.4,
                  animation: `blink 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Reveal phase — social proof + CTA */}
        <div
          className="transition-all duration-600"
          style={{
            opacity: phase === "reveal" ? 1 : 0,
            transform: phase === "reveal" ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Testimonial social proof */}
          <div className="glass-card p-5 mb-6 text-left">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 star" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[#d4d4d4] text-sm leading-relaxed mb-3">
              &ldquo;Within three weeks I had two recruiters message me out of nowhere. Never would&apos;ve happened without Voxen keeping my profile active.&rdquo;
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-400">JT</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Jake T.</p>
                <p className="text-[#52525b] text-xs">Electrician · Sydney, NSW</p>
              </div>
            </div>
          </div>

          {/* Social proof bar */}
          <div
            className="flex items-center justify-center gap-2 mb-6 py-3 px-4 rounded-xl"
            style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}
          >
            <div className="flex -space-x-1.5">
              {["SM", "PK", "JT", "RN", "EB"].map((initials, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400"
                  style={{ fontSize: "9px" }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-[#a1a1aa] text-xs">
              <span className="text-white font-semibold">200+</span> Aussie professionals already posting
            </p>
          </div>

          {/* Final CTA */}
          <button
            onClick={onProceed}
            className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
          >
            Complete My Subscription
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <p className="text-[#52525b] text-xs mt-3">$250 AUD/month · Cancel anytime · Powered by Stripe</p>
        </div>
      </div>
    </div>
  );
}

// ── Main questionnaire ────────────────────────────────────────────────────────
export default function OnboardingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignupMode = searchParams.get("mode") === "signup";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedVisible, setSavedVisible] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Initial state ────────────────────────────────────────────────────────
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined" && isSignupMode) {
      try {
        const saved = localStorage.getItem(LS_ANSWERS_KEY);
        if (saved) return JSON.parse(saved) as Partial<OnboardingAnswers>;
      } catch {/* ignore */}
    }
    return { topics: [] };
  });

  // ── Auto-save to localStorage ────────────────────────────────────────────
  const triggerSaved = useCallback(() => {
    setSavedVisible(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSavedVisible(false), 2000);
  }, []);

  useEffect(() => {
    if (!isSignupMode) return;
    try {
      localStorage.setItem(LS_ANSWERS_KEY, JSON.stringify(answers));
      triggerSaved();
    } catch {/* ignore */}
  // Only save when answers change, not on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, isSignupMode]);

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

  // ── Submit ───────────────────────────────────────────────────────────────
  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      if (isSignupMode) {
        // Pre-payment path — save to pending record and get checkout URL
        const signupToken = localStorage.getItem("voxen_signup_token");
        if (!signupToken) {
          throw new Error("Session expired. Please start again from the signup page.");
        }

        const res = await fetch("/api/onboarding-pending", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ signupToken, answers }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to save your answers.");

        // Clear localStorage answers (keep token until payment)
        localStorage.removeItem(LS_ANSWERS_KEY);

        setCheckoutUrl(data.checkoutUrl);
        setCelebrating(true);
      } else {
        // Post-payment path — update existing subscriber
        const res = await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to save onboarding.");
        router.push("/account?welcome=1");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // ── Celebration overlay handlers ─────────────────────────────────────────
  function handleProceedToPayment() {
    if (checkoutUrl) window.location.href = checkoutUrl;
  }

  const qProgress = (step / TOTAL_STEPS) * 100;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Celebration overlay */}
      {celebrating && (
        <CelebrationScreen
          checkoutUrl={checkoutUrl}
          onProceed={handleProceedToPayment}
        />
      )}

      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden"
        style={{ background: "#000000" }}
      >
        <div className="w-full max-w-lg relative z-10">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link href="/">
              <span className="text-2xl font-bold text-white">
                Voxen
              </span>
            </Link>
          </div>

          {/* Macro step indicator (signup mode only) */}
          {isSignupMode && <SignupStepIndicator currentStep={2} />}

          {/* Questionnaire progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#52525b]">
                Question {step} of {TOTAL_STEPS}
              </span>
              <div className="flex items-center gap-3">
                <SavedIndicator visible={savedVisible && isSignupMode} />
                <span className="text-xs text-[#52525b]">{Math.round(qProgress)}%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${qProgress}%` }} />
            </div>
          </div>

          {/* Card */}
          <div className="glass-card p-6 sm:p-8">
            {step === 1 && (
              <div className="mb-4">
                <div className="badge inline-flex mb-3">Let&apos;s get to know you</div>
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Let&apos;s get to know you</h1>
                <p className="text-[#a1a1aa] text-sm">This takes less than 5 minutes and helps us write posts that actually sound like you.</p>
              </div>
            )}

            {/* ── Questions ────────────────────────────────────────── */}
            <div className={step === 1 ? "" : "mt-2"}>

              {step === 1 && (
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-white mb-1.5">
                    What&apos;s your job title and how long have you been doing it?
                  </label>
                  <p className="text-[#52525b] text-xs sm:text-sm mb-3">e.g. &quot;Registered Nurse, 6 years&quot; or &quot;Electrician, 12 years&quot;</p>
                  <input
                    type="text"
                    value={answers.jobTitle ?? ""}
                    onChange={(e) => updateAnswer("jobTitle", e.target.value)}
                    placeholder="e.g. Registered Nurse, 6 years"
                    className="input-field text-base"
                    autoFocus
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-white mb-1.5">
                    What do you want people to know you for on LinkedIn?
                  </label>
                  <p className="text-[#52525b] text-xs sm:text-sm mb-3">Your expertise, values, or the impression you want to leave.</p>
                  <textarea
                    value={answers.wantKnownFor ?? ""}
                    onChange={(e) => updateAnswer("wantKnownFor", e.target.value)}
                    placeholder="e.g. Being an advocate for better nurse-to-patient ratios and mental health in healthcare..."
                    className="input-field text-base min-h-[110px] resize-none"
                    autoFocus
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                    How would you describe your personality at work?
                  </label>
                  <div className="space-y-2.5">
                    {PERSONALITY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateAnswer("personality", opt.value as OnboardingAnswers["personality"])}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 text-sm sm:text-base ${
                          answers.personality === opt.value
                            ? "border-blue-500 bg-blue-500/15 text-white"
                            : "border-white/10 text-[#a1a1aa] hover:border-white/20 active:bg-white/5"
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
                  <label className="block text-sm sm:text-base font-semibold text-white mb-1.5">
                    What topics do you care most about?
                  </label>
                  <p className="text-[#52525b] text-xs sm:text-sm mb-3">Select all that apply.</p>
                  <div className="flex flex-wrap gap-2">
                    {TOPIC_OPTIONS.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`px-3 py-2 rounded-full text-sm border transition-all duration-200 ${
                          answers.topics?.includes(topic)
                            ? "border-blue-500 bg-blue-500/15 text-white"
                            : "border-white/10 text-[#a1a1aa] hover:border-white/20 active:bg-white/5"
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
                  <label className="block text-sm sm:text-base font-semibold text-white mb-1.5">
                    What frustrates you about your industry that you&apos;d talk about publicly?
                  </label>
                  <p className="text-[#52525b] text-xs sm:text-sm mb-3">Be honest — raw authenticity gets engagement.</p>
                  <textarea
                    value={answers.frustration ?? ""}
                    onChange={(e) => updateAnswer("frustration", e.target.value)}
                    placeholder="e.g. The lack of support for new grads during their first year on the ward..."
                    className="input-field text-base min-h-[110px] resize-none"
                    autoFocus
                  />
                </div>
              )}

              {step === 6 && (
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-white mb-1.5">
                    Tell us about a recent win, challenge or moment at work.
                  </label>
                  <p className="text-[#52525b] text-xs sm:text-sm mb-3">Real stories make the best posts. Doesn&apos;t need to be huge.</p>
                  <textarea
                    value={answers.recentWin ?? ""}
                    onChange={(e) => updateAnswer("recentWin", e.target.value)}
                    placeholder="e.g. Last week a patient I'd been treating for months finally got to go home..."
                    className="input-field text-base min-h-[110px] resize-none"
                    autoFocus
                  />
                </div>
              )}

              {step === 7 && (
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                    Who is your ideal LinkedIn audience?
                  </label>
                  <div className="space-y-2.5">
                    {AUDIENCE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateAnswer("audience", opt.value as OnboardingAnswers["audience"])}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 text-sm sm:text-base ${
                          answers.audience === opt.value
                            ? "border-blue-500 bg-blue-500/15 text-white"
                            : "border-white/10 text-[#a1a1aa] hover:border-white/20 active:bg-white/5"
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
                  <label className="block text-sm sm:text-base font-semibold text-white mb-1.5">
                    Any slang or phrases you use at work?{" "}
                    <span className="text-[#52525b] font-normal">(optional)</span>
                  </label>
                  <p className="text-[#52525b] text-xs sm:text-sm mb-3">e.g. &quot;arvo&quot;, &quot;on the tools&quot;, &quot;double shift&quot;</p>
                  <input
                    type="text"
                    value={answers.slang ?? ""}
                    onChange={(e) => updateAnswer("slang", e.target.value)}
                    placeholder="e.g. arvo, smoko, on the tools, knock off"
                    className="input-field text-base"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 leading-relaxed">
                {error}
                {error.includes("Session expired") && (
                  <div className="mt-2">
                    <Link href="/signup" className="text-blue-400 underline text-xs">
                      Start again →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-7 pt-5 border-t border-white/5 gap-3">
              <button
                onClick={() => { setStep((s) => s - 1); setError(""); }}
                disabled={step === 1}
                className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-[color] duration-200 disabled:opacity-30 disabled:cursor-not-allowed min-h-[44px] px-2"
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
                  className="btn-primary px-6 sm:px-8 py-3 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
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
                  className="btn-primary px-6 sm:px-8 py-3 text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
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
                      {isSignupMode ? "All done — let's go! 🚀" : "Save my profile"}
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
    </>
  );
}
