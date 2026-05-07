"use client";

import { useState } from "react";
import FAQSection from "@/components/FAQSection";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) { setError("Please fill in all fields."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/send-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send.");
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Help & Support</h1>
        <p className="text-[#a1a1aa] mt-1">
          Got a question? We&apos;re here to help.
        </p>
      </div>

      {/* Quick contact */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-white font-semibold mb-2">Contact Support</h3>
        <p className="text-[#a1a1aa] text-sm mb-4">
          Email us directly at{" "}
          <a
            href="mailto:voxensupport.au@gmail.com"
            className="text-[#3b82f6] hover:text-white transition-[color] duration-200"
          >
            voxensupport.au@gmail.com
          </a>{" "}
          and we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      {/* Contact form */}
      <div className="glass-card p-6 mb-12">
        <h3 className="text-white font-semibold mb-6">Send us a message</h3>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Message sent!</h4>
            <p className="text-[#a1a1aa] text-sm">We&apos;ll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a1a1aa] mb-1.5">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What can we help you with?"
                className="input-field min-h-[120px] resize-none"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8 py-3 text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message →"
              )}
            </button>
          </form>
        )}
      </div>

      {/* FAQ — reuse existing */}
      <div className="-mx-6">
        <FAQSection />
      </div>
    </div>
  );
}
