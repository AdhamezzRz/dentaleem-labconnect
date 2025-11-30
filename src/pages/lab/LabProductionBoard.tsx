import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const LabProductionBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stages = [
    { id: "new", title: "New", color: "bg-gray-100 border-gray-300" },
    { id: "design", title: "Design", color: "bg-primary/10 border-primary/30" },
    { id: "production", title: "Production", color: "bg-accent/20 border-accent/40" },
    { id: "qc", title: "Quality Control", color: "bg-yellow-100 border-yellow-300" },
    { id: "delivery", title: "Delivery", color: "bg-green-100 border-green-300" },
  ];

  const cases = {
    new: [
      { id: "PO-2025-001", dentist: "Dr. Ahmed Helmy", patient: "A.M.", material: "Zirconia", count: 2, priority: "Urgent", due: "2d" },
      { id: "PO-2025-002", dentist: "Dr. Sara Youssef", patient: "M.K.", material: "Emax", count: 1, priority: "Standard", due: "5d" },
    ],
    design: [
      { id: "PO-2025-003", dentist: "Dr. Walid Zaki", patient: "F.H.", material: "PMMA", count: 4, priority: "Standard", due: "4d" },
    ],
    production: [
      { id: "PO-2025-004", dentist: "Dr. Laila Omar", patient: "S.A.", material: "Zirconia", count: 3, priority: "Urgent", due: "1d" },
      { id: "PO-2025-005", dentist: "Dr. Hossam Ali", patient: "N.M.", material: "Emax", count: 2, priority: "Standard", due: "3d" },
    ],
    qc: [
      { id: "PO-2025-006", dentist: "Dr. Mona Farid", patient: "R.K.", material: "Zirconia", count: 1, priority: "Standard", due: "2d" },
    ],
    delivery: [
      { id: "PO-2025-007", dentist: "Dr. Youssef Ibrahim", patient: "L.S.", material: "Emax", count: 2, priority: "Standard", due: "1d" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground">Production Board</h1>
            <div className="flex items-center gap-3 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Case ID, Patient, or Dentist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Mobile: Horizontal Swipe Lanes */}
        <div className="md:hidden overflow-x-auto -mx-3 px-3 pb-4">
          <div className="flex gap-4 min-w-max">
            {stages.map((stage) => (
              <div key={stage.id} className="flex flex-col w-[280px] flex-shrink-0">
                <div className={`p-3 rounded-t-lg border-b-2 ${stage.color}`}>
                  <h3 className="font-semibold text-foreground text-sm">{stage.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cases[stage.id as keyof typeof cases]?.length || 0} cases
                  </p>
                </div>
                <div className="space-y-3 p-3 bg-muted/30 rounded-b-lg h-[500px] overflow-y-auto">
                  {cases[stage.id as keyof typeof cases]?.map((case_) => (
                    <Card
                      key={case_.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-card"
                    >
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-xs text-foreground">{case_.id}</p>
                            <p className="text-xs text-muted-foreground truncate">{case_.dentist}</p>
                          </div>
                          {case_.priority === "Urgent" && (
                            <Badge variant="destructive" className="text-xs h-5">Urgent</Badge>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground truncate">Patient: {case_.patient}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {case_.count}× {case_.material}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Due in {case_.due}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 text-xs px-2" asChild>
                            <Link to={`/lab/cases/${case_.id}`}>View</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop: Grid Kanban */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4">
          {stages.map((stage) => (
            <div key={stage.id} className="flex flex-col">
              <div className={`p-3 rounded-t-lg border-b-2 ${stage.color}`}>
                <h3 className="font-semibold text-foreground">{stage.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {cases[stage.id as keyof typeof cases]?.length || 0} cases
                </p>
              </div>
              <div className="space-y-3 p-3 bg-muted/30 rounded-b-lg min-h-[500px]">
                {cases[stage.id as keyof typeof cases]?.map((case_) => (
                  <Card
                    key={case_.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-card"
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm text-foreground">{case_.id}</p>
                          <p className="text-xs text-muted-foreground">{case_.dentist}</p>
                        </div>
                        {case_.priority === "Urgent" && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Patient: {case_.patient}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {case_.count}× {case_.material}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Due in {case_.due}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                          <Link to={`/lab/cases/${case_.id}`}>View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabProductionBoard;
