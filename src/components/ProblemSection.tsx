import { AlertCircle, XCircle } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    { icon: "📱", text: "Fragmented ordering (WhatsApp, calls, papers)" },
    { icon: "🔄", text: "High remake rates (up to 25%)" },
    { icon: "📦", text: "Lost cases, missed deadlines" },
    { icon: "👁️", text: "No real-time tracking" },
    { icon: "⚙️", text: "No standardized workflow" },
    { icon: "🌍", text: "Labs have limited market reach" },
    { icon: "🏥", text: "Clinics struggle with consistency" },
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why the dental industry loses <span className="text-destructive">millions</span> every year
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 flex-shrink-0 bg-destructive/10 rounded-xl flex items-center justify-center text-2xl">
                {problem.icon}
              </div>
              <div className="flex items-start gap-2 flex-1">
                <XCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                <p className="text-foreground font-medium">{problem.text}</p>
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
