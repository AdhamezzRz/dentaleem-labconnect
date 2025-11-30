import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
const CTASection = () => {
  return <section id="cta" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-primary/90 p-12 md:p-20 shadow-2xl">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          {/* Decorative dots */}
          <div className="absolute top-8 right-8 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-white"></div>)}
          </div>
          <div className="absolute bottom-8 left-8 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-white"></div>)}
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <Zap className="h-5 w-5 text-white animate-pulse" />
              <span className="text-lg font-bold text-white">Limited Early Access</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Join the Future of Dental Lab Workflow
            </h2>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Dentaleem launches <span className="font-bold">Q4 2025</span> — early access spots are limited.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-2xl px-10 h-14 group">
                  Join as a Dentist
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/lab/registration">
                <Button size="lg" variant="outline" className="border-2 border-white text-white backdrop-blur-sm px-10 h-14 bg-secondary-foreground">
                  Join as a Lab
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 text-white/80">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">No credit card required</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">ISO-certified labs only</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;