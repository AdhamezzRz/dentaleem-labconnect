import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingDown } from "lucide-react";

const RemakeChart = () => {
  const data = [
    { name: "Traditional Workflow", value: 25, fill: "hsl(var(--destructive))" },
    { name: "With Dentaleem", value: 7, fill: "hsl(var(--primary))" },
  ];

  const metrics = [
    { label: "Remake Rate", from: "25%", to: "5-10%", icon: "🔄" },
    { label: "Delivery Delays", from: "High", to: "-45%", icon: "📦" },
    { label: "Communication Gaps", from: "Frequent", to: "Near 0%", icon: "💬" },
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <TrendingDown className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">Measurable Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Dramatic Remake Rate Reduction
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real data from dental labs using structured workflows
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl border border-border p-8 shadow-xl">
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Remake Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-muted/50">
                  <div className="text-3xl mb-3">{metric.icon}</div>
                  <h4 className="font-bold text-foreground mb-2">{metric.label}</h4>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm text-muted-foreground line-through">{metric.from}</span>
                    <span className="text-xl font-bold text-primary">→</span>
                    <span className="text-lg font-bold text-primary">{metric.to}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemakeChart;
