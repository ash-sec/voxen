import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsVoxen from "@/components/WhatIsVoxen";
import BeforeAfter from "@/components/BeforeAfter";
import WhoItsFor from "@/components/WhoItsFor";
import WhyLinkedIn from "@/components/WhyLinkedIn";
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
        <WhatIsVoxen />
        <BeforeAfter />
        <WhoItsFor />
        <WhyLinkedIn />
        <HowItWorks />
        <PricingSection />
        <Testimonials />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
