"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Sarah M.",
    profession: "Registered Nurse",
    location: "Brisbane, QLD",
    quote:
      "I never had time to post on LinkedIn between shifts. Now my profile is actually active and I've had two recruiters reach out this month alone. Honestly couldn't believe how much the posts sounded like me.",
    rating: 5,
    initials: "SM",
  },
  {
    name: "Jake T.",
    profession: "Electrician",
    location: "Sydney, NSW",
    quote:
      "I thought LinkedIn was just for office people. My sparky mates told me to try it and I signed up to Voxen on a whim. Three months later I've landed two commercial clients who found me through my posts. Mad ROI.",
    rating: 5,
    initials: "JT",
  },
  {
    name: "Priya K.",
    profession: "Pharmacist",
    location: "Melbourne, VIC",
    quote:
      "The posts genuinely sound like me — they use phrases I'd actually use at work. It's wild. I've built a decent little following and patients have told me they saw my LinkedIn. Really adds to your credibility.",
    rating: 5,
    initials: "PK",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 star" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

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
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div ref={sectionRef} className="section-hidden max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4">Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What our members{" "}
            <span className="gradient-text">are saying</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card-hover p-8 flex flex-col">
              {/* Rating */}
              <div className="flex items-center justify-between mb-6">
                <StarRating count={t.rating} />
                <svg className="w-8 h-8 text-blue-400/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-blue-400">{t.initials}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">
                    {t.profession} · {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof numbers */}
        <div className="mt-16 glass-card p-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: "3x", label: "posts per week" },
              { value: "100%", label: "done for you" },
              { value: "$0", label: "extra effort" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
