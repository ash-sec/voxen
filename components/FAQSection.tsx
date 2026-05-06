"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
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

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <span className="text-white font-semibold text-[0.95rem] leading-snug">{q}</span>
        <span className="flex-shrink-0 text-blue-500 text-xl leading-none" aria-hidden>
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <p className="text-[#a1a1aa] text-sm leading-[1.7] pb-5">{a}</p>
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
    <section id="faq" className="bg-black py-24 px-6">
      <div
        ref={sectionRef}
        className="fade-in-up max-w-[720px] mx-auto"
      >
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg className="w-3 h-3 fill-blue-500 flex-shrink-0" viewBox="0 0 10 10">
            <path d="M5 0L10 5L5 10L0 5Z" />
          </svg>
          <span className="text-[#a1a1aa] text-sm uppercase tracking-widest">FAQ</span>
        </div>

        {/* Heading */}
        <h2 className="heading-faq text-white text-center mt-4">
          Got questions? We&apos;ve got{" "}
          <span className="text-blue-500">answers.</span>
        </h2>

        {/* Accordion */}
        <div className="mt-12">
          {FAQS.map((faq, i) => (
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
        <div className="mt-12 text-center">
          <h3 className="text-white font-semibold mb-2">Still have questions?</h3>
          <p className="text-[#a1a1aa] text-sm mb-3">
            Shoot us an email and we&apos;ll get back to you within 24 hours.
          </p>
          <a
            href="mailto:voxensupport.au@gmail.com"
            className="text-blue-500 hover:underline text-sm transition-[opacity] duration-200"
          >
            voxensupport.au@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
