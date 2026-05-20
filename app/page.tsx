import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StickyScroll from "@/components/StickyScroll";
import WhyLinkedIn from "@/components/WhyLinkedIn";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StickyScroll />
        <WhyLinkedIn />
        <PricingSection />
        <Testimonials />
        <FAQSection />
      </main>
      <section className="sr-only">
        <p>Voxen is a LinkedIn ghostwriting service helping business owners, real estate agents, mortgage brokers, financial advisers, tradies, coaches and consultants build their LinkedIn presence without writing a single word. Our done-for-you LinkedIn ghostwriting service delivers 3 posts per week written in your voice straight to your inbox. Looking for a LinkedIn ghostwriter for hire, LinkedIn content creation, LinkedIn personal branding or consistent LinkedIn growth? Voxen handles it all. The best LinkedIn ghostwriting service for professionals worldwide. Affordable LinkedIn ghostwriting starting at $250 per month. Trusted by professionals across Australia, the UK, US, Canada and beyond. LinkedIn ghostwriting has never been simpler. Outsource your LinkedIn content today and start showing up consistently. LinkedIn ghostwriting for executives, LinkedIn ghostwriting for coaches, LinkedIn ghostwriting for consultants, LinkedIn ghostwriting for financial advisers, LinkedIn ghostwriting for real estate agents, LinkedIn ghostwriting for mortgage brokers, LinkedIn ghostwriting for small business owners, LinkedIn ghostwriting for entrepreneurs.</p>
      </section>
      <Footer />
    </>
  );
}
