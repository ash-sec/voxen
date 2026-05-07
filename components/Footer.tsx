import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <img src="/logo.png" width={28} height={28} className="block mb-3" alt="Voxen" />
            <span className="text-xl font-bold text-white">Voxen</span>
            <p className="text-[#52525b] text-sm mt-1">Your LinkedIn. Written For You.</p>
            <p className="text-[#52525b] text-sm mt-2">
              <a
                href="mailto:voxensupport.au@gmail.com"
                className="hover:text-white transition-[color] duration-200"
              >
                voxensupport.au@gmail.com
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#52525b]">
            <Link href="/privacy" className="hover:text-white transition-[color] duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-[color] duration-200">
              Terms of Service
            </Link>
            <a
              href="mailto:voxensupport.au@gmail.com"
              className="hover:text-white transition-[color] duration-200"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[#3f3f46] text-xs">
            &copy; 2026 Voxen. All rights reserved. Australian-made for Australian professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
