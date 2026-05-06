"use client";

import Link from "next/link";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden pt-16">
      {/* Radial spotlight — static, no animation */}
      <div className="hero-spotlight" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* LEFT COLUMN */}
          <div className="hero-left flex-1 lg:pr-12">
            {/* Label */}
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-3 h-3 fill-blue-500 flex-shrink-0" viewBox="0 0 10 10">
                <path d="M5 0L10 5L5 10L0 5Z" />
              </svg>
              <span className="text-[#a1a1aa] text-sm uppercase tracking-widest">
                Done-for-you LinkedIn ghostwriting
              </span>
            </div>

            {/* Headline */}
            <h1 className="heading-hero text-white mb-6">
              Your{" "}
              <span className="text-blue-500">LinkedIn.</span>
              <br />
              Written For You.
            </h1>

            {/* Subtext */}
            <p className="text-[#a1a1aa] text-[1.1rem] leading-[1.65] max-w-[420px] mb-8">
              A done-for-you LinkedIn ghostwriting service that handles your content every week. 3 posts written in your voice, delivered straight to your inbox.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                href="/signup"
                className="bg-[#3b82f6] hover:bg-[#2563eb] hover:scale-[1.02] active:scale-[0.99] text-white font-semibold px-6 py-3 rounded-lg transition-[background-color,transform,opacity] duration-200 inline-flex items-center justify-center gap-2 text-base"
              >
                Get Started / $250/month &#8594;
              </Link>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="border border-white/15 hover:border-white/35 hover:bg-white/[0.04] text-white font-semibold px-6 py-3 rounded-lg transition-[border-color,background-color] duration-200 inline-flex items-center justify-center gap-2 text-base"
              >
                See How It Works &#8595;
              </button>
            </div>

            {/* Trust line */}
            <p className="text-[#52525b] text-sm">
              No lock-in contract &nbsp;&bull;&nbsp; Cancel anytime &nbsp;&bull;&nbsp; Setup in 2 minutes
            </p>
          </div>

          {/* RIGHT COLUMN — macOS browser frame */}
          <div className="hero-right flex-1 w-full max-w-[560px] lg:max-w-none">
            <div className="bg-[#111111] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.5)]">

              {/* Top bar */}
              <div className="bg-[#1c1c1c] px-4 py-3 flex items-center gap-3">
                <div className="flex gap-[6px]">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#111111] rounded-[6px] px-3 py-1 max-w-[200px] w-full text-center">
                    <span className="text-[#52525b] text-xs">mail.google.com</span>
                  </div>
                </div>
              </div>

              {/* Email content */}
              <div className="bg-[#0d0d0d] p-5 text-left">
                {/* Email header row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-400">V</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-white">Voxen</span>
                      <span className="text-xs text-[#52525b]">Mon, 7:42 AM</span>
                    </div>
                    <p className="text-xs text-[#71717a] mt-0.5">Your LinkedIn post for today</p>
                  </div>
                </div>

                {/* Intro */}
                <p className="text-[#a1a1aa] text-sm pt-3 mb-3">
                  Morning! Your post&apos;s ready to go
                </p>

                {/* Post preview card */}
                <div className="bg-[#171717] border border-white/[0.06] rounded-lg p-4">
                  <p className="text-[#d4d4d4] text-sm leading-[1.7]">
                    You know you should be posting on LinkedIn.
                  </p>
                  <p className="text-[#d4d4d4] text-sm leading-[1.7] mt-2">
                    Everyone says it. You&apos;ve thought about it yourself a dozen times.
                  </p>
                  <p className="text-[#d4d4d4] text-sm leading-[1.7] mt-2">
                    But then work runs long. Life gets in the way. You sit down to write something and nothing comes out. So you close the tab and tell yourself you&apos;ll do it tomorrow.
                  </p>
                  <p className="text-[#d4d4d4] text-sm leading-[1.7] mt-2">
                    Tomorrow never comes.
                  </p>
                  <p className="text-[#d4d4d4] text-sm leading-[1.7] mt-2">
                    That&apos;s not a you problem. That&apos;s just reality for anyone with an actual job and an actual life.
                  </p>
                  <p className="text-blue-400 text-sm mt-2 leading-[1.7]">
                    What would consistent LinkedIn presence do for your career if someone just handled it for you?
                  </p>
                </div>

                <p className="text-[#52525b] text-xs text-center pt-3">
                  &#8593; This is exactly what lands in your inbox 3x a week
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
