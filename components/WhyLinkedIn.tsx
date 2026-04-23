"use client";

import { useEffect, useRef } from "react";

export default function WhyLinkedIn() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            entry.target.classList.remove("section-hidden");
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div ref={sectionRef} className="section-hidden max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4">Why LinkedIn</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            LinkedIn is the highest ROI platform most professionals{" "}
            <span className="gradient-text">completely ignore.</span>
          </h2>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-400 text-lg leading-relaxed">
            A single post that resonates can bring in new clients, job offers, speaking opportunities and referrals you never saw coming. Recruiters are actively searching it. Decision makers are scrolling it every morning. Your next big opportunity is probably already on there. The only thing standing between you and that is showing up consistently.
          </p>
        </div>
      </div>
    </section>
  );
}
