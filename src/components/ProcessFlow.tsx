import { FileText, Pencil, Settings, Truck, Package, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "PO Draft",
    description: "Create case, upload files, select lab",
  },
  {
    icon: Pencil,
    title: "Design",
    description: "Review & approve 3D designs",
  },
  {
    icon: Settings,
    title: "Production",
    description: "Quality-controlled manufacturing",
  },
  {
    icon: Truck,
    title: "Delivery",
    description: "Track courier with proof",
  },
  {
    icon: Package,
    title: "Try-In",
    description: "Test fit & finalize",
  },
  {
    icon: CheckCircle,
    title: "Complete",
    description: "Rate & review lab",
  },
];

const ProcessFlow = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            End-to-End Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From order to delivery, every step is tracked, verified, and transparent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden xl:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
