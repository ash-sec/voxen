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

            const cards = entry.target.querySelectorAll(".stagger-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("card-visible");
                card.classList.remove("card-hidden");
              }, i * 100);
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
    <section
      id="who-its-for"
      className="py-24 px-6"
      style={{ background: "#f1f5f9" }}
    >
      <div ref={sectionRef} className="section-hidden max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="badge inline-flex mb-4">Who It&apos;s For</div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a]">
            Built for Australian professionals who are{" "}
            <span className="gradient-text">too busy to write.</span>
          </h2>
        </div>

        {/* Subtext */}
        <p className="text-[#475569] text-lg text-center max-w-2xl mx-auto mb-14">
          If you have a LinkedIn profile and not enough time to post on it, Voxen was built for you.
        </p>

        {/* Industry cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {industries.map((industry, i) => (
            <div
              key={i}
              className="stagger-card card-hidden bg-white border border-[#e2e8f0] shadow-sm rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default"
            >
              <div className="text-3xl mb-3">{industry.emoji}</div>
              <h3 className="text-[#0f172a] font-bold text-base mb-2">{industry.title}</h3>
              <p className="text-[#475569] text-sm leading-relaxed">{industry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
