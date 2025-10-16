import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Clock, CheckCircle2, AlertCircle, Package, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Dashboard = () => {
  const activeCases = [
    { id: "PO-2024-001", patient: "A.M.", status: "Design Approval", lab: "Precision Lab", phase: 2, progress: 33, dueDate: "Jan 25" },
    { id: "PO-2024-002", patient: "B.S.", status: "In Production", lab: "Elite Dental", phase: 3, progress: 60, dueDate: "Jan 28" },
    { id: "PO-2024-003", patient: "C.R.", status: "Delivery", lab: "Pro Lab", phase: 4, progress: 80, dueDate: "Jan 24" },
  ];

  const draftCases = [
    { id: "DRAFT-001", patient: "M.K.", restorations: 2, lastSaved: "2 hours ago" },
  ];

  const stats = [
    { label: "Active Cases", value: "8", icon: Package, color: "primary", change: "+2 this week" },
    { label: "Avg. Turnaround", value: "12d", icon: Clock, color: "secondary", change: "2d faster" },
    { label: "Completed", value: "47", icon: CheckCircle2, color: "primary", change: "+5 this month" },
    { label: "Labs Worked With", value: "6", icon: TrendingUp, color: "secondary", change: "+1 verified" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <main className="flex-1">
          {/* Top Bar */}
          <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            </div>
            <Link to="/create-case">
              <Button>Create New Case</Button>
            </Link>
          </div>

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

        {/* Draft Cases */}
        {draftCases.length > 0 && (
          <Card className="p-6 mb-6 bg-secondary/5 border-secondary/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                Draft Cases
              </h2>
            </div>
            <div className="space-y-3">
              {draftCases.map((draft) => (
                <div key={draft.id} className="border border-border rounded-lg p-4 bg-card hover:border-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{draft.id}</span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                            Draft
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">Patient: {draft.patient} • {draft.restorations} restoration(s)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">Saved {draft.lastSaved}</span>
                      <Link to="/create-case">
                        <Button variant="outline" size="sm">Resume</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

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
      </main>
    </div>
    </SidebarProvider>
  );
};

export default Dashboard;
