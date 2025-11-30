import { ArrowRight, UserCheck, Search, FileText, Upload, CheckCircle, Star, Cog, ClipboardCheck, Truck, DollarSign, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const dentistFlow = [
    { icon: UserCheck, title: "Onboard & verify", description: "Quick registration with clinic verification" },
    { icon: Search, title: "Choose lab from marketplace", description: "Browse verified labs with ratings & reviews" },
    { icon: FileText, title: "Create case", description: "Interactive teeth chart & material selection" },
    { icon: Upload, title: "Upload scans & images", description: "STL files, X-rays, photos" },
    { icon: CheckCircle, title: "Approve design", description: "Review and approve 3D designs" },
    { icon: Star, title: "Delivery & rate", description: "Receive restoration & leave feedback" },
  ];

  const labFlow = [
    { icon: UserCheck, title: "Verification & onboarding", description: "Submit credentials for certification" },
    { icon: FileText, title: "Receive orders", description: "New cases appear in your dashboard" },
    { icon: Cog, title: "Design → production → QC", description: "Complete workflow with tracking" },
    { icon: Truck, title: "Ship & update status", description: "Real-time delivery updates" },
    { icon: DollarSign, title: "Get paid", description: "Automatic payouts after delivery" },
    { icon: TrendingUp, title: "Gain more clients", description: "Build reputation & grow business" },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            How Dentaleem Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Seamless workflows for dentists and labs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Dentist Flow */}
          <div id="for-dentists" className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">For Dentists</h3>
            </div>

            <div className="space-y-4">
              {dentistFlow.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {index < dentistFlow.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="h-5 w-5 text-primary animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lab Flow */}
          <div id="for-labs" className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/10 border border-secondary/20">
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">For Labs</h3>
            </div>

            <div className="space-y-4">
              {labFlow.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {index < labFlow.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="h-5 w-5 text-secondary animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
