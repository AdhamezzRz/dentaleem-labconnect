import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingTeaser = () => {
  const dentistFeatures = [
    "Free to use",
    "Commission per case",
    "Unlimited case creation",
    "Access to all verified labs",
    "Real-time tracking",
    "In-app messaging",
    "Optional premium add-ons",
  ];

  const labTiers = [
    {
      name: "Starter",
      description: "For small labs getting started",
      features: [
        "Basic marketplace listing",
        "Up to 20 cases/month",
        "Standard certification",
        "Email support",
      ],
    },
    {
      name: "Pro",
      description: "For growing labs",
      popular: true,
      features: [
        "Enhanced marketplace profile",
        "Unlimited cases",
        "Priority support",
        "Analytics dashboard",
        "Staff management",
      ],
    },
    {
      name: "Gold Certified",
      description: "For premium labs",
      features: [
        "Gold badge on marketplace",
        "International reach",
        "Dedicated account manager",
        "Advanced analytics",
        "API access",
        "Priority case routing",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Simple Pricing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for dentists and labs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* For Dentists */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              <h3 className="text-2xl font-bold text-foreground">For Dentists & Clinics</h3>
            </div>

            <div className="rounded-3xl bg-card border border-border p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-foreground">Pay Per Case</h4>
                <p className="text-muted-foreground">Simple, transparent pricing</p>
              </div>

              <ul className="space-y-4">
                {dentistFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* For Labs */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/10 border border-secondary/20">
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
              <h3 className="text-2xl font-bold text-foreground">For Dental Labs</h3>
            </div>

            <div className="space-y-6">
              {labTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative rounded-3xl bg-card border p-6 ${
                    tier.popular
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-border"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-primary text-white text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-foreground">{tier.name}</h4>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>

                    <ul className="space-y-2">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Sales CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <Mail className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Need Custom Pricing?</h3>
              <p className="text-muted-foreground">Contact our sales team for enterprise solutions</p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
