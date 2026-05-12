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
  title: "Voxen | LinkedIn Ghostwriting Australia | Done-for-You LinkedIn Content",
  description:
    "Voxen is Australia's leading LinkedIn ghostwriting service. We write 3 LinkedIn posts per week in your voice and deliver them to your inbox every Monday, Wednesday and Friday. Done-for-you LinkedIn content for Australian business owners, real estate agents, mortgage brokers, financial advisers and tradies. Start today for $250/month.",
  keywords: [
    "LinkedIn ghostwriting Australia",
    "LinkedIn ghostwriter Australia",
    "LinkedIn content Australia",
    "LinkedIn growth Australia",
    "LinkedIn personal branding Australia",
    "done for you LinkedIn content",
    "LinkedIn content creation Australia",
    "LinkedIn ghostwriting service Australia",
    "LinkedIn for business owners Australia",
    "LinkedIn for real estate agents Australia",
    "LinkedIn for mortgage brokers Australia",
    "LinkedIn for financial advisers Australia",
    "LinkedIn for tradies Australia",
    "LinkedIn personal brand",
    "LinkedIn content strategy Australia",
    "outsource LinkedIn content Australia",
    "LinkedIn branding Australia",
    "LinkedIn post writer Australia",
    "hire a LinkedIn ghostwriter",
    "LinkedIn content agency Australia",
    "consistent LinkedIn content",
    "LinkedIn presence Australia",
  ],
  openGraph: {
    title: "Voxen | LinkedIn Ghostwriting Australia | Done-for-You LinkedIn Content",
    description:
      "Voxen is Australia's leading LinkedIn ghostwriting service. We write 3 LinkedIn posts per week in your voice and deliver them to your inbox every Monday, Wednesday and Friday. Done-for-you LinkedIn content for Australian business owners, real estate agents, mortgage brokers, financial advisers and tradies. Start today for $250/month.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxen | LinkedIn Ghostwriting Australia | Done-for-You LinkedIn Content",
    description:
      "Voxen is Australia's leading LinkedIn ghostwriting service. We write 3 LinkedIn posts per week in your voice and deliver them to your inbox every Monday, Wednesday and Friday. Done-for-you LinkedIn content for Australian business owners, real estate agents, mortgage brokers, financial advisers and tradies. Start today for $250/month.",
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