"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Testimonials() {
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
    <section id="cta" className="py-24 px-6">
      <div ref={sectionRef} className="section-hidden max-w-3xl mx-auto text-center">
        <div className="badge inline-flex mb-6">Get Started</div>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
          Stop putting it off.
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 gradient-text">
          Start showing up.
        </h2>

        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Every week you don&apos;t post is a week your competitors are. Voxen handles it all. You just copy and paste.
        </p>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          <span className="flex items-center gap-2 text-sm text-slate-400">
            <svg className="w-4 h-4 flex-shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            3 posts delivered every week
          </span>
          <span className="flex items-center gap-2 text-sm text-slate-400">
            <svg className="w-4 h-4 flex-shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Cancel anytime, no lock-in
          </span>
          <span className="flex items-center gap-2 text-sm text-slate-400">
            <svg className="w-4 h-4 flex-shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Setup takes 2 minutes
          </span>
        </div>

        <Link
          href="/signup"
          className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4 mb-5"
        >
          Get Started / $250/month
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <p className="text-slate-500 text-sm">
          No lock-in contract. Cancel anytime from your account.
        </p>
      </div>
    </section>
  );
}
