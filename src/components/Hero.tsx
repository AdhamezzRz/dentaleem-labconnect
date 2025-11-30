import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle2, Brain, Lock } from "lucide-react";
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
    <section className="relative pt-40 pb-28 px-6 overflow-hidden bg-gradient-to-b from-background via-accent/10 to-background">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-accent rounded-full blur-3xl"></div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-40 right-10 w-32 h-32 border-2 border-accent/20 rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 border-2 border-primary/20 rounded-full"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Premium icon badges */}
          <div className="flex flex-wrap gap-4 justify-center mb-8 animate-fade-in">
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-all hover:scale-105 hover:shadow-md">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">Secure</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-all hover:scale-105 hover:shadow-md">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">Verified Labs</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-all hover:scale-105 hover:shadow-md">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">AI Workflow</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-all hover:scale-105 hover:shadow-md">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">GDPR/HIPAA Ready</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary leading-[1.1] tracking-tight">
            The Future of Dental Lab
            <br />
            Workflow Starts Here.
          </h1>

          {/* Tagline badge */}
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-200"></div>
            </div>
            <span className="text-lg font-semibold text-primary">Dentaleem — Dental • End-to-End Marketplace</span>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            One platform for dentists and labs to order, track, design, manage, and deliver dental restorations with <span className="font-bold text-foreground">zero miscommunication</span> and <span className="font-bold text-foreground">zero wasted time.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="h-14 px-10 text-base bg-accent text-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all group"
              >
                Get Started (Dentist)
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/lab/registration">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-10 text-base border-2 border-primary text-primary hover:bg-primary/5 shadow-md hover:shadow-lg transition-all"
              >
                Join as a Dental Lab
              </Button>
            </Link>
          </div>

          {/* Animated workflow preview */}
          <div className="mt-20 relative">
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-10 shadow-2xl hover:shadow-3xl transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4 animate-fade-in group">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-foreground">Case Creation</p>
                  <p className="text-sm text-muted-foreground">Digital workflow in minutes</p>
                </div>
                <div className="text-center space-y-4 animate-fade-in delay-200 group">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-foreground">Real-Time Tracking</p>
                  <p className="text-sm text-muted-foreground">Complete transparency</p>
                </div>
                <div className="text-center space-y-4 animate-fade-in delay-300 group">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-foreground">Delivery Confirmation</p>
                  <p className="text-sm text-muted-foreground">Secure & verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 fill-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
