"use client";

import { useEffect, useRef } from "react";

const cards = [
  {
    icon: (
      <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Healthcare Professionals",
    tagline: "Your expertise deserves an audience.",
    description:
      "Doctors, nurses, allied health workers. You have knowledge and experience that others genuinely need to hear. LinkedIn is where your professional reputation gets built.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Tradies & Tradespeople",
    tagline: "You build Australia. Let's build your brand.",
    description:
      "Electricians, plumbers, builders. The best in the trade are winning work on LinkedIn. Your profile should show why you are the best in the business.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Small Business Owners",
    tagline: "Your story is your strongest marketing tool.",
    description:
      "You started something from scratch. That journey, those lessons, that expertise. LinkedIn turns your experience into leads, trust and opportunities.",
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
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section id="who-its-for" className="py-24 px-6 relative overflow-hidden">
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
          <div className="badge inline-flex mb-4">Who It's For</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Built for the people who{" "}
            <span className="gradient-text">keep Australia running</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="glass-card-hover p-8">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                {card.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-blue-400 font-medium text-sm mb-4">{card.tagline}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
