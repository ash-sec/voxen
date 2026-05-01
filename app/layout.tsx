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
  title: "Voxen — LinkedIn Ghostwriting Service for Australian Professionals",
  description:
    "Voxen is a done-for-you LinkedIn ghostwriting service. We write 3 posts a week in your voice and deliver them to your inbox every Monday, Wednesday and Friday.",
  keywords: [
    "LinkedIn ghostwriting",
    "LinkedIn ghostwriter",
    "LinkedIn ghostwriting service",
    "LinkedIn ghostwriter Australia",
    "done for you LinkedIn content",
    "LinkedIn content writing service",
    "LinkedIn posts Australia",
    "healthcare LinkedIn",
    "tradie LinkedIn",
    "done for you content",
  ],
  openGraph: {
    title: "Voxen — LinkedIn Ghostwriting Service for Australian Professionals",
    description:
      "Voxen is a done-for-you LinkedIn ghostwriting service. We write 3 posts a week in your voice and deliver them to your inbox every Monday, Wednesday and Friday.",
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
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#0f172a", color: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}