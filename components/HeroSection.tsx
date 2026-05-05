"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.classList.add("section-visible");
      el.classList.remove("section-hidden");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-[#f8fafc]">
      {/* Spline 3D background */}
      <div className="spline-container">
        <Spline scene="https://prod.spline.design/Np8i19dTabN-ENaj/scene.splinecode" />
        <div className="spline-fade" />
      </div>

      {/* Hero content */}
      <div ref={heroRef} className="section-hidden relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="badge">
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
            Done-for-you LinkedIn ghostwriting
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
          <span className="gradient-text">Your LinkedIn.</span>
          <br />
          <span className="text-[#0f172a]">Written For You.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed mb-10">
          A done-for-you LinkedIn ghostwriting service that handles your content every week. 3 posts written in your voice, delivered straight to your inbox.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
          <Link
            href="/signup"
            className="btn-primary text-base px-8 py-3.5 inline-flex items-center justify-center gap-2"
          >
            Get Started &mdash; $250/month
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="px-8 py-3.5 rounded-[10px] border-2 border-[#0f172a] text-[#0f172a] text-base font-semibold bg-white/80 hover:bg-white transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            See How It Works
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Trust line */}
        <p className="text-sm text-[#94a3b8] mb-16">
          No lock-in contract &nbsp;&bull;&nbsp; Cancel anytime &nbsp;&bull;&nbsp; Setup in 2 minutes
        </p>

        {/* Mock email preview */}
        <div className="max-w-xl mx-auto">
          <div className="email-preview">
            {/* Gmail-style header */}
            <div className="px-4 py-3 flex items-center gap-3 border-b border-[#e2e8f0] bg-[#f1f5f9]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-[#94a3b8] text-left border border-[#e2e8f0]">
                mail.google.com
              </div>
            </div>

            {/* Email content */}
            <div className="p-5 text-left bg-white">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#dbeafe] border border-[#bfdbfe]">
                  <span className="text-xs font-bold text-[#2563eb]">V</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[#0f172a]">Voxen</span>
                    <span className="text-xs text-[#94a3b8]">Mon, 7:42 AM</span>
                  </div>
                  <p className="text-xs text-[#475569] mt-0.5">Your LinkedIn post for today 📝</p>
                </div>
              </div>

              <div className="text-sm space-y-2">
                <p className="text-[#94a3b8] text-xs">Morning! Your post&apos;s ready to go 👇</p>
                <div className="border border-[#e2e8f0] rounded-lg p-4 mt-2 bg-[#f8fafc]">
                  <p className="text-[#0f172a] text-sm leading-relaxed">
                    You know you should be posting on LinkedIn.
                  </p>
                  <p className="text-[#0f172a] text-sm leading-relaxed mt-2">
                    Everyone says it. You&apos;ve thought about it yourself a dozen times.
                  </p>
                  <p className="text-[#0f172a] text-sm leading-relaxed mt-2">
                    But then work runs long. Life gets in the way. You sit down to write something and nothing comes out. So you close the tab and tell yourself you&apos;ll do it tomorrow.
                  </p>
                  <p className="text-[#0f172a] text-sm leading-relaxed mt-2">
                    Tomorrow never comes.
                  </p>
                  <p className="text-[#0f172a] text-sm leading-relaxed mt-2">
                    That&apos;s not a you problem. That&apos;s just reality for anyone with an actual job and an actual life.
                  </p>
                  <p className="text-sm mt-2 text-[#2563eb]">
                    What would consistent LinkedIn presence do for your career if someone just handled it for you?
                  </p>
                </div>
                <p className="text-[#94a3b8] text-xs mt-3">Just copy and paste this straight into LinkedIn.</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#94a3b8] mt-3">
            ↑ This is exactly what lands in your inbox 3x a week
          </p>
        </div>
      </div>
    </section>
  );
}
