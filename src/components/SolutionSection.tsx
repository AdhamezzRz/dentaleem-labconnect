import { Building2, FlaskConical, Package, ShieldCheck } from "lucide-react";

const SolutionSection = () => {
  const solutions = [
    {
      icon: Building2,
      title: "For Dentists & Clinics",
      color: "from-primary to-primary/80",
      features: [
        "One-click case ordering",
        "Verified labs marketplace",
        "Real-time tracking",
        "In-app chat & design approval",
        "Easy payments (full or 30/70 split)",
        "Safer delivery",
      ],
    },
    {
      icon: FlaskConical,
      title: "For Dental Labs",
      color: "from-secondary to-secondary/80",
      features: [
        "New sales channel",
        "Automated workflow",
        "AI turnaround prediction",
        "Lower remake percentages",
        "Faster payments",
        "Analytics & performance dashboards",
      ],
    },
    {
      icon: Package,
      title: "Logistics",
      color: "from-accent to-accent/80",
      features: [
        "Vetted dental couriers",
        "Automated airway bills",
        "Real-time delivery tracking",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Compliance",
      color: "from-primary/90 to-secondary",
      features: [
        "Verified labs",
        "Standardized workflows",
        "Digital records for every case",
      ],
    },
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            One platform. <span className="text-primary">Zero chaos.</span>
            <br />
            Maximum profitability.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dentaleem's end-to-end solution connects every stakeholder in the dental workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:shadow-2xl transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative z-10 p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center shadow-lg`}>
                    <solution.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{solution.title}</h3>
                </div>

                <ul className="space-y-3">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
