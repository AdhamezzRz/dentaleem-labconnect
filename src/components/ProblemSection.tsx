import { AlertCircle, XCircle, MessageSquare, RotateCcw, PackageX, Eye, Settings, Globe, Building2 } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    { icon: MessageSquare, text: "Fragmented ordering (WhatsApp, calls, papers)" },
    { icon: RotateCcw, text: "High remake rates (up to 25%)" },
    { icon: PackageX, text: "Lost cases, missed deadlines" },
    { icon: Eye, text: "No real-time tracking" },
  ];

  return (
    <section id="problem" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Why the dental industry loses <span className="text-destructive">millions</span> every year
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 flex-shrink-0 bg-destructive/10 rounded-xl flex items-center justify-center">
                <problem.icon className="h-7 w-7 text-destructive" />
              </div>
              <div className="flex items-start gap-3 flex-1 pt-1">
                <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-foreground font-medium text-lg leading-relaxed">{problem.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Big statistic */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-destructive to-destructive/80 p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center space-y-4">
              <AlertCircle className="h-16 w-16 text-white mx-auto" />
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                ~450 Million EGP Lost Yearly
              </h3>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                The Egyptian dental market alone loses over 450 million EGP annually due to remakes and workflow errors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
