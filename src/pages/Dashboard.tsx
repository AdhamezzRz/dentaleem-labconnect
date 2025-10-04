import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Clock, CheckCircle2, AlertCircle, Package, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const activeCases = [
    { id: "PO-2024-001", patient: "A.M.", status: "Design Approval", lab: "Precision Lab", phase: 2, progress: 33, dueDate: "Jan 25" },
    { id: "PO-2024-002", patient: "B.S.", status: "In Production", lab: "Elite Dental", phase: 3, progress: 60, dueDate: "Jan 28" },
    { id: "PO-2024-003", patient: "C.R.", status: "Delivery", lab: "Pro Lab", phase: 4, progress: 80, dueDate: "Jan 24" },
  ];

  const stats = [
    { label: "Active Cases", value: "8", icon: Package, color: "primary", change: "+2 this week" },
    { label: "Avg. Turnaround", value: "12d", icon: Clock, color: "secondary", change: "2d faster" },
    { label: "Completed", value: "47", icon: CheckCircle2, color: "primary", change: "+5 this month" },
    { label: "Labs Worked With", value: "6", icon: TrendingUp, color: "secondary", change: "+1 verified" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <span className="text-xl font-bold text-foreground">DENTALEEM</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-foreground">Dashboard</Link>
            <Link to="/marketplace" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link>
            <Button variant="ghost" size="sm">Dr. Sarah Ahmad</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your dental cases and track progress</p>
          </div>
          <Link to="/create-case">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-5 w-5" />
              Create New Case
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-secondary font-medium">{stat.change}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Active Cases */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Active Cases</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>

          <div className="space-y-4">
            {activeCases.map((caseItem, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{caseItem.id}</span>
                      <span className="text-sm text-muted-foreground">Patient: {caseItem.patient}</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                      <span className="text-sm font-medium text-foreground">{caseItem.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Lab</p>
                      <p className="text-sm font-medium text-foreground">{caseItem.lab}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Due</p>
                      <p className="text-sm font-medium text-foreground">{caseItem.dueDate}</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{caseItem.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${caseItem.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
