import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Clock, CheckCircle2, Package, TrendingUp, 
  Search, Bell, MessageCircle, ChevronDown, Trash2,
  User, Settings, LogOut, Building2
} from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import QuickActionsPanel from "@/components/dashboard/QuickActionsPanel";
import TimelineWidget from "@/components/dashboard/TimelineWidget";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import PaymentsPreview from "@/components/dashboard/PaymentsPreview";
import ReviewsSnapshot from "@/components/dashboard/ReviewsSnapshot";
import AnalyticsMini from "@/components/dashboard/AnalyticsMini";

const Dashboard = () => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const activeCases = [
    { 
      id: "PO-2024-001", 
      patient: "A.M.", 
      status: "Design Approval", 
      lab: "Precision Lab", 
      progress: 40, 
      dueDate: "Jan 25",
      restorations: "2 Crowns",
      material: "Zirconia",
      teeth: "14, 15",
      notes: "Patient prefers natural shade",
      filesCount: 3
    },
    { 
      id: "PO-2024-002", 
      patient: "B.S.", 
      status: "In Production", 
      lab: "Elite Dental", 
      progress: 70, 
      dueDate: "Jan 28",
      restorations: "1 Bridge",
      material: "E-max",
      teeth: "21-23",
      notes: "Rush case - expedited delivery",
      filesCount: 5
    },
    { 
      id: "PO-2024-003", 
      patient: "C.R.", 
      status: "Delivery", 
      lab: "Pro Lab", 
      progress: 90, 
      dueDate: "Jan 24",
      restorations: "3 Veneers",
      material: "Porcelain",
      teeth: "11, 12, 13",
      notes: "Final shade adjustment approved",
      filesCount: 2
    },
  ];

  const draftCases = [
    { id: "DRAFT-001", patient: "M.K.", restorations: 2, lastSaved: "2 hours ago" },
  ];

  const stats = [
    { label: "Active Cases", value: "8", icon: Package, change: "+2 this week", link: "/dashboard" },
    { label: "Avg. Turnaround", value: "12d", icon: Clock, change: "2d faster", link: "/analytics" },
    { label: "Completed", value: "47", icon: CheckCircle2, change: "+5 this month", link: "/dashboard" },
    { label: "Labs Worked With", value: "6", icon: TrendingUp, change: "+1 verified", link: "/marketplace" },
  ];

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-muted"; // Draft
    if (progress < 50) return "bg-primary"; // Design
    if (progress < 80) return "bg-accent"; // Production
    if (progress < 100) return "bg-amber-500"; // Delivery - Gold for shipping
    return "bg-primary"; // Complete - Dark green
  };

  const getStatusBadgeColor = (status: string) => {
    if (status.includes("Design")) return "bg-primary/10 text-primary border-primary/20";
    if (status.includes("Production")) return "bg-accent/20 text-accent-foreground border-accent/30";
    if (status.includes("Delivery")) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <main className="flex-1 flex flex-col">
          {/* Enhanced Header Bar */}
          <div className="sticky top-0 z-10 h-14 sm:h-16 border-b border-border bg-card/95 backdrop-blur-sm flex items-center justify-between px-3 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <SidebarTrigger />
              <h1 className="text-lg sm:text-xl font-bold text-foreground">Dashboard</h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Global Search - Hidden on mobile */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search patients, cases, labs..." 
                  className="pl-9 w-[300px]"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              {/* Messages */}
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>

              {/* Create Case Button - Compact on mobile */}
              <Link to="/create-case" className="hidden sm:block">
                <Button className="bg-secondary hover:bg-secondary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Case
                </Button>
              </Link>
              <Link to="/create-case" className="sm:hidden">
                <Button size="icon" className="bg-secondary hover:bg-secondary/90 h-9 w-9">
                  <Plus className="h-5 w-5" />
                </Button>
              </Link>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        DM
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Building2 className="mr-2 h-4 w-4" />
                    Switch Clinic
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8">
              {/* Stats Grid - Glass Effect Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Link key={index} to={stat.link}>
                      <Card className="p-4 sm:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group backdrop-blur-sm bg-card/50 border-2 hover:border-primary/30">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-xs text-secondary font-medium">{stat.change}</p>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-6">
                {/* Left Column - Main Content */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Draft Cases */}
                  {draftCases.length > 0 && (
                    <Card className="p-6 bg-amber-500/5 border-amber-500/20">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                          Draft Cases
                        </h2>
                      </div>
                      <div className="space-y-3">
                        {draftCases.map((draft) => (
                          <div key={draft.id} className="border border-border rounded-lg p-4 bg-card hover:border-amber-500/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-foreground">{draft.id}</span>
                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-500/30">
                                      Draft
                                    </Badge>
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    Patient: {draft.patient} • {draft.restorations} restoration(s)
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Saved {draft.lastSaved}</span>
                                <Link to="/create-case">
                                  <Button variant="outline" size="sm">Resume</Button>
                                </Link>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Active Cases - Enhanced with Accordion */}
                  <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-foreground">Active Cases</h2>
                      <Button variant="ghost" size="sm">View All</Button>
                    </div>

                    <div className="space-y-4">
                      {activeCases.map((caseItem) => (
                        <div key={caseItem.id} className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-foreground">{caseItem.id}</span>
                                  <span className="text-sm text-muted-foreground">Patient: {caseItem.patient}</span>
                                </div>
                                <Badge variant="outline" className="bg-secondary/10 border-secondary/20">
                                  {caseItem.status}
                                </Badge>
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
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setExpandedCase(expandedCase === caseItem.id ? null : caseItem.id)}
                                >
                                  {expandedCase === caseItem.id ? "Collapse" : "Expand"}
                                </Button>
                              </div>
                            </div>

                            {/* Progress Bar with Dynamic Color */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Progress</span>
                                <span>{caseItem.progress}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className={`${getProgressColor(caseItem.progress)} h-2 rounded-full transition-all duration-300`}
                                  style={{ width: `${caseItem.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Expandable Details */}
                          {expandedCase === caseItem.id && (
                            <div className="px-4 pb-4 pt-2 bg-accent/5 border-t border-border animate-in slide-in-from-top-2">
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                  <p className="text-xs text-muted-foreground">Restorations</p>
                                  <p className="text-sm font-medium">{caseItem.restorations}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Material</p>
                                  <p className="text-sm font-medium">{caseItem.material}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Teeth</p>
                                  <p className="text-sm font-medium">{caseItem.teeth}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Files Attached</p>
                                  <p className="text-sm font-medium">{caseItem.filesCount} files</p>
                                </div>
                              </div>
                              <div className="mb-3">
                                <p className="text-xs text-muted-foreground mb-1">Notes</p>
                                <p className="text-sm text-foreground">{caseItem.notes}</p>
                              </div>
                              <Link to={`/case/${caseItem.id}`}>
                                <Button variant="default" size="sm" className="w-full">
                                  View Case Details
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Payments Preview */}
                  <PaymentsPreview />
                </div>

                {/* Right Column - 30% Sticky */}
                <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                  <QuickActionsPanel />
                  <TimelineWidget />
                  <ActivityFeed />
                  <ReviewsSnapshot />
                  <AnalyticsMini />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
