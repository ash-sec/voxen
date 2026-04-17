import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-24 pt-32">
        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-slate-400 mb-8 text-sm">Last updated: April 2026</p>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Service Description</h2>
            <p>Voxen provides a LinkedIn content creation service for Australian healthcare workers and tradespeople. By subscribing, you receive three (3) LinkedIn posts per week delivered to your email inbox on Monday, Wednesday, and Friday.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Subscription & Billing</h2>
            <p>Voxen is a subscription service billed at $250 AUD per month. Your subscription renews automatically each month until cancelled. By subscribing, you authorise us to charge your payment method on a recurring basis.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Cancellation</h2>
            <p>You may cancel your subscription at any time from your account dashboard. Upon cancellation, you will continue to receive service until the end of your current billing period. No partial refunds are provided for unused time.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Content Ownership</h2>
            <p>All LinkedIn posts delivered to you are yours to use as you see fit. You own the content. Voxen retains no rights over posts once delivered.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Acceptable Use</h2>
            <p>You agree to use Voxen&apos;s services for lawful purposes only. Content is generated based on information you provide. You are responsible for reviewing posts before publishing them on LinkedIn.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Disclaimer</h2>
            <p>Voxen is not affiliated with LinkedIn. We do not guarantee specific outcomes such as follower growth, engagement rates, or business results from using our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Contact</h2>
            <p>For any questions about these terms, contact us at{" "}
              <a href="mailto:voxensupport.au@gmail.com" className="text-blue-400 hover:text-blue-300">voxensupport.au@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
