import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import RemakeChart from "@/components/RemakeChart";
import LabValueSection from "@/components/LabValueSection";
import MarketplacePreview from "@/components/MarketplacePreview";
import FeaturesGrid from "@/components/FeaturesGrid";
import Testimonials from "@/components/Testimonials";
import PricingTeaser from "@/components/PricingTeaser";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <RemakeChart />
      <LabValueSection />
      <MarketplacePreview />
      <FeaturesGrid />
      <Testimonials />
      <PricingTeaser />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
