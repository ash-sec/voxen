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
        <p>Voxen is an Australian LinkedIn ghostwriting service helping business owners, real estate agents, mortgage brokers, financial advisers, tradies and coaches build their LinkedIn presence without writing a single word. Our done-for-you LinkedIn content service delivers 3 posts per week written in your voice straight to your inbox. If you are looking for a LinkedIn ghostwriter in Australia, LinkedIn content creation, LinkedIn personal branding or consistent LinkedIn growth, Voxen handles it all. Trusted by Australian professionals across Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast and beyond. LinkedIn ghostwriting Australia has never been simpler.</p>
      </section>
      <Footer />
    </>
  );
}
