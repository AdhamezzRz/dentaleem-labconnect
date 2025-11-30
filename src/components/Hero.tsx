import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle2, Sparkles, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev < 450 ? prev + 15 : 450));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Secure</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <CheckCircle2 className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Verified Labs</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">AI Workflow</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Lock className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">GDPR/HIPAA Ready</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            The Future of Dental Lab
            <br />
            Workflow Starts Here.
          </h1>

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-200"></div>
            </div>
            <span className="text-lg font-medium text-white">Dentaleem — Dental • End-to-End Marketplace</span>
          </div>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            One platform for dentists and labs to order, track, design, manage, and deliver dental restorations with <span className="font-bold">zero miscommunication</span> and <span className="font-bold">zero wasted time.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-2xl group">
                Get Started (Dentist)
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/lab/registration">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm">
                Join as a Dental Lab
              </Button>
            </Link>
          </div>

          {/* Animated mockup placeholder */}
          <div className="mt-16 relative">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2 animate-fade-in">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <p className="text-white font-medium">Case Creation</p>
                </div>
                <div className="text-center space-y-2 animate-fade-in delay-200">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="text-white font-medium">Real-Time Tracking</p>
                </div>
                <div className="text-center space-y-2 animate-fade-in delay-300">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-white font-medium">Delivery Confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
