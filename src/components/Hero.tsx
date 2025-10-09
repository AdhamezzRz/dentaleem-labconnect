import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse delay-75"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-150"></div>
            </div>
            <span className="text-sm font-medium text-foreground">Dental • End-to-End Marketplace</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Connect. Collaborate.
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              Complete Cases.
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The verified marketplace connecting dentists and dental laboratories. 
            From purchase order to delivery, manage every case with complete transparency and precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/auth">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                I'm a Dentist
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                I'm a Laboratory
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 justify-center pt-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <span className="text-muted-foreground">ISO Verified Labs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <span className="text-muted-foreground">End-to-End Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <span className="text-muted-foreground">Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
