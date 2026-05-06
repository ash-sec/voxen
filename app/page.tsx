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
      <Footer />
    </>
  );
}
