import { Shield, Users, Clock, MessageSquare, BarChart3, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Labs Only",
    description: "Every laboratory is ISO & DAMAS certified before joining our marketplace",
    color: "primary",
  },
  {
    icon: Users,
    title: "Direct Collaboration",
    description: "Real-time chat between dentists and lab teams throughout the process",
    color: "secondary",
  },
  {
    icon: Clock,
    title: "SLA Compliance",
    description: "Automated tracking ensures every case meets delivery commitments",
    color: "primary",
  },
  {
    icon: MessageSquare,
    title: "Design Approval",
    description: "3D preview, inline comments, and iteration loops for perfect results",
    color: "secondary",
  },
  {
    icon: BarChart3,
    title: "Complete Analytics",
    description: "Track turnaround times, costs, and performance metrics in real-time",
    color: "primary",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Built-in QC checklists and SOP compliance at every production stage",
    color: "secondary",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Built for Precision
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Medical-grade features wrapped in an intuitive, modern interface
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
