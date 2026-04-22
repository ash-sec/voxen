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
  title: "Voxen — Your LinkedIn. Written For You.",
  description:
    "3 done-for-you LinkedIn posts delivered to your inbox every Monday, Wednesday & Friday. Built for Australian healthcare workers and tradies.",
  keywords: [
    "LinkedIn ghostwriting",
    "LinkedIn posts Australia",
    "healthcare LinkedIn",
    "tradie LinkedIn",
    "done for you content",
  ],
  openGraph: {
    title: "Voxen — Your LinkedIn. Written For You.",
    description:
      "3 done-for-you LinkedIn posts every week. Built for Australian healthcare workers and tradies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#0A0F1E", color: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}
