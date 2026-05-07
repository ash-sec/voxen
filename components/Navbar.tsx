"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "navbar-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Voxen" width={32} height={32} />
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
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-[color] duration-200"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/blog"
            className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-[color] duration-200"
          >
            Blog
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo("pricing")}
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-[background-color] duration-200"
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
            className={`block w-5 h-0.5 bg-white transition-[transform,opacity] duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-[transform,opacity] duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-[transform,opacity] duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden navbar-glass border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4">
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Who It's For", id: "who-its-for" },
            { label: "Pricing", id: "pricing" },
            { label: "FAQ", id: "faq" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-sm font-medium text-[#a1a1aa] hover:text-white transition-[color] duration-200 py-1"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/blog"
            className="text-left text-sm font-medium text-[#a1a1aa] hover:text-white transition-[color] duration-200 py-1"
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>
          <button
            onClick={() => scrollTo("pricing")}
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold w-full mt-2 py-2.5 rounded-lg transition-[background-color] duration-200"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
