"use client";

import { useEffect, useRef } from "react";

export default function WhyLinkedIn() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
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
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div
        ref={sectionRef}
        className="fade-in-up max-w-[900px] mx-auto"
      >
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-3 h-3 fill-blue-500 flex-shrink-0" viewBox="0 0 10 10">
            <path d="M5 0L10 5L5 10L0 5Z" />
          </svg>
          <span className="text-[#a1a1aa] text-sm uppercase tracking-widest">Why LinkedIn</span>
        </div>

        {/* Heading */}
        <h2 className="heading-section text-white mt-4">
          LinkedIn is the highest ROI platform most professionals{" "}
          <span className="text-blue-500">completely ignore.</span>
        </h2>

        {/* Body */}
        <p className="text-[#a1a1aa] text-[1.05rem] leading-[1.75] mt-6">
          A single post that resonates can bring in new clients, job offers, speaking opportunities and referrals you never saw coming. Recruiters are actively searching it. Decision makers are scrolling it every morning. Your next big opportunity is probably already on there. The only thing standing between you and that is showing up consistently.
        </p>
      </div>
    </section>
  );
}
