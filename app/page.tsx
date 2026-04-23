import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyLinkedIn from "@/components/WhyLinkedIn";
import WhoItsFor from "@/components/WhoItsFor";
import HowItWorks from "@/components/HowItWorks";
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
        <WhyLinkedIn />
        <WhoItsFor />
        <HowItWorks />
        <PricingSection />
        <Testimonials />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
