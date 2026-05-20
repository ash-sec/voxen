import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/logo.png" },
  verification: {
    google: "gh66AX4HzzVgUZSjKQyWfWUylMtMkJEFhl_YflrDlgY",
  },
  title: "Voxen | LinkedIn Ghostwriting Service | Done-for-You LinkedIn Content",
  description:
    "Most LinkedIn ghostwriters charge $250 for a single post. Voxen delivers 12 per month, written in your voice, straight to your inbox. Done-for-you LinkedIn ghostwriting for professionals and business owners worldwide. Start for $250/month.",
  keywords: [
    "LinkedIn ghostwriting",
    "LinkedIn ghostwriting service",
    "LinkedIn ghostwriter",
    "LinkedIn ghostwriter for hire",
    "professional LinkedIn ghostwriter",
    "best LinkedIn ghostwriting service",
    "LinkedIn ghostwriting service for professionals",
    "LinkedIn ghostwriting for personal brand",
    "LinkedIn ghostwriting for entrepreneurs",
    "LinkedIn ghostwriting for executives",
    "LinkedIn ghostwriting for small business",
    "LinkedIn ghostwriting pricing",
    "LinkedIn ghostwriting packages",
    "LinkedIn ghostwriting cost",
    "LinkedIn ghostwriting subscription",
    "affordable LinkedIn ghostwriting",
    "monthly LinkedIn ghostwriting service",
    "LinkedIn ghostwriter for small business owners",
    "LinkedIn post ghostwriter",
    "LinkedIn writing service",
    "LinkedIn content writing service",
    "LinkedIn content service",
    "outsource LinkedIn content",
    "outsource LinkedIn posts",
    "done for you LinkedIn content",
    "LinkedIn personal branding",
    "LinkedIn personal brand tips",
    "LinkedIn content strategy for business owners",
    "LinkedIn content for professionals",
    "LinkedIn post writing service",
    "LinkedIn lead generation for business owners",
    "LinkedIn ghostwriting for coaches",
    "LinkedIn ghostwriting for consultants",
    "LinkedIn ghostwriting for financial professionals",
    "LinkedIn ghostwriting for real estate professionals",
    "hire a LinkedIn ghostwriter",
    "how to hire a LinkedIn ghostwriter",
    "LinkedIn ghostwriter worldwide",
    "LinkedIn ghostwriting Australia",
    "LinkedIn ghostwriter Australia",
    "LinkedIn ghostwriting service Australia",
    "LinkedIn for business owners Australia",
    "LinkedIn for real estate agents Australia",
    "LinkedIn for mortgage brokers Australia",
    "LinkedIn for financial advisers Australia",
    "LinkedIn for tradies Australia",
    "LinkedIn content strategy Australia",
    "outsource LinkedIn content Australia",
    "LinkedIn post writer Australia",
    "LinkedIn content agency Australia",
    "consistent LinkedIn content",
    "LinkedIn presence",
    "LinkedIn growth",
    "how to grow on LinkedIn 2026",
  ],
  openGraph: {
    title: "Voxen | LinkedIn Ghostwriting Service | Done-for-You LinkedIn Content",
    description:
      "Most LinkedIn ghostwriters charge $250 for a single post. Voxen delivers 12 per month, written in your voice, straight to your inbox. Done-for-you LinkedIn ghostwriting for professionals and business owners worldwide. Start for $250/month.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxen | LinkedIn Ghostwriting Service | Done-for-You LinkedIn Content",
    description:
      "Most LinkedIn ghostwriters charge $250 for a single post. Voxen delivers 12 per month, written in your voice, straight to your inbox. Done-for-you LinkedIn ghostwriting for professionals and business owners worldwide. Start for $250/month.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#000000", color: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}