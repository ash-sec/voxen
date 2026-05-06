"use client";

import { useState, useEffect, useRef } from "react";

function DiamondIcon() {
  return (
    <svg className="w-3 h-3 fill-blue-500 flex-shrink-0" viewBox="0 0 10 10">
      <path d="M5 0L10 5L5 10L0 5Z" />
    </svg>
  );
}

const PANELS = [
  {
    heading: { main: "What is ", highlight: "Voxen?" },
    subtext: "An Australian ghostwriting service that handles your LinkedIn presence completely.",
  },
  {
    heading: { main: "Before and ", highlight: "after." },
    subtext: "See what changes when you stop doing it alone.",
  },
  {
    heading: { main: "How it ", highlight: "works." },
    subtext: "Simple enough to explain in three steps.",
  },
  {
    heading: { main: "Who it’s ", highlight: "for." },
    subtext: "Built for the professionals who need it most.",
  },
];

const BEFORE_ITEMS = [
  "Knowing you should post but never actually doing it",
  "Staring at a blank screen every time you sit down to write",
  "Posting once, going quiet for weeks, losing momentum",
  "Watching competitors build their profile while yours sits idle",
  "Missing referrals and opportunities from people who don't know what you do",
];

const AFTER_ITEMS = [
  "3 ready-to-post LinkedIn posts in your inbox every single week",
  "Posts written in your voice, your industry, your stories",
  "Consistent presence that builds trust with your network over time",
  "Your profile stays active while you focus on running your business",
  "Referrals and inbound leads from people who see you showing up",
];

const STEPS = [
  {
    num: "01",
    title: "Sign up and tell us about yourself",
    desc: "Fill in a quick onboarding form about your job, personality, and what you want to be known for. This is what we use to match your voice perfectly.",
    badge: "2 min",
  },
  {
    num: "02",
    title: "We write 3 posts per week in your voice",
    desc: "Every post is ghostwritten to match your profession, your personality, and the topics you care about. It sounds like you wrote it.",
    badge: "Done for you",
  },
  {
    num: "03",
    title: "Posts land in your inbox Mon, Wed & Fri",
    desc: "Just open the email, copy the post, and paste it straight into LinkedIn. Takes about 30 seconds. Your LinkedIn stays active without any effort.",
    badge: "7am to 10am AEST",
  },
];

const INDUSTRIES = [
  { name: "Business Owners", desc: "Stay top of mind with clients, partners and referral sources." },
  { name: "Real Estate Agents", desc: "Build trust in your local market before prospects even call you." },
  { name: "Mortgage Brokers", desc: "Show your expertise to people who are about to make the biggest purchase of their life." },
  { name: "Tradies", desc: "Stand out in a crowded market and get referrals from people who know your name." },
  { name: "Financial Advisers", desc: "Build credibility and attract clients who already trust you before the first meeting." },
  { name: "Coaches and Consultants", desc: "Grow your audience and turn followers into paying clients." },
];

function Panel1() {
  return (
    <div className="bg-[#0d0d0d] border border-white/[0.08] rounded-2xl p-10 w-full">
      <div className="grid grid-cols-3 gap-6 mb-6">
        {[
          { stat: "3x", label: "Posts per week", desc: "Every Mon, Wed & Fri" },
          { stat: "7am", label: "Morning delivery", desc: "In your inbox by 10am AEST" },
          { stat: "0", label: "Effort required", desc: "Just copy and paste" },
        ].map((tile) => (
          <div key={tile.stat}>
            <div className="text-blue-500 font-black text-5xl leading-none mb-2">{tile.stat}</div>
            <div className="text-white font-semibold text-sm mb-1">{tile.label}</div>
            <div className="text-[#a1a1aa] text-sm">{tile.desc}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 pt-6 mt-6">
        <p className="text-[#a1a1aa] text-sm leading-[1.7]">
          Voxen is an Australian LinkedIn ghostwriting service. You sign up, fill in a short questionnaire about your work, personality and goals, and we handle everything from there. Every Monday, Wednesday and Friday, a ready-to-post LinkedIn post lands in your inbox between 7am and 10am AEST.
        </p>
      </div>
    </div>
  );
}

function Panel2() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {/* Before */}
      <div className="bg-[#0d0d0d] border border-red-500/20 rounded-2xl p-8">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-red-500" />
          </div>
          <span className="text-white font-bold text-[1.1rem]">Without Voxen</span>
        </div>
        <ul className="space-y-3">
          {BEFORE_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-[#a1a1aa] text-sm leading-[1.6]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* After */}
      <div className="bg-[#0d0d0d] border border-green-500/20 rounded-2xl p-8">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <span className="text-white font-bold text-[1.1rem]">With Voxen</span>
        </div>
        <ul className="space-y-3">
          {AFTER_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#a1a1aa] text-sm leading-[1.6]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Panel3() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {STEPS.map((step) => (
        <div key={step.num} className="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-7 flex gap-5 items-start">
          <span className="text-[#1d4ed8] font-black text-[2rem] opacity-40 min-w-[3rem] leading-none">{step.num}</span>
          <div>
            <h4 className="text-white font-bold text-base mb-2">{step.title}</h4>
            <span className="inline-block bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded mb-3">{step.badge}</span>
            <p className="text-[#a1a1aa] text-sm leading-[1.65]">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Panel4() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {INDUSTRIES.map((card) => (
        <div
          key={card.name}
          className="bg-[#0d0d0d] border border-white/[0.06] rounded-xl p-5 hover:border-white/20 hover:bg-[#111111] transition-[border-color,background-color] duration-200 cursor-default"
        >
          <h4 className="text-white font-bold text-[0.95rem] mb-1">{card.name}</h4>
          <p className="text-[#a1a1aa] text-sm leading-[1.5]">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}

const PANEL_CONTENTS = [<Panel1 />, <Panel2 />, <Panel3 />, <Panel4 />];

export default function StickyScroll() {
  const [activePanel, setActivePanel] = useState(0);
  const [displayPanel, setDisplayPanel] = useState(0);
  const [headingVisible, setHeadingVisible] = useState(true);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // IntersectionObserver tracks which desktop panel is centred in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = panelRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActivePanel(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    panelRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Fade heading out, swap content, fade back in
  useEffect(() => {
    if (activePanel === displayPanel) return;
    setHeadingVisible(false);
    if (transitionRef.current) clearTimeout(transitionRef.current);
    transitionRef.current = setTimeout(() => {
      setDisplayPanel(activePanel);
      setHeadingVisible(true);
    }, 150);
    return () => { if (transitionRef.current) clearTimeout(transitionRef.current); };
  }, [activePanel, displayPanel]);

  return (
    <section id="how-it-works" className="relative bg-black">

      {/* ── DESKTOP: sticky left + scrolling right ────────────────── */}
      <div className="hidden lg:flex relative min-h-[400vh]">

        {/* Left sticky column */}
        <div className="sticky top-0 h-screen w-[45%] flex flex-col justify-center z-10"
          style={{ paddingLeft: "clamp(2rem, 8vw, 8rem)", paddingRight: "3rem" }}>

          {/* Progress dots — pinned to left edge */}
          <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-3"
            style={{ left: "clamp(0.75rem, 3vw, 2rem)" }}>
            {PANELS.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-[height,background-color] duration-300 w-[3px] ${
                  displayPanel === i ? "h-6 bg-white" : "h-2 bg-[#333333]"
                }`}
              />
            ))}
          </div>

          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <DiamondIcon />
            <span className="text-[#a1a1aa] text-sm uppercase tracking-widest">Voxen</span>
          </div>

          {/* Heading + subtext */}
          <div className={`transition-opacity duration-[150ms] ${headingVisible ? "opacity-100" : "opacity-0"}`}>
            <h2 className="heading-sticky text-white">
              {PANELS[displayPanel].heading.main}
              <span className="text-blue-500">{PANELS[displayPanel].heading.highlight}</span>
            </h2>
            <p className="text-[#a1a1aa] text-[1.05rem] leading-[1.65] max-w-[380px] mt-4">
              {PANELS[displayPanel].subtext}
            </p>
          </div>
        </div>

        {/* Right scrolling column */}
        <div className="w-[55%] flex flex-col gap-[40vh]"
          style={{ paddingTop: "15vh", paddingBottom: "15vh", paddingRight: "clamp(2rem, 6vw, 6rem)" }}>
          {PANEL_CONTENTS.map((content, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="min-h-[60vh] flex items-center"
              id={i === 3 ? "who-its-for" : undefined}
            >
              {content}
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: stacked panels with individual headings ─────────── */}
      <div className="lg:hidden py-16 px-6 space-y-20">
        {PANELS.map((panel, i) => (
          <div key={i} id={i === 3 ? "who-its-for" : undefined}>
            {/* Panel heading */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <DiamondIcon />
                <span className="text-[#a1a1aa] text-sm uppercase tracking-widest">Voxen</span>
              </div>
              <h2 className="heading-sticky text-white mb-4">
                {panel.heading.main}
                <span className="text-blue-500">{panel.heading.highlight}</span>
              </h2>
              <p className="text-[#a1a1aa] text-[1.05rem] leading-[1.65]">{panel.subtext}</p>
            </div>
            {PANEL_CONTENTS[i]}
          </div>
        ))}
      </div>

    </section>
  );
}
