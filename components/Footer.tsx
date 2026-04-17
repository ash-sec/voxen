import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span
              className="text-xl font-bold"
              style={{ color: "#ffffff", textShadow: "0 0 20px rgba(59,130,246,0.6)" }}
            >
              Voxen
            </span>
            <p className="text-slate-500 text-sm mt-1">Your LinkedIn. Written For You.</p>
            <p className="text-slate-600 text-xs mt-3">
              <a
                href="mailto:voxensupport.au@gmail.com"
                className="hover:text-slate-400 transition-colors"
              >
                voxensupport.au@gmail.com
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <a
              href="mailto:voxensupport.au@gmail.com"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-600 text-xs">
            © 2026 Voxen. All rights reserved. Australian-made for Australian professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
