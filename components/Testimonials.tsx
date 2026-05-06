"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Testimonials() {
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
    <section id="cta" className="bg-[#0a0a0a] py-24 px-6">
      <div
        ref={sectionRef}
        className="fade-in-up max-w-[640px] mx-auto text-center"
      >
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <svg className="w-3 h-3 fill-blue-500 flex-shrink-0" viewBox="0 0 10 10">
            <path d="M5 0L10 5L5 10L0 5Z" />
          </svg>
          <span className="text-[#a1a1aa] text-sm uppercase tracking-widest">Get Started</span>
        </div>

        {/* Headings */}
        <h2 className="heading-cta text-white">Stop putting it off.</h2>
        <h2 className="heading-cta text-blue-500">Start showing up.</h2>

        {/* Body */}
        <p className="text-[#a1a1aa] text-[1.05rem] leading-[1.65] mt-5">
          Every week you don&apos;t post is a week your competitors are. Voxen handles it all. You just copy and paste.
        </p>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8">
          {[
            "3 posts delivered every week",
            "Cancel anytime, no lock-in",
            "Setup takes 2 minutes",
          ].map((signal) => (
            <span key={signal} className="flex items-center gap-2 text-sm text-[#a1a1aa]">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {signal}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/signup"
          className="mt-10 max-w-[320px] mx-auto bg-[#3b82f6] hover:bg-[#2563eb] hover:scale-[1.01] active:scale-[0.99] text-white font-semibold py-4 rounded-xl transition-[background-color,transform] duration-200 flex items-center justify-center gap-2 text-base"
        >
          Get Started / $250/month &#8594;
        </Link>

        {/* Fine print */}
        <p className="text-[#52525b] text-xs mt-4">
          No lock-in contract. Cancel anytime from your account.
        </p>
      </div>
    </section>
  );
}
