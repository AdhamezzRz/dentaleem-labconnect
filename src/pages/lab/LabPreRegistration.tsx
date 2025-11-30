import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Shield, Settings, DollarSign, Truck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const LabPreRegistration = () => {
  const steps = [
    {
      icon: FileText,
      title: "Basic Info",
      description: "Lab name, location, contact details, and logo",
      time: "1 min"
    },
    {
      icon: Shield,
      title: "Verification",
      description: "Trade license, operating license, owner ID documents",
      time: "2 min"
    },
    {
      icon: Settings,
      title: "Capabilities",
      description: "Services offered, materials, equipment, and technologies",
      time: "1 min"
    },
    {
      icon: DollarSign,
      title: "Pricing & Turnaround",
      description: "Set your pricing structure and estimated turnaround times",
      time: "1 min"
    },
    {
      icon: Truck,
      title: "Shipping Coverage",
      description: "Define delivery zones, courier preferences, and pickup address",
      time: "1 min"
    }
  ];

  const reassurances = [
    {
      icon: Shield,
      title: "Your Data is Secure",
      description: "All information is encrypted and handled according to GDPR standards"
    },
    {
      icon: Settings,
      title: "Edit Anytime",
      description: "You can update your profile, pricing, and settings whenever needed"
    },
    {
      icon: CheckCircle2,
      title: "Minimal Paperwork",
      description: "We've simplified the process — only essential documents required"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/lab/landing" className="text-2xl font-bold text-primary">Dentaleem</Link>
            <Button variant="outline" asChild>
              <Link to="/lab/landing">Back</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 border-b bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl font-bold text-foreground">
              Let's Set Up Your Lab in 3–5 Minutes
            </h1>
            <p className="text-xl text-muted-foreground">
              A quick, straightforward process to get your lab verified and ready to receive cases from dentists
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>Fast Setup</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>Secure Process</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Need From You</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to complete your lab registration
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Card key={idx} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Step Number */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                          {idx + 1}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <Icon className="h-8 w-8 text-accent" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            ~{step.time}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reassurance Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {reassurances.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card key={idx} className="border-2">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Verification Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-accent/20 bg-accent/5">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">What Happens Next?</h3>
                    <ul className="space-y-3">
                      {[
                        "Submit your application with all required documents",
                        "Our team reviews your application within 24–48 hours",
                        "You'll receive an email notification once verified",
                        "Complete your onboarding setup (services, pricing, staff)",
                        "Start receiving cases from dentists immediately"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-accent font-bold flex-shrink-0">{idx + 1}.</span>
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-primary-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Click below to begin your lab registration. You can save progress and return anytime.
            </p>
            <Button size="lg" variant="secondary" className="text-lg h-14" asChild>
              <Link to="/lab/register">
                Start Registration Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-primary-foreground/80">
              Questions? <Link to="/lab/support" className="underline">Visit our Help Center</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabPreRegistration;
