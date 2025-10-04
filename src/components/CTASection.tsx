import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 p-12 md:p-16">
          {/* Decorative dots */}
          <div className="absolute top-8 right-8 flex gap-2 opacity-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
            ))}
          </div>
          <div className="absolute bottom-8 left-8 flex gap-2 opacity-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
            ))}
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Join the Platform</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to Transform Your
              <br />
              Dental Workflow?
            </h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of dentists and laboratories already streamlining their cases 
              through our verified marketplace
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 group">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>

            <p className="text-sm text-white/70">
              No credit card required • ISO-certified labs only • 24/7 support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
