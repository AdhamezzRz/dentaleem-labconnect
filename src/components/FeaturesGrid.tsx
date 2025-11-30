import { 
  FileText, 
  Grid3x3, 
  Eye, 
  MessageSquare, 
  CreditCard, 
  Tag, 
  Bell, 
  BarChart3, 
  Truck, 
  Users, 
  Archive,
  CheckCircle2
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    { icon: FileText, title: "Case Creation Wizard", description: "Step-by-step guided workflow" },
    { icon: Grid3x3, title: "Interactive Teeth Chart", description: "Visual tooth selection with alpha codes" },
    { icon: Eye, title: "3D STL Viewer", description: "Preview scans before submission" },
    { icon: CheckCircle2, title: "Design Approval Workflow", description: "Review and approve designs in-app" },
    { icon: MessageSquare, title: "In-App Messaging", description: "Direct communication with labs" },
    { icon: CreditCard, title: "Flexible Payments", description: "Full payment or 30/70 split options" },
    { icon: Tag, title: "Promo Codes", description: "Discount codes and special offers" },
    { icon: Bell, title: "Notifications & Reminders", description: "Real-time updates and alerts" },
    { icon: BarChart3, title: "Analytics Dashboard", description: "Track performance and metrics" },
    { icon: Truck, title: "Integrated Couriers", description: "Automated shipping and tracking" },
    { icon: Users, title: "Staff Roles & Permissions", description: "Team management and access control" },
    { icon: Archive, title: "Digital Archive", description: "Complete case history and records" },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8 mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Powerful Features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage dental cases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
