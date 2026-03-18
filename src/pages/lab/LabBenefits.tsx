import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Workflow, DollarSign, Globe, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LabBenefits = () => {
  const revenueData = [
    { month: "Jan", traditional: 45000, dentaleem: 45000 },
    { month: "Feb", traditional: 46000, dentaleem: 50000 },
    { month: "Mar", traditional: 47000, dentaleem: 56000 },
    { month: "Apr", traditional: 48000, dentaleem: 62000 },
    { month: "May", traditional: 49000, dentaleem: 68000 },
    { month: "Jun", traditional: 50000, dentaleem: 75000 }
  ];

  const workflowSteps = [
    { step: "Design", icon: "✏️", color: "bg-primary/10 text-primary" },
    { step: "Approve", icon: "✓", color: "bg-accent/10 text-accent" },
    { step: "Produce", icon: "🔧", color: "bg-primary/10 text-primary" },
    { step: "QC", icon: "🔍", color: "bg-accent/10 text-accent" },
    { step: "Deliver", icon: "📦", color: "bg-primary/10 text-primary" }
  ];

  const paymentTimeline = [
    { stage: "Order Placed", amount: "30%", status: "Immediate deposit" },
    { stage: "Work in Progress", amount: "—", status: "No payment hold" },
    { stage: "Delivery Confirmed", amount: "70%", status: "Auto-captured" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/lab/landing" className="text-2xl font-bold text-primary">Dentaleem</Link>
            <Button asChild>
              <Link to="/lab/pre-registration">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            What You Get as a Dentaleem Lab
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools, guaranteed payments, and growth opportunities designed specifically for dental labs
          </p>
        </div>
      </section>

      {/* Section A: Sales Growth */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                Sales Growth
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                Average 38% Revenue Increase in First 6 Months
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Active labs on Dentaleem see significant revenue growth through increased order volume, 
                reduced remakes, and access to a growing network of verified dentists.
              </p>
              <ul className="space-y-3">
                {[
                  "New dentist clients every week",
                  "Higher order frequency from existing partners",
                  "Premium pricing for Gold Certified labs",
                  "International market access"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Monthly Order Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="traditional" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2}
                      name="Traditional"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="dentaleem" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="With Dentaleem"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section B: Workflow Automation */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Workflow className="h-4 w-4" />
              Workflow Automation
            </div>
            <h2 className="text-4xl font-bold text-foreground">Complete Process Automation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From order receipt to delivery confirmation — every step is tracked, optimized, and automated
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <Card className="w-40 hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mx-auto text-2xl`}>
                      {step.icon}
                    </div>
                    <p className="font-semibold text-foreground">{step.step}</p>
                  </CardContent>
                </Card>
                {idx < workflowSteps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground hidden sm:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Smart Task Assignment", desc: "AI assigns work to staff based on expertise and availability" },
              { title: "Real-Time Tracking", desc: "Dentists see live updates at every production stage" },
              { title: "Predictive Analytics", desc: "AI forecasts turnaround times and optimizes scheduling" }
            ].map((feature, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section C: Financial Upside */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="border-2">
              <CardHeader>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                  <DollarSign className="h-4 w-4" />
                  Payment Security
                </div>
                <CardTitle className="text-2xl">30/70 Split Payment System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {paymentTimeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-accent">{item.amount}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">{item.stage}</p>
                      <p className="text-sm text-muted-foreground">{item.status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">
                Guaranteed Cash Flow & Faster Payments
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Never chase payments again. Our automated system ensures you get paid on time, every time.
              </p>
              <ul className="space-y-3">
                {[
                  "30% deposit captured immediately when dentist places order",
                  "No payment holds during production",
                  "Remaining 70% auto-released upon delivery confirmation",
                  "Transparent invoicing and financial reporting",
                  "Weekly payouts to your bank account"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section D: Global Exposure */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-sm font-medium">
              <Globe className="h-4 w-4 text-primary" />
              Gold Certification
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Become Gold Certified → Receive International Cases
            </h2>
            <p className="text-xl text-muted-foreground">
              Labs that meet our Gold standards gain access to dentists across the region and internationally, 
              dramatically expanding market reach.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: "🏆", title: "Premium Badge", desc: "Stand out with visible Gold certification" },
                { icon: "🌍", title: "Regional Access", desc: "Receive cases from nationwide dentists" },
                { icon: "✈️", title: "International Orders", desc: "Export-ready labs get global exposure" }
              ].map((item, idx) => (
                <Card key={idx} className="border-2">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button size="lg" className="mt-8" disabled>
              Apply for Gold Certification
              <Badge variant="secondary" className="ml-2 text-xs">Coming Soon</Badge>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-foreground">Ready to Join?</h2>
            <p className="text-xl text-muted-foreground">
              Start your application today. Setup takes less than 5 minutes.
            </p>
            <Button size="lg" asChild>
              <Link to="/lab/pre-registration">
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabBenefits;
