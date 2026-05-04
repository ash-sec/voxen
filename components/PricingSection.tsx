"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const features = [
  "3 tailored LinkedIn posts per week",
  "Posts written in your voice",
  "Delivered Monday, Wednesday & Friday",
  "Australian-made for Australian professionals",
  "Posts arrive in your inbox — just copy & paste",
  "Cancel anytime — no lock-in contracts",
];

export default function PricingSection() {
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
    <section id="pricing" className="py-24 px-6 bg-white">
      <div ref={sectionRef} className="section-hidden max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="badge inline-flex mb-4">Pricing</div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4">
          One plan.{" "}
          <span className="gradient-text">Everything included.</span>
        </h2>
        <p className="text-[#475569] mb-12">
          No tiers. No upsells. Just great content in your inbox, every week.
        </p>

        {/* Pricing card */}
        <div
          className="rounded-2xl p-8 md:p-10 text-left shadow-lg"
          style={{
            background: "#ffffff",
            border: "2px solid #2563eb",
          }}
        >
          {/* Plan name */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-2xl font-bold text-[#0f172a]">Voxen</span>
              <span
                className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "#dbeafe", color: "#2563eb" }}
              >
                Most Popular
              </span>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#dbeafe", border: "1px solid #bfdbfe" }}
            >
              <svg className="w-5 h-5" style={{ color: "#2563eb" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-2 mb-2">
            <span className="text-6xl font-bold text-[#0f172a]">$250</span>
            <div className="pb-2">
              <span className="text-[#475569] text-lg">/month</span>
              <p className="text-xs text-[#94a3b8]">AUD incl. GST</p>
            </div>
          </div>
          <p className="text-[#475569] text-sm italic mb-8">
            Most LinkedIn ghostwriters charge $250 for a single post. You&apos;re getting 12.
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "#dcfce7" }}
                >
                  <svg className="w-3 h-3" style={{ color: "#22c55e" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#475569] text-sm">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/signup"
            className="btn-primary w-full text-base py-4 flex items-center justify-center gap-2"
          >
            Start Today &mdash; $250/month
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Fine print */}
        <p className="text-[#94a3b8] text-sm mt-5">
          No lock-in contracts. Cancel anytime from your account.
        </p>
      </div>
    </section>
  );
}
