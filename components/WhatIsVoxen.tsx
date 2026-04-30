"use client";

import { useEffect, useRef } from "react";

const tiles = [
  {
    value: "3 posts/week",
    sub: "Every Mon, Wed & Fri",
  },
  {
    value: "Written in your voice",
    sub: "Based on your onboarding answers",
  },
  {
    value: "Cancel anytime",
    sub: "No lock-in contracts, ever",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Voxen",
  description:
    "An Australian LinkedIn ghostwriting service that writes 3 posts per week in your voice and delivers them to your inbox every Monday, Wednesday and Friday.",
  provider: {
    "@type": "Organization",
    name: "Voxen",
    url: "https://voxen.co",
    areaServed: "Australia",
  },
  serviceType: "LinkedIn Ghostwriting",
  offers: {
    "@type": "Offer",
    price: "250",
    priceCurrency: "AUD",
    billingIncrement: "P1M",
  },
};

export default function WhatIsVoxen() {
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
    <section id="what-is-voxen" className="py-24 px-6 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div ref={sectionRef} className="section-hidden max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge inline-flex mb-4">
            <svg className="w-3 h-3 mr-1.5 text-blue-400" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
            About Voxen
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What is{" "}
            <span className="gradient-text">Voxen?</span>
          </h2>
        </div>

        {/* Body */}
        <p className="text-slate-300 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-14">
          Voxen is an Australian LinkedIn ghostwriting service. You sign up, fill in a short
          questionnaire about your work, personality and goals, and we handle everything from there.
          Every Monday, Wednesday and Friday, a ready-to-post LinkedIn post lands in your inbox
          between 7am and 10am AEST. All you do is copy and paste it into LinkedIn. No writing,
          no stressing, no staring at a blank screen. The posts are written to sound like you. Your
          industry, your tone, your stories. Clients include business owners, real estate agents,
          mortgage brokers, tradies, financial advisers and professionals across Australia who want
          to stay visible on LinkedIn without it taking up their time.
        </p>

        {/* Stat tiles */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiles.map((tile, i) => (
            <div key={i} className="glass-card p-8 text-center">
              <p className="text-xl font-bold text-white mb-2">{tile.value}</p>
              <p className="text-slate-400 text-sm">{tile.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
