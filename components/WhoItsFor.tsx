"use client";

import { useEffect, useRef } from "react";

const industries = [
  {
    emoji: "🏢",
    title: "Business Owners",
    text: "Stay top of mind with clients, partners and referral sources.",
  },
  {
    emoji: "🏠",
    title: "Real Estate Agents",
    text: "Build trust in your local market before prospects even call you.",
  },
  {
    emoji: "💰",
    title: "Mortgage Brokers",
    text: "Show your expertise to people who are about to make the biggest purchase of their life.",
  },
  {
    emoji: "🔧",
    title: "Tradies",
    text: "Stand out in a crowded market and get referrals from people who know your name.",
  },
  {
    emoji: "📊",
    title: "Financial Advisers",
    text: "Build credibility and attract clients who already trust you before the first meeting.",
  },
  {
    emoji: "🎯",
    title: "Coaches and Consultants",
    text: "Grow your audience and turn followers into paying clients.",
  },
];

export default function WhoItsFor() {
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
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      id="who-its-for"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "rgba(30, 41, 59, 0.3)" }}
    >
      <div ref={sectionRef} className="section-hidden max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="badge inline-flex mb-4">Who It&apos;s For</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Built for Australian professionals who are{" "}
            <span className="text-blue-400">too busy to write.</span>
          </h2>
        </div>

        {/* Subtext */}
        <p className="text-slate-400 text-lg text-center max-w-2xl mx-auto mb-14">
          If you have a LinkedIn profile and not enough time to post on it, Voxen was built for you.
        </p>

        {/* Industry cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {industries.map((industry, i) => (
            <div
              key={i}
              className="rounded-xl border border-blue-500/15 p-6"
              style={{ background: "#1e293b" }}
            >
              <div className="text-3xl mb-3">{industry.emoji}</div>
              <h3 className="text-white font-bold text-base mb-2">{industry.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{industry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
