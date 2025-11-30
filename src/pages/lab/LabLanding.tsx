import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Package, Clock, DollarSign, Globe, Shield, Star, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

const LabLanding = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Gain New Dentist Clients",
      description: "Access a growing network of verified dentists actively seeking quality lab partners"
    },
    {
      icon: Package,
      title: "Reduce Remake Rates by 60%",
      description: "AI-powered workflow management and digital communication minimize errors"
    },
    {
      icon: Zap,
      title: "AI Workflow Management",
      description: "Automated case tracking, smart task assignment, and predictive turnaround optimization"
    },
    {
      icon: Clock,
      title: "Faster Turnaround",
      description: "Streamlined processes help you deliver cases 45% faster with fewer delays"
    },
    {
      icon: DollarSign,
      title: "Guaranteed 30% Deposit",
      description: "Secure payment system with automatic 30% deposit on every case"
    },
    {
      icon: Globe,
      title: "Regional & International Reach",
      description: "Gold certified labs can receive cases from dentists nationwide and internationally"
    },
    {
      icon: Shield,
      title: "Verified Lab Badge",
      description: "Build trust instantly with our verification badge displayed to all dentists"
    },
    {
      icon: Target,
      title: "Complete Workflow Automation",
      description: "From order receipt to delivery tracking - all automated in one platform"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">Dentaleem</Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/lab/benefits">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10 -z-10" />
        
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Grow Your Lab.<br />
                  <span className="text-primary">Cut Remakes.</span><br />
                  Reach More Dentists.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Dentaleem gives labs new sales channels, automated workflow, faster payments, and the tools to compete regionally — all in one platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg h-14" asChild>
                  <Link to="/lab/pre-registration">
                    Join as a Dental Lab
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14" asChild>
                  <Link to="/lab/benefits">Explore Benefits</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Verified & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span className="text-sm text-muted-foreground">4.8/5 Lab Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Regional Coverage</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <Card className="relative border-2">
                <CardContent className="p-8 space-y-6">
                  {/* Mock Dashboard Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">New Orders Today</h3>
                      <span className="text-2xl font-bold text-primary">+6</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { dentist: "Dr. Ahmed", case: "Crown #14", status: "New" },
                        { dentist: "Dr. Sarah", case: "Bridge #6-8", status: "Design" },
                        { dentist: "Dr. Hassan", case: "Veneer #11", status: "Production" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium text-foreground text-sm">{item.dentist}</p>
                            <p className="text-xs text-muted-foreground">{item.case}</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Revenue</span>
                      <span className="text-lg font-bold text-accent">+38%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Why Labs Choose Dentaleem</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to scale your lab, reduce waste, and build lasting relationships with dentists
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Card key={idx} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-12">
              Real Results from Real Labs
            </h2>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div className="space-y-2">
                <p className="text-5xl lg:text-6xl font-bold text-primary-foreground">+38%</p>
                <p className="text-lg text-primary-foreground/90">Average Revenue Increase</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl lg:text-6xl font-bold text-primary-foreground">-60%</p>
                <p className="text-lg text-primary-foreground/90">Remake Rate Reduction</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl lg:text-6xl font-bold text-primary-foreground">30/70</p>
                <p className="text-lg text-primary-foreground/90">Split Payments Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Ready to Transform Your Lab?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join hundreds of labs already growing with Dentaleem. Setup takes less than 5 minutes.
            </p>
            <Button size="lg" className="text-lg h-14" asChild>
              <Link to="/lab/pre-registration">
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              ✓ No credit card required  •  ✓ Verified labs only  •  ✓ Free to join
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabLanding;
