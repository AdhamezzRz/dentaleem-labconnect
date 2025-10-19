import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, CheckCircle2, TrendingDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LabDashboard = () => {
  const stats = [
    { label: "Active Cases", value: "18", icon: Package, change: "+3", color: "text-primary" },
    { label: "Pending Designs", value: "7", icon: AlertCircle, change: "-2", color: "text-yellow-600" },
    { label: "Completed Orders", value: "96", icon: CheckCircle2, change: "+12", color: "text-accent" },
    { label: "Avg Turnaround", value: "4.6d", icon: Clock, change: "-0.3d", color: "text-primary" },
  ];

  const recentCases = [
    { id: "PO-2025-001", dentist: "Dr. Ahmed Helmy", patient: "A.M.", stage: "Design", priority: "Urgent", due: "2 days" },
    { id: "PO-2025-002", dentist: "Dr. Sara Youssef", patient: "M.K.", stage: "Production", priority: "Standard", due: "4 days" },
    { id: "PO-2025-003", dentist: "Dr. Walid Zaki", patient: "F.H.", stage: "QC", priority: "Standard", due: "1 day" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome, Precision Dental Lab</h1>
              <p className="text-muted-foreground mt-1">Manage your production workflow efficiently</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/lab/cases/new">Create Internal Case</Link>
              </Button>
              <Button asChild>
                <Link to="/lab/production-board">View All Cases</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 70% */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                          <p className={`text-xs mt-2 ${stat.color}`}>{stat.change} this week</p>
                        </div>
                        <div className={`p-3 rounded-lg bg-primary/10`}>
                          <Icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Cases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Cases</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/lab/production-board">View All →</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentCases.map((case_) => (
                    <div
                      key={case_.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold text-foreground">{case_.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {case_.dentist} • Patient: {case_.patient}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            case_.stage === 'Design' ? 'bg-primary/10 text-primary' :
                            case_.stage === 'Production' ? 'bg-accent/20 text-accent' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {case_.stage}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Due in {case_.due}</p>
                          <p className={`text-xs ${
                            case_.priority === 'Urgent' ? 'text-red-600' : 'text-muted-foreground'
                          }`}>
                            {case_.priority}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/lab/cases/${case_.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <TrendingDown className="h-5 w-5 text-accent" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Remake Rate Improved</p>
                    <p className="text-sm text-muted-foreground">Your remake rate dropped by 0.8% this week</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <Clock className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Faster Turnaround</p>
                    <p className="text-sm text-muted-foreground">You're 2 days faster than average this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 30% */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="default" className="w-full justify-start" asChild>
                  <Link to="/lab/production-board">
                    <Package className="mr-2 h-4 w-4" />
                    Production Board
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/lab/staff">
                    Manage Staff
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/lab/analytics">
                    View Analytics
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/lab/financials">
                    Financial Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Remake Rate */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Remake Rate</span>
                      <span className="text-sm font-medium text-foreground">3.2%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "3.2%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                      <span className="text-sm font-medium text-foreground">94%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">Need Help?</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Contact Dentaleem support
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;
