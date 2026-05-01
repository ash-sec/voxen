"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PROFESSIONS } from "@/lib/types";
import SignupStepIndicator from "@/components/SignupStepIndicator";

type Step = "details" | "verify";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");

  // Details form
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [profession, setProfession] = useState("");
  const [otherProfession, setOtherProfession] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError]     = useState("");

  // OTP form
  const [otp, setOtp]                   = useState("");
  const [otpLoading, setOtpLoading]     = useState(false);
  const [otpError, setOtpError]         = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg]         = useState("");

  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDetailsError("");
    const effectiveProfession = profession === "Other" ? otherProfession.trim() : profession;
    if (!name.trim() || !email.trim() || !profession) {
      setDetailsError("Please fill in all fields.");
      return;
    }
    if (profession === "Other" && !otherProfession.trim()) {
      setDetailsError("Please tell us your profession.");
      return;
    }
    setDetailsLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), profession: effectiveProfession }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send verification code.");
      setStep("verify");
    } catch (err: unknown) {
      setDetailsError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setDetailsLoading(false);
    }
  }

  async function handleOTPSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOtpError("");
    if (otp.length !== 6) {
      setOtpError("Please enter the 6-digit code.");
      return;
    }
    setOtpLoading(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Invalid code.");

      // New flow: store token + basic info in localStorage, then go to questionnaire
      const effectiveProfession = profession === "Other" ? otherProfession.trim() : profession;
      localStorage.setItem("voxen_signup_token", data.signupToken);
      localStorage.setItem(
        "voxen_signup_meta",
        JSON.stringify({ name: name.trim(), email: email.trim(), profession: effectiveProfession })
      );

      router.push("/onboarding?mode=signup");
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setOtpLoading(false);
    }
  }

  async function handleResend() {
    setResendMsg("");
    setResendLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, profession }),
      });
      if (!res.ok) throw new Error("Failed to resend.");
      setResendMsg("New code sent!");
    } catch {
      setResendMsg("Couldn't resend. Try again.");
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "#0f172a" }}
    >
      {/* BG orbs */}
      <div className="orb w-96 h-96 top-0 -right-20 pointer-events-none" style={{ background: "rgba(59,130,246,0.08)" }} />
      <div className="orb w-72 h-72 bottom-10 -left-20 pointer-events-none" style={{ background: "rgba(99,102,241,0.06)", animationDelay: "3s" }} />

      {/* Back to home */}
      <div className="absolute top-5 left-4 sm:top-6 sm:left-6">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: "#ffffff", textShadow: "0 0 20px rgba(59,130,246,0.6)" }}>
              Voxen
            </span>
          </Link>
        </div>

        {/* 3-step macro progress indicator */}
        <SignupStepIndicator currentStep={1} />

        {/* ── Step 1: Details ─────────────────────────────────────────── */}
        {step === "details" && (
          <div className="glass-card p-6 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1.5">Get started</h1>
            <p className="text-slate-400 text-sm mb-6">
              No card required yet — that comes after the questionnaire.
            </p>

            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Mitchell"
                  className="input-field text-base"
                  autoComplete="name"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="input-field text-base"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Profession</label>
                <select
                  value={profession}
                  onChange={(e) => { setProfession(e.target.value); setOtherProfession(""); }}
                  className="input-field text-base appearance-none"
                  style={{ backgroundImage: "none" }}
                >
                  <option value="" disabled>Select your profession</option>
                  {PROFESSIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {profession === "Other" && (
                  <input
                    type="text"
                    value={otherProfession}
                    onChange={(e) => setOtherProfession(e.target.value)}
                    placeholder="What's your profession? e.g. Physiotherapist, Real Estate Agent..."
                    className="input-field text-base mt-2"
                    autoFocus
                  />
                )}
              </div>

              {detailsError && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  {detailsError}
                </p>
              )}

              <button
                type="submit"
                disabled={detailsLoading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2 text-base"
              >
                {detailsLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending code...
                  </>
                ) : (
                  <>
                    Continue
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-5">
              Already a member?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        )}

        {/* ── Step 2: OTP verification ─────────────────────────────────── */}
        {step === "verify" && (
          <div className="glass-card p-6 sm:p-8">
            {/* Back */}
            <button
              onClick={() => { setStep("details"); setOtp(""); setOtpError(""); }}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Change email
            </button>

            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              We sent a 6-digit code to{" "}
              <span className="text-white font-medium break-all">{email}</span>
            </p>

            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Verification code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtp(v);
                  }}
                  placeholder="123456"
                  className="input-field text-2xl tracking-widest text-center"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                  maxLength={6}
                />
              </div>

              {otpError && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  {otpError}
                </p>
              )}

              <button
                type="submit"
                disabled={otpLoading || otp.length !== 6}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-base"
              >
                {otpLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue →"
                )}
              </button>
            </form>

            <div className="text-center mt-5">
              <span className="text-slate-500 text-sm">Didn&apos;t get it? </span>
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend code"}
              </button>
              {resendMsg && <p className="text-slate-400 text-xs mt-2">{resendMsg}</p>}
            </div>
          </div>
        )}

        {/* Trust signals */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-blue-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure & encrypted
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-blue-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Cancel anytime
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-blue-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Powered by Stripe
          </div>
        </div>
      </div>
    </div>
  );
}
