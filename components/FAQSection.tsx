"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "How do posts get written in my voice?",
    a: "When you sign up, you fill in a short onboarding questionnaire — about your job, your personality, topics you care about, things that frustrate you, and even the slang you use at work. We use all of that to create content that reads like you wrote it on a good day.",
  },
  {
    q: "When will I receive my posts?",
    a: "Posts arrive in your inbox every Monday, Wednesday and Friday between 7:00am and 10:00am AEST. Each subscriber gets a personalised send time that stays consistent week to week, so it fits naturally into your morning.",
  },
  {
    q: "Can I request changes to a post?",
    a: "Absolutely. If a post doesn't feel right, just reply to the email and let us know what you'd like changed. We'll sort it. Our goal is for you to feel 100% confident posting it on your LinkedIn.",
  },
  {
    q: "What if I want to cancel?",
    a: "No hard feelings — you can cancel anytime from your account dashboard. There are no lock-in contracts, no cancellation fees, and no hoops to jump through. You'll continue to receive posts until the end of your current billing period.",
  },
  {
    q: "Is this service only for LinkedIn?",
    a: "Right now, Voxen is focused on LinkedIn — it's where Australian professionals get the most traction. The posts we write are formatted specifically for LinkedIn's algorithm and audience. We may expand to other platforms in the future.",
  },
  {
    q: "How do I contact support?",
    a: "Email us anytime at voxensupport.au@gmail.com and we'll get back to you within 24 hours. You can also use the contact form inside your account dashboard.",
  },
  {
    q: "What exactly is a LinkedIn ghostwriter?",
    a: "A LinkedIn ghostwriter writes content on your behalf, in your voice, so your profile stays active and professional without you having to write a single word. Voxen does this automatically, delivering 3 posts to your inbox every week based on your answers to a short questionnaire.",
  },
  {
    q: "Is LinkedIn ghostwriting ethical?",
    a: "Yes. Ghostwriting has existed for centuries and is completely standard practice across business, politics, media and personal branding. CEOs use speechwriters. Authors use co-writers. Business owners use copywriters. Having someone write in your voice based on your real experiences, views and expertise is no different. The ideas are yours. The stories are yours. We just handle the writing.",
  },
  {
    q: "How much does LinkedIn ghostwriting cost in Australia?",
    a: "Voxen is $250 per month for 3 posts per week. That works out to around $20 per post. Freelance LinkedIn ghostwriters in Australia typically charge $150 to $500 per post, so a subscription like Voxen is significantly more cost-effective for anyone who wants consistent content without a big freelancer bill.",
  },
  {
    q: "Will my followers know it's ghostwritten?",
    a: "Almost certainly not. The posts are written based on your onboarding answers, your industry, your personality and your stories. They are designed to sound exactly like you. Ghostwriting is also far more common than most people realise, particularly among business owners and executives on LinkedIn.",
  },
  {
    q: "What platforms do you write for?",
    a: "Voxen is focused entirely on LinkedIn. We write specifically for the LinkedIn format, including the right length, structure and tone that performs well on that platform. We do not currently offer content for Instagram, Twitter or other platforms.",
  },
  {
    q: "How do you write in my voice?",
    a: "When you sign up, you complete a short onboarding questionnaire about your role, your industry, the topics you care about, your communication style and the kind of professional reputation you want to build. We use your answers to shape every post so it reflects how you actually think and speak. Over time the content gets more accurate as we build a clearer picture of you.",
  },
];

function AccordionItem({ q, a, isOpen, onToggle }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
      >
        <span className="text-white font-medium text-sm md:text-base">{q}</span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center transition-all duration-300 ${
            isOpen ? "rotate-45 border-blue-500/40 bg-blue-500/20" : ""
          }`}
        >
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 300}px` : "0px",
        }}
      >
        <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section id="faq" className="py-24 px-6">
      <div ref={sectionRef} className="section-hidden max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge inline-flex mb-4">FAQ</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Got questions?{" "}
            <span className="gradient-text">We've got answers.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center glass-card p-8">
          <h3 className="text-white font-semibold mb-2">Still have questions?</h3>
          <p className="text-slate-400 text-sm mb-4">
            Shoot us an email and we'll get back to you within 24 hours.
          </p>
          <a
            href="mailto:voxensupport.au@gmail.com"
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            voxensupport.au@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
