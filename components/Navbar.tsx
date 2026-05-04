"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e2e8f0] transition-shadow duration-300"
      style={{ boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Voxen" height={32} style={{ height: "32px", width: "auto" }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Who It's For", id: "who-its-for" },
            { label: "Pricing", id: "pricing" },
            { label: "FAQ", id: "faq" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/blog"
            className="text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo("pricing")}
            className="btn-primary text-sm"
          >
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-[#0f172a] transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#0f172a] transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#0f172a] transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#e2e8f0] px-6 py-4 flex flex-col gap-4">
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Who It's For", id: "who-its-for" },
            { label: "Pricing", id: "pricing" },
            { label: "FAQ", id: "faq" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors py-1"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/blog"
            className="text-left text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors py-1"
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>
          <button
            onClick={() => scrollTo("pricing")}
            className="btn-primary text-sm w-full mt-2"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
