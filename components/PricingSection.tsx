"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const FEATURES = [
  "3 tailored LinkedIn posts per week",
  "Posts written in your voice",
  "Delivered Monday, Wednesday & Friday",
  "Australian-made for Australian professionals",
  "Posts arrive in your inbox, just copy and paste",
  "Cancel anytime, no lock-in contracts",
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section id="pricing" className="bg-black py-24 px-6">
      <div
        ref={sectionRef}
        className="fade-in-up max-w-[520px] mx-auto text-center"
      >
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg className="w-3 h-3 fill-blue-500 flex-shrink-0" viewBox="0 0 10 10">
            <path d="M5 0L10 5L5 10L0 5Z" />
          </svg>
          <span className="text-[#a1a1aa] text-sm uppercase tracking-widest">Pricing</span>
        </div>

        {/* Heading */}
        <h2 className="heading-section text-white mt-4">
          One plan.{" "}
          <span className="text-blue-500">Everything included.</span>
        </h2>

        {/* Subheading */}
        <p className="text-[#a1a1aa] mt-3">
          No tiers. No upsells. Just great content in your inbox, every week.
        </p>

        {/* Pricing card */}
        <div className="bg-[#0d0d0d] border border-blue-500/30 rounded-2xl p-10 mt-12 text-left">

          {/* Top row */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-white font-bold text-[1.1rem]">Voxen</span>
            <span className="bg-blue-500/10 text-blue-500 text-xs px-3 py-1 rounded-full border border-blue-500/20 font-medium">
              Most Popular
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-1 mb-2">
            <span className="text-white font-black tracking-[-0.03em] text-[4rem] leading-none">$250</span>
            <span className="text-[#52525b] text-base pb-1 ml-1">/month</span>
          </div>
          <span className="text-[#52525b] text-xs block">AUD incl. GST</span>

          {/* Value line */}
          <p className="text-[#a1a1aa] text-sm italic mt-2">
            Most LinkedIn ghostwriters charge $250 for a single post. You&apos;re getting 12.
          </p>

          {/* Divider */}
          <div className="border-t border-white/5 my-6" />

          {/* Features */}
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#a1a1aa] text-sm leading-[1.8]">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/signup"
            className="mt-8 w-full bg-[#3b82f6] hover:bg-[#2563eb] hover:scale-[1.01] active:scale-[0.99] text-white font-semibold py-4 rounded-xl transition-[background-color,transform] duration-200 flex items-center justify-center gap-2 text-base"
          >
            Start Today / $250/month &#8594;
          </Link>
        </div>

        {/* Fine print */}
        <p className="text-[#52525b] text-xs mt-4">
          No lock-in contracts. Cancel anytime from your account.
        </p>
      </div>
    </section>
  );
}
