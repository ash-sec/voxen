"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated background orbs */}
      <div
        className="orb w-96 h-96 top-10 -left-20"
        style={{
          background: "rgba(59,130,246,0.12)",
          animationDelay: "0s",
        }}
      />
      <div
        className="orb w-80 h-80 top-40 right-0"
        style={{
          background: "rgba(99,102,241,0.1)",
          animationDelay: "2s",
        }}
      />
      <div
        className="orb w-64 h-64 bottom-20 left-1/3"
        style={{
          background: "rgba(59,130,246,0.08)",
          animationDelay: "4s",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="badge">
            <svg className="w-3 h-3 mr-1.5 text-blue-400" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
            Done-for-you LinkedIn ghostwriting
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
          <span className="gradient-text">Your LinkedIn.</span>
          <br />
          <span className="text-white">Written For You.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          A done-for-you LinkedIn ghostwriting service that handles your content every week. 3 posts written in your voice, delivered straight to your inbox.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/signup"
            className="btn-primary text-base px-8 py-3.5 inline-flex items-center justify-center gap-2"
          >
            Get Started — $250/month
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="px-8 py-3.5 rounded-[10px] border border-white/10 text-white text-base font-semibold hover:border-blue-500/40 hover:bg-white/5 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            See How It Works
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Mock email preview */}
        <div className="max-w-xl mx-auto">
          <div className="email-preview shadow-2xl shadow-blue-500/10">
            {/* Gmail-style header */}
            <div className="bg-[#0f1a2e] px-4 py-3 flex items-center gap-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 bg-[#0a1220] rounded-md px-3 py-1 text-xs text-slate-500 text-left">
                mail.google.com
              </div>
            </div>

            {/* Email preview content */}
            <div className="p-5 text-left">
              {/* Email header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                  <span className="text-xs font-bold text-blue-400">V</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white">Voxen</span>
                    <span className="text-xs text-slate-500">Mon, 7:42 AM</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Your LinkedIn post for today 📝</p>
                </div>
              </div>

              {/* Email body */}
              <div className="text-sm text-slate-300 space-y-2">
                <p className="text-slate-400 text-xs">Morning! Your post's ready to go 👇</p>
                <div className="bg-[#0a1525] border border-blue-500/20 rounded-lg p-4 mt-2">
                  <p className="text-slate-200 text-sm leading-relaxed">
                    You know you should be posting on LinkedIn.
                  </p>
                  <p className="text-slate-200 text-sm leading-relaxed mt-2">
                    Everyone says it. You've thought about it yourself a dozen times.
                  </p>
                  <p className="text-slate-200 text-sm leading-relaxed mt-2">
                    But then work runs long. Life gets in the way. You sit down to write something and nothing comes out. So you close the tab and tell yourself you'll do it tomorrow.
                  </p>
                  <p className="text-slate-200 text-sm leading-relaxed mt-2">
                    Tomorrow never comes.
                  </p>
                  <p className="text-slate-200 text-sm leading-relaxed mt-2">
                    That's not a you problem. That's just reality for anyone with an actual job and an actual life.
                  </p>
                  <p className="text-blue-400 text-sm mt-2">
                    What would consistent LinkedIn presence do for your career if someone just handled it for you?
                  </p>
                </div>
                <p className="text-slate-400 text-xs mt-3">Just copy and paste this straight into LinkedIn.</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            ↑ This is exactly what lands in your inbox 3x a week
          </p>
        </div>
      </div>
    </section>
  );
}
