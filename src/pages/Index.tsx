import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProcessFlow from "@/components/ProcessFlow";
import Features from "@/components/Features";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProcessFlow />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
