import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-24 pt-32">
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-400 mb-8 text-sm">Last updated: April 2026</p>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p>When you sign up for Voxen, we collect your name, email address, profession, and the answers you provide in our onboarding questionnaire. We use this information solely to provide our LinkedIn ghostwriting service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
            <p>Your information is used to write personalised LinkedIn posts, deliver those posts to your email inbox, and manage your subscription. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Payment Information</h2>
            <p>Payments are processed securely through Stripe. We do not store your credit card details on our servers. Stripe&apos;s privacy policy applies to payment processing.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data Storage</h2>
            <p>Your subscriber data is stored securely in Upstash Redis (hosted infrastructure). We implement appropriate security measures to protect your personal information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Email Communications</h2>
            <p>By subscribing to Voxen, you consent to receive your LinkedIn posts and service-related emails (such as billing notifications and account updates) via email.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at{" "}
              <a href="mailto:voxensupport.au@gmail.com" className="text-blue-400 hover:text-blue-300">voxensupport.au@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Contact</h2>
            <p>For any privacy-related questions, contact us at{" "}
              <a href="mailto:voxensupport.au@gmail.com" className="text-blue-400 hover:text-blue-300">voxensupport.au@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
