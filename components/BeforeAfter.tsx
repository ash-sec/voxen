"use client";

import { useEffect, useRef } from "react";

const beforeItems = [
  "Knowing you should post but never actually doing it",
  "Staring at a blank screen every time you sit down to write",
  "Posting once, going quiet for weeks, losing momentum",
  "Watching competitors build their profile while yours sits idle",
  "Missing referrals and opportunities from people who don't know what you do",
];

const afterItems = [
  "3 ready-to-post LinkedIn posts in your inbox every single week",
  "Posts written in your voice, your industry, your stories",
  "Consistent presence that builds trust with your network over time",
  "Your profile stays active while you focus on running your business",
  "Referrals and inbound leads from people who see you showing up",
];

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            entry.target.classList.remove("section-hidden");

            const cards = entry.target.querySelectorAll(".stagger-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("card-visible");
                card.classList.remove("card-hidden");
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section id="before-after" className="py-24 px-6 bg-white">
      <div ref={sectionRef} className="section-hidden max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge inline-flex mb-4">The Difference</div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a]">
            Your LinkedIn. Before and{" "}
            <span className="gradient-text">after Voxen.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div
            className="stagger-card card-hidden rounded-2xl border p-8"
            style={{ background: "#fef2f2", borderColor: "#fca5a5" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}
              >
                <svg className="w-4 h-4" style={{ color: "#ef4444" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-[#0f172a] font-bold text-lg">Without Voxen</span>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}
                  >
                    <svg className="w-3 h-3" style={{ color: "#ef4444" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-[#475569] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div
            className="stagger-card card-hidden rounded-2xl border p-8"
            style={{ background: "#f0fdf4", borderColor: "#86efac" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#dcfce7", border: "1px solid #86efac" }}
              >
                <svg className="w-4 h-4" style={{ color: "#22c55e" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[#0f172a] font-bold text-lg">With Voxen</span>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#dcfce7", border: "1px solid #86efac" }}
                  >
                    <svg className="w-3 h-3" style={{ color: "#22c55e" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#475569] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
