import { TrendingUp, RotateCcw, DollarSign, Users, Globe, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

const LabValueSection = () => {
  const [revenue, setRevenue] = useState(0);
  const [remake, setRemake] = useState(0);

  useEffect(() => {
    const revenueInterval = setInterval(() => {
      setRevenue((prev) => (prev < 38 ? prev + 1 : 38));
    }, 50);
    const remakeInterval = setInterval(() => {
      setRemake((prev) => (prev < 60 ? prev + 2 : 60));
    }, 50);

    return () => {
      clearInterval(revenueInterval);
      clearInterval(remakeInterval);
    };
  }, []);

  const benefits = [
    { icon: Users, title: "New dentist clients every week", description: "Access to verified dentist network" },
    { icon: BarChart3, title: "Verified profile improves trust", description: "Gold/Standard certification badges" },
    { icon: TrendingUp, title: "AI-powered turnaround optimization", description: "Smart scheduling and predictions" },
    { icon: Globe, title: "International market access for Gold Labs", description: "Expand beyond local boundaries" },
  ];

  return (
    <section id="lab-value" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8 mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Labs increase revenue, decrease remakes
          </h2>
        </div>

        {/* Big Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <TrendingUp className="h-12 w-12 text-white mx-auto mb-4" />
            <div className="relative z-10">
              <h3 className="text-5xl font-bold text-white mb-2">+{revenue}%</h3>
              <p className="text-xl text-white/90">Average Revenue Increase</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-secondary/80 p-8 text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <RotateCcw className="h-12 w-12 text-white mx-auto mb-4" />
            <div className="relative z-10">
              <h3 className="text-5xl font-bold text-white mb-2">−{remake}%</h3>
              <p className="text-xl text-white/90">Remake Reduction</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent/80 p-8 text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <DollarSign className="h-12 w-12 text-white mx-auto mb-4" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2">30/70 Split</h3>
              <p className="text-xl text-white/90">Guaranteed Deposit Payments</p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-lg">
                <benefit.icon className="h-7 w-7 text-white" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-foreground text-lg">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabValueSection;
