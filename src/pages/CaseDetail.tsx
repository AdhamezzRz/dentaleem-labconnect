import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  MessageSquare,
  Package,
} from "lucide-react";

const CaseDetail = () => {
  const { id } = useParams();
  const [caseData, setCase] = useState<any>(null);
  const [lab, setLab] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCaseDetails();
  }, [id]);

  const fetchCaseDetails = async () => {
    try {
      const { data: caseData, error: caseError } = await supabase
        .from("cases")
        .select("*")
        .eq("id", id)
        .single();

      if (caseError) throw caseError;

      if (caseData.lab_id) {
        const { data: labData } = await supabase
          .from("labs")
          .select("*")
          .eq("id", caseData.lab_id)
          .single();
        setLab(labData);
      }

      const { data: updatesData } = await supabase
        .from("case_updates")
        .select("*")
        .eq("case_id", id)
        .order("created_at", { ascending: false });

      setCase(caseData);
      setUpdates(updatesData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      draft: "bg-muted",
      pending_payment: "bg-yellow-500/10 text-yellow-500",
      design: "bg-blue-500/10 text-blue-500",
      production: "bg-purple-500/10 text-purple-500",
      delivery: "bg-primary/10 text-primary",
      final_production: "bg-secondary/10 text-secondary",
      completed: "bg-green-500/10 text-green-500",
      remake: "bg-red-500/10 text-red-500",
    };
    return colors[status] || "bg-muted";
  };

  const stages = [
    { key: "draft", label: "Draft", icon: FileText },
    { key: "design", label: "Design", icon: FileText },
    { key: "production", label: "Production", icon: Package },
    { key: "delivery", label: "Delivery", icon: Package },
    { key: "final_production", label: "Final", icon: Package },
    { key: "completed", label: "Completed", icon: CheckCircle2 },
  ];

  const currentStageIndex = stages.findIndex(
    (s) => s.key === caseData?.status
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading case details...</p>
      </div>
    );
  }

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
            <span className="text-xl font-bold text-foreground">
              DENTALEEM
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-foreground"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Case Details
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-muted-foreground">
                Patient: {caseData?.patient_initials}
              </p>
              <Badge variant="outline">Adult</Badge>
            </div>
          </div>
          <Badge className={getStatusColor(caseData?.status)}>
            {caseData?.status?.replace("_", " ").toUpperCase()}
          </Badge>
        </div>

        {/* Progress Timeline */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Case Progress
          </h2>
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isCompleted = index <= currentStageIndex;
              const isCurrent = index === currentStageIndex;

              return (
                <div key={stage.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">
                      {stage.label}
                    </span>
                  </div>
                  {index < stages.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        isCompleted ? "bg-primary" : "bg-muted"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case Information */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Case Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Case Type</p>
                <p className="font-medium text-foreground capitalize">
                  {caseData?.case_type}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Material</p>
                <p className="font-medium text-foreground">
                  {caseData?.material || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tooth Number</p>
                <p className="font-medium text-foreground">
                  {caseData?.tooth_number || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium text-foreground">
                  {caseData?.due_date
                    ? new Date(caseData.due_date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
            {caseData?.notes && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-foreground">{caseData.notes}</p>
              </div>
            )}
          </Card>

          {/* Lab Information */}
          {lab && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Laboratory
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground">{lab.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ⭐ {lab.rating} ({lab.total_reviews} reviews)
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Lab
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Case Updates */}
        {updates.length > 0 && (
          <Card className="p-6 mt-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Case Updates
            </h2>
            <div className="space-y-4">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className="border-l-2 border-primary pl-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getStatusColor(update.status)}>
                      {update.status.replace("_", " ").toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(update.created_at).toLocaleString()}
                    </span>
                  </div>
                  {update.message && (
                    <p className="text-sm text-foreground">{update.message}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CaseDetail;
