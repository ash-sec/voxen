"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Sign up and tell us about yourself",
    time: "2 min",
    description:
      "Fill in a quick onboarding form about your job, personality, and what you want to be known for. This is what we use to match your voice perfectly.",
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We write 3 posts per week in your voice",
    time: "Done for you",
    description:
      "Every post is ghostwritten to match your profession, your personality, and the topics you care about. It sounds like you wrote it.",
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Posts land in your inbox Mon, Wed & Fri",
    time: "7am–10am AEST",
    description:
      "Just open the email, copy the post, and paste it straight into LinkedIn. Takes about 30 seconds. Your LinkedIn stays active without any effort.",
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

const schedule = [
  { day: "Monday", label: "Mon", post: "Motivational story from your week" },
  { day: "Wednesday", label: "Wed", post: "Industry insight or hot take" },
  { day: "Friday", label: "Fri", post: "Win, lesson, or weekend thought" },
];

export default function HowItWorks() {
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
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div ref={sectionRef} className="section-hidden max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4">How It Works</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Simple. Done for you.{" "}
            <span className="gradient-text">Every week.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[17%] right-[17%] h-px bg-white/5 z-0" />

          {steps.map((step, i) => (
            <div key={i} className="stagger-card card-hidden glass-card p-8 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-500/20 border border-blue-500/30">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-blue-500/40">
                  {step.number}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-3 leading-tight">{step.title}</h3>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 bg-blue-500/15 text-blue-400">
                {step.time}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Weekly schedule */}
        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Your weekly content schedule</h3>
            <p className="text-slate-500 text-sm">Posts arrive in your inbox automatically</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {schedule.map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-blue-500">
                  <span className="text-white font-bold text-sm">{item.label}</span>
                </div>
                <p className="text-white font-semibold text-sm mb-2">{item.day}</p>
                <div
                  className="rounded-xl p-3 text-left border border-white/5"
                  style={{ background: "rgba(15,26,46,0.8)" }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-xs font-medium text-green-400">Ready</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.post}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-blue-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    In your inbox
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
