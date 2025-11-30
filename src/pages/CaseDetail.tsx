import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  Package,
  Truck,
} from "lucide-react";
import { CaseHeader } from "@/components/CaseHeader";
import { CaseInformationAccordion } from "@/components/CaseInformationAccordion";
import { DesignPreviewSection } from "@/components/DesignPreviewSection";
import { FilesSection } from "@/components/FilesSection";
import { CommunicationSection } from "@/components/CommunicationSection";
import { DeliveryPaymentSection } from "@/components/DeliveryPaymentSection";
import { CaseReviewSection } from "@/components/CaseReviewSection";

const CaseDetail = () => {
  const { id } = useParams();
  const [caseData, setCase] = useState<any>(null);
  const [lab, setLab] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("info");
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

      setCase(caseData);
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

  // Mock data for demo
  const mockRestorations = [
    {
      id: "1",
      type: "Crown",
      material: "Zirconia",
      teethNumbers: ["14", "15"],
      notes: "Patient prefers natural shade A2",
    },
    {
      id: "2",
      type: "Crown",
      material: "PMMA",
      teethNumbers: ["14", "15"],
      isTryIn: true,
      notes: "Try-in for fitting verification",
    },
  ];

  const mockDesignComments = [
    {
      id: "1",
      author: "Dr. Ahmed",
      role: "dentist" as const,
      message: "Please adjust the occlusal surface slightly",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      author: "TechDent Lab",
      role: "lab" as const,
      message: "Adjustments made as requested",
      timestamp: new Date().toISOString(),
      attachment: "design_v2.stl",
    },
  ];

  const mockFiles = [
    {
      id: "1",
      name: "intraoral_scan.stl",
      type: "stl" as const,
      uploadedBy: "dentist" as const,
      uploadDate: new Date().toISOString(),
      url: "#",
    },
    {
      id: "2",
      name: "patient_xray.jpg",
      type: "xray" as const,
      uploadedBy: "dentist" as const,
      uploadDate: new Date().toISOString(),
      url: "#",
    },
  ];

  const mockMessages = [
    {
      id: "1",
      sender: "Dr. Ahmed",
      role: "dentist" as const,
      message: "When can I expect the design preview?",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "2",
      sender: "TechDent Lab",
      role: "lab" as const,
      message: "Design will be ready by tomorrow afternoon",
      timestamp: new Date(Date.now() - 43200000).toISOString(),
    },
  ];

  const mockNotes = [
    {
      id: "1",
      content: "Patient mentioned sensitivity to cold - discuss with lab",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

  const stages = [
    { key: "draft", label: "Draft", icon: FileText, description: "Case created" },
    { key: "design", label: "Design", icon: FileText, description: "Digital design" },
    { key: "production", label: "Production", icon: Package, description: "Manufacturing" },
    { key: "delivery", label: "Delivery", icon: Truck, description: "In transit" },
    { key: "completed", label: "Complete", icon: CheckCircle2, description: "Received" },
  ];

  const currentStageIndex = stages.findIndex(
    (s) => s.key === caseData?.status
  );
  const progressPercentage = ((currentStageIndex + 1) / stages.length) * 100;

  const sideNavItems = [
    { id: "info", label: "Case Info", icon: FileText },
    { id: "progress", label: "Progress", icon: Clock },
    { id: "design", label: "Design", icon: FileText },
    { id: "files", label: "Files", icon: Package },
    { id: "chat", label: "Chat", icon: Package },
    { id: "delivery", label: "Delivery", icon: Truck },
  ];

  if (caseData?.status === "completed") {
    sideNavItems.push({ id: "review", label: "Review", icon: CheckCircle2 });
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      <nav className="border-b border-border bg-card sticky top-0 z-50">
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
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Side Navigation - Desktop Only */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                QUICK NAVIGATION
              </h3>
              <nav className="space-y-1">
                {sideNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>
          
          {/* Mobile: Horizontal Scrolling Tabs */}
          <div className="lg:hidden overflow-x-auto -mx-3 px-3 pb-2">
            <div className="flex gap-2 min-w-max">
              {sideNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {/* Header */}
            <CaseHeader
              caseId={id || ""}
              patientName={caseData?.patient_initials || "Sarah Mohamed"}
              internalPatientId="P-2148"
              patientType="Adult"
              caseType={caseData?.case_type || "crown"}
              labName={lab?.name}
              isGoldCertified={lab?.is_verified}
              status={caseData?.status || "draft"}
              expectedDelivery={caseData?.due_date}
            />

            {/* Progress Timeline */}
            <div id="progress">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Case Progress
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Track your case through every stage
                </p>
                <Progress value={progressPercentage} className="mb-6" />
                <div className="flex items-center justify-between">
                  {stages.map((stage, index) => {
                    const Icon = stage.icon;
                    const isCompleted = index <= currentStageIndex;
                    const isCurrent = index === currentStageIndex;

                    return (
                      <div key={stage.key} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                              isCompleted
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "bg-muted text-muted-foreground"
                            } ${
                              isCurrent
                                ? "ring-4 ring-primary/20 scale-110"
                                : ""
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="text-xs font-medium text-foreground mt-2">
                            {stage.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {stage.description}
                          </span>
                        </div>
                        {index < stages.length - 1 && (
                          <div
                            className={`flex-1 h-1 mx-2 transition-all ${
                              isCompleted ? "bg-primary" : "bg-muted"
                            }`}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Case Information */}
            <div id="info">
              <CaseInformationAccordion
                restorations={mockRestorations}
                createdAt={caseData?.created_at || new Date().toISOString()}
                lastUpdated={caseData?.updated_at || new Date().toISOString()}
                priority="standard"
                assignedTechnician="Ahmed Hassan"
              />
            </div>

            {/* Design Preview */}
            <div id="design">
              <DesignPreviewSection
                designImages={[]}
                version={2}
                comments={mockDesignComments}
                onApprove={() => {}}
                onRequestEdit={(feedback) => console.log(feedback)}
              />
            </div>

            {/* Files */}
            <div id="files">
              <FilesSection files={mockFiles} onUpload={() => {}} />
            </div>

            {/* Communication */}
            <div id="chat">
              <CommunicationSection
                messages={mockMessages}
                notes={mockNotes}
                unreadCount={1}
                onSendMessage={(msg) => console.log(msg)}
                onSaveNote={(note) => console.log(note)}
              />
            </div>

            {/* Delivery & Payment */}
            <div id="delivery">
              <DeliveryPaymentSection
                delivery={{
                  courier: "Aramex",
                  trackingNumber: "ARX-2025-1234567",
                  status: "in_transit",
                  eta: new Date(Date.now() + 172800000).toISOString(),
                }}
                payment={{
                  type: "full",
                  paidAmount: 8550,
                  remainingBalance: 0,
                  paymentDate: new Date().toISOString(),
                  promoCode: "DENTAL10",
                  discount: 950,
                }}
                onConfirmReceipt={() => {}}
              />
            </div>

            {/* Review (only if completed) */}
            {caseData?.status === "completed" && (
              <div id="review">
                <CaseReviewSection
                  labName={lab?.name || "TechDent Lab"}
                  isGoldCertified={lab?.is_verified}
                  onSubmitReview={(rating, comment, tags) => {
                    console.log({ rating, comment, tags });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
