import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, Plus, X, AlertCircle, Save } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import TeethChartInteractive from "@/components/TeethChartInteractive";
import ShadeSelector from "@/components/ShadeSelector";
import AddCreditCardModal from "@/components/AddCreditCardModal";

interface Restoration {
  id: string;
  type: string;
  teeth: string[]; // Alphabetical notation (UR1, UL2, etc.)
  material: string;
  shade: string;
  shadeNote?: string;
  notes: string;
  hasTryIn: boolean;
  isTryIn?: boolean;
  linkedToId?: string;
}

interface UploadedFile {
  name: string;
  type: string;
  patientName: string;
}

const MATERIALS_REQUIRING_SHADE = ["Zirconia", "E-max", "Metal Ceramic"];

const materialRequiresShade = (material: string) => {
  if (!material) return false;
  const normalized = material.toLowerCase();
  return MATERIALS_REQUIRING_SHADE.some(mat =>
    normalized.includes(mat.toLowerCase())
  );
};

const CreateCase = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [patientName, setPatientName] = useState("");
  const [internalPatientId, setInternalPatientId] = useState("");
  const [patientType, setPatientType] = useState<"adult" | "pediatric">("adult");
  const [clinic, setClinic] = useState("Main Clinic");
  const [priority, setPriority] = useState<"standard" | "urgent">("standard");
  const [caseNotes, setCaseNotes] = useState("");
  const [restorations, setRestorations] = useState<Restoration[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedLab, setSelectedLab] = useState("");
  const [paymentOption, setPaymentOption] = useState<"full" | "split">("full");
  const [showCardModal, setShowCardModal] = useState(false);
  const [hasSavedCard, setHasSavedCard] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill lab from marketplace
  useEffect(() => {
    const labId = searchParams.get('lab');
    if (labId) {
      setSelectedLab(labId);
      toast.success("Lab pre-selected from marketplace!");
    }
  }, [searchParams]);

  const steps = [
    { number: 1, title: "Patient Info", subtitle: "Details & restorations" },
    { number: 2, title: "Material", subtitle: "Select materials" },
    { number: 3, title: "Select Lab", subtitle: "Choose from marketplace" },
    { number: 4, title: "Upload Files", subtitle: "STL, images, X-rays" },
    { number: 5, title: "Review Order", subtitle: "Confirm details" },
    { number: 6, title: "Payment", subtitle: "Confirm & pay" },
  ];

  const addRestoration = () => {
    const newRestoration: Restoration = { 
      id: Date.now().toString(), 
      type: "", 
      teeth: [], 
      material: "", 
      shade: "", 
      notes: "",
      hasTryIn: false
    };
    setRestorations([...restorations, newRestoration]);
    toast.success("Restoration added");
  };

  const removeRestoration = (id: string) => {
    if (restorations.length > 1) {
      // Remove the restoration and its try-in if it exists
      setRestorations(restorations.filter(r => r.id !== id && r.linkedToId !== id));
    }
  };

  const updateRestoration = (id: string, field: keyof Restoration, value: any) => {
    setRestorations(prevRestorations =>
      prevRestorations.map(r => {
        if (r.id === id) {
          const updated = { ...r, [field]: value };

          // If toggling try-in
          if (field === "hasTryIn") {
            if (value === true) {
              // Add try-in restoration
              const tryInId = `${id}-tryin`;
              const tryIn: Restoration = {
                id: tryInId,
                type: r.type,
                teeth: r.teeth,
                material: "PMMA",
                shade: r.shade,
                notes: "Try-In (PMMA)",
                hasTryIn: false,
                isTryIn: true,
                linkedToId: id,
              };
              setTimeout(() => {
                setRestorations(prev => {
                  const mainIndex = prev.findIndex(res => res.id === id);
                  const newRestorations = [...prev];
                  newRestorations.splice(mainIndex + 1, 0, tryIn);
                  return newRestorations;
                });
              }, 0);
            } else {
              // Remove try-in restoration
              setTimeout(() => {
                setRestorations(prev =>
                  prev.filter(res => res.linkedToId !== id)
                );
              }, 0);
            }
          }

          // Update linked try-in if main restoration changes
          if (!r.isTryIn && r.hasTryIn && (field === "type" || field === "teeth" || field === "shade")) {
            setTimeout(() => {
              setRestorations(prev =>
                prev.map(res => {
                  if (res.linkedToId === id) {
                    return { ...res, [field]: value };
                  }
                  return res;
                })
              );
            }, 0);
          }

          return updated;
        }
        return r;
      })
    );
  };

  const handleApplyPromo = () => {
    // Simple promo code validation
    if (promoCode.toUpperCase() === "DENTAL10") {
      setPromoApplied(true);
      setPromoDiscount(0.10);
      toast.success("✅ Promo applied! Discount -10%");
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
      toast.error("❌ Invalid code, please try again");
    }
  };

  const handleSaveDraft = () => {
    // Save draft logic - in real app would save to database
    toast.success("💾 Case saved as draft successfully");
    navigate("/dashboard");
  };

  const handleNext = () => {
    // Validation for step 1 - Patient Info
    if (currentStep === 1) {
      if (!patientName.trim()) {
        toast.error("❌ Patient name is required");
        return;
      }
      if (restorations.length === 0) {
        toast.error("❌ Please add at least one restoration");
        return;
      }
      const incompleteRestoration = restorations.find(r => !r.isTryIn && (!r.type || r.teeth.length === 0));
      if (incompleteRestoration) {
        toast.error("❌ Please complete all restoration details (type and teeth)");
        return;
      }
    }

    // Validation for step 2 - Material
    if (currentStep === 2) {
      const nonTryInRestorations = restorations.filter(r => !r.isTryIn);
      const missingMaterial = nonTryInRestorations.find(r => !r.material);

      const restorationsRequiringShade = restorations.filter(r => materialRequiresShade(r.material));
      const missingShade = restorationsRequiringShade.find(
        r => !r.shade || r.shade.trim() === ""
      );
      
      if (missingMaterial) {
        toast.error("❌ Please select material for all restorations");
        return;
      }
      if (missingShade) {
        toast.error("❌ Please select shade for all restorations");
        return;
      }
    }

    // Validation for step 3 - Lab Selection
    if (currentStep === 3) {
      if (!selectedLab) {
        toast.error("❌ Please select a laboratory");
        return;
      }
    }

    // Validation for step 4 - Upload Files
    if (currentStep === 4) {
      const hasIntraoralScan = uploadedFiles.some(f => f.type === "intraoral");
      const hasImage = uploadedFiles.some(f => f.type === "image");
      if (!hasIntraoralScan) {
        toast.error("❌ At least one intraoral scan is required");
        return;
      }
      if (!hasImage) {
        toast.error("❌ At least one patient image/photo is required");
        return;
      }
    }

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success(`✓ Step ${currentStep} completed`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFileUpload = (type: string) => {
    // Mock file upload with internal ID
    const fileName = internalPatientId 
      ? `${patientName.replace(/\s/g, '_')}_${internalPatientId}_${type}_${Date.now()}.stl`
      : `${patientName.replace(/\s/g, '_')}_${type}_${Date.now()}.stl`;
    
    setUploadedFiles([...uploadedFiles, { 
      name: fileName, 
      type, 
      patientName 
    }]);
    toast.success(`✓ ${type} file uploaded`);
  };

  const handlePaymentSelect = (option: "full" | "split") => {
    if (option === "split" && !hasSavedCard) {
      setShowCardModal(true);
    } else {
      setPaymentOption(option);
    }
  };

  const handleSaveCard = () => {
    setHasSavedCard(true);
    setPaymentOption("split");
    toast.success("Card saved successfully");
  };

  const handleSubmit = () => {
    // Final validation before submission
    if (paymentOption === "split" && !hasSavedCard) {
      toast.error("❌ Please add a credit card for split payment");
      return;
    }

    setIsSubmitting(true);

    // Simulate case creation
    const caseId = `CS${Date.now().toString().slice(-6)}`;
    const caseData = {
      caseId,
      patient: {
        name: patientName,
        internalId: internalPatientId,
        type: patientType,
      },
      clinic,
      priority,
      notes: caseNotes,
      restorations: restorations.map(r => ({
        type: r.type,
        teeth: r.teeth,
        material: r.material,
        shade: r.shade,
        shadeNote: r.shadeNote,
        notes: r.notes,
        isTryIn: r.isTryIn,
      })),
      lab: selectedLab,
      files: uploadedFiles,
      payment: {
        option: paymentOption,
        total: discountedPrice,
        deposit: paymentOption === "split" ? discountedPrice * 0.3 : discountedPrice,
        balance: paymentOption === "split" ? discountedPrice * 0.7 : 0,
        promoApplied,
        promoDiscount,
      },
      createdAt: new Date().toISOString(),
    };

    console.log("Case created:", caseData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`🎉 Case ${caseId} created successfully!`);
      
      setTimeout(() => {
        navigate(`/case/${caseId}`, { state: { caseData } });
      }, 800);
    }, 1500);
  };

  const basePrice = 350;
  const totalPrice = basePrice * restorations.filter(r => !r.isTryIn).length;
  const priceAfterPromo = promoApplied ? totalPrice * (1 - promoDiscount) : totalPrice;
  const discountedPrice = paymentOption === "full" ? priceAfterPromo * 0.95 : priceAfterPromo;

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
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Create New Case</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Step {currentStep} of 6 — Case Creation</p>
          <div className="w-full bg-muted rounded-full h-2 mt-3">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="mb-6 sm:mb-8">
          {/* Mobile: Horizontal Pill Indicators */}
          <div className="flex items-center justify-center gap-2 mb-4 md:hidden">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`h-2 rounded-full transition-all ${
                  currentStep === step.number
                    ? "w-8 bg-primary"
                    : currentStep > step.number
                    ? "w-2 bg-primary/50"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
          
          {/* Desktop: Full Step Display */}
          <div className="hidden md:flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep === step.number
                        ? "bg-primary text-primary-foreground shadow-lg scale-110 ring-4 ring-primary/20"
                        : currentStep > step.number
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p className={`text-xs font-medium transition-colors ${
                      currentStep === step.number ? "text-primary" : "text-foreground"
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="h-1.5 flex-1 mx-3 rounded-full overflow-hidden bg-muted">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        currentStep > step.number ? "bg-primary w-full" : "bg-transparent w-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-4 sm:p-6 md:p-8">
          {/* Step 1 - Patient Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Patient Information</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Full Name *</Label>
                  <Input 
                    id="patientName" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g., Ahmad Mohamed" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internalId">Internal Patient ID</Label>
                  <Input 
                    id="internalId" 
                    value={internalPatientId}
                    onChange={(e) => setInternalPatientId(e.target.value)}
                    placeholder="e.g., P-2148" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your clinic's internal ID for this patient
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Patient Type *</Label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPatientType("adult")}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      patientType === "adult" 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium text-foreground">Adult</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatientType("pediatric")}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      patientType === "pediatric" 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium text-foreground">Pediatric</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseNotes">Case Notes / Instructions</Label>
                <Textarea 
                  id="caseNotes" 
                  value={caseNotes}
                  onChange={(e) => setCaseNotes(e.target.value)}
                  placeholder="Priority instructions, special requests, delivery notes..." 
                  rows={3}
                />
              </div>

              {/* Restorations */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">Restorations *</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addRestoration}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Restoration
                  </Button>
                </div>

                {restorations.length === 0 ? (
                  <Card className="p-8 text-center border-2 border-dashed border-border">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">No restorations added yet</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Click "Add Restoration" to begin
                        </p>
                        <Button 
                          type="button" 
                          variant="default" 
                          size="sm" 
                          onClick={addRestoration}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add First Restoration
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  restorations.map((restoration) => (
                    <Card 
                      key={restoration.id} 
                      className={`p-6 border-2 animate-fade-in ${
                        restoration.isTryIn ? "ml-8 border-secondary/30 bg-secondary/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {restoration.isTryIn ? "Try-In (PMMA)" : `Restoration ${restorations.filter(r => !r.isTryIn).findIndex(r => r.id === restoration.id) + 1}`}
                          </h3>
                          {restoration.isTryIn && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Temporary PMMA version for fitting verification
                            </p>
                          )}
                        </div>
                        {restorations.filter(r => !r.isTryIn).length > 1 && !restoration.isTryIn && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRestoration(restoration.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {!restoration.isTryIn && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Restoration Type *</Label>
                            <Select 
                              value={restoration.type}
                              onValueChange={(value) => updateRestoration(restoration.id, "type", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="crown">Crown</SelectItem>
                                <SelectItem value="bridge">Bridge</SelectItem>
                                <SelectItem value="veneer">Veneer</SelectItem>
                                <SelectItem value="implant">Implant Crown</SelectItem>
                                <SelectItem value="ortho">Ortho Appliance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Select Teeth *</Label>
                            <TeethChartInteractive
                              selectedTeeth={restoration.teeth}
                              onTeethChange={(teeth) => updateRestoration(restoration.id, "teeth", teeth)}
                              mode={patientType}
                              onModeChange={(mode) => setPatientType(mode)}
                            />
                          </div>

                          <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id={`tryin-${restoration.id}`}
                              checked={restoration.hasTryIn}
                              onCheckedChange={(checked) => updateRestoration(restoration.id, "hasTryIn", checked)}
                            />
                            <div className="flex-1">
                              <Label 
                                htmlFor={`tryin-${restoration.id}`}
                                className="cursor-pointer font-medium"
                              >
                                Include Try-In for this restoration
                              </Label>
                              <p className="text-xs text-muted-foreground mt-1">
                                A temporary PMMA version for fitting before final production
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Additional Notes</Label>
                            <Textarea 
                              value={restoration.notes}
                              onChange={(e) => updateRestoration(restoration.id, "notes", e.target.value)}
                              placeholder="Shade details, margin specifications, special requests..." 
                              rows={3} 
                            />
                          </div>
                        </div>
                      )}

                      {restoration.isTryIn && (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="font-medium text-foreground">{restoration.type}</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">Material:</span>
                            <span className="font-medium text-secondary">PMMA (Temporary)</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">Teeth:</span>
                            <span className="font-medium text-foreground">{restoration.teeth.join(", ")}</span>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Step 2 - Material Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Select Materials</h2>
              {restorations.filter(r => !r.isTryIn).map((restoration, index) => (
                <Card key={restoration.id} className="p-6 border-2">
                  <h3 className="font-semibold text-foreground mb-4">
                    Restoration {index + 1} - {restoration.type || "Type"} (Teeth: {restoration.teeth.join(", ")})
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[
                      { name: "Zirconia", desc: "High strength, aesthetic", popular: true },
                      { name: "E-max", desc: "Maximum aesthetics", popular: true },
                      { name: "PMMA", desc: "Temporary restorations", popular: false },
                      { name: "Metal Ceramic", desc: "Traditional PFM", popular: false },
                    ].map((material) => (
                      <button
                        key={material.name}
                        type="button"
                        onClick={() => updateRestoration(restoration.id, "material", material.name)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          restoration.material === material.name
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{material.name}</h4>
                            <p className="text-sm text-muted-foreground">{material.desc}</p>
                          </div>
                          {material.popular && (
                            <div className="px-2 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary">
                              Popular
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <ShadeSelector
                    value={restoration.shade}
                    onChange={(shade, stumpNote) => {
                      updateRestoration(restoration.id, "shade", shade);
                      if (stumpNote !== undefined) {
                        updateRestoration(restoration.id, "shadeNote", stumpNote);
                      }
                    }}
                    stumpNote={restoration.shadeNote}
                  />
                </Card>
              ))}
            </div>
          )}

          {/* Step 3 - Lab Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Select Laboratory</h2>
              
              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                {["Fastest Delivery", "Cheapest Price", "Best Technology", "Highest Rating"].map((filter) => (
                  <Button key={filter} variant="outline" size="sm">
                    {filter}
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  { name: "Precision Dental Lab", rating: 4.9, turnaround: "10-12 days", price: "$350", verified: true },
                  { name: "Elite Dental Solutions", rating: 4.8, turnaround: "8-10 days", price: "$380", verified: true },
                  { name: "Pro Lab Technologies", rating: 4.7, turnaround: "12-14 days", price: "$320", verified: true },
                ].map((lab) => (
                  <Card 
                    key={lab.name}
                    className={`p-6 cursor-pointer transition-all ${
                      selectedLab === lab.name ? "border-primary border-2" : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedLab(lab.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center relative">
                          <div className="w-6 h-6 rounded-full bg-primary"></div>
                          {lab.verified && (
                            <div className="absolute -top-1 -right-1 bg-secondary text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                              ✓
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{lab.name}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>⭐ {lab.rating}</span>
                            <span>📅 {lab.turnaround}</span>
                            <span className="font-semibold text-foreground">{lab.price}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant={selectedLab === lab.name ? "default" : "outline"}>
                        {selectedLab === lab.name ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Button variant="ghost" className="w-full">View Full Marketplace</Button>
            </div>
          )}

          {/* Step 4 - File Uploads */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Upload Files</h2>
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 flex items-start gap-3 mb-6">
                <AlertCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Required Files</p>
                  <p className="text-muted-foreground">At least one intraoral scan and one patient image must be uploaded to proceed.</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Mandatory Files */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Mandatory Files *</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => handleFileUpload("intraoral")}
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">Intraoral Scan (STL)</p>
                      <p className="text-xs text-muted-foreground">Required</p>
                    </div>
                    <div 
                      onClick={() => handleFileUpload("image")}
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">Photos</p>
                      <p className="text-xs text-muted-foreground">Required</p>
                    </div>
                  </div>
                </div>

                {/* Optional Files */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Optional Files</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["X-rays", "Wax-up", "Bite Scan", "CBCT"].map((fileType) => (
                      <div 
                        key={fileType}
                        onClick={() => handleFileUpload(fileType.toLowerCase())}
                        className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">{fileType}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-foreground mb-3">Uploaded Files</h3>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-secondary" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{file.name}</p>
                              <p className="text-xs text-muted-foreground">Type: {file.type} | Patient: {file.patientName}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5 - Review Order */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Review Your Order</h2>
              
              {/* Patient Information */}
              <Card className="p-6 border-2 border-primary/20">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Patient Name</p>
                    <p className="font-medium text-foreground mt-1">{patientName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Patient Type</p>
                    <p className="font-medium text-foreground mt-1 capitalize">{patientType}</p>
                  </div>
                  {internalPatientId && (
                    <div>
                      <p className="text-muted-foreground">Internal ID</p>
                      <p className="font-medium text-foreground mt-1">{internalPatientId}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Restorations */}
              <Card className="p-6 border-2 border-primary/20">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Restorations ({restorations.filter(r => !r.isTryIn).length} items)
                </h3>
                <div className="space-y-4">
                  {restorations.map((restoration) => (
                    <div 
                      key={restoration.id}
                      className={`p-4 rounded-lg ${
                        restoration.isTryIn 
                          ? "bg-secondary/5 border border-secondary/20 ml-8" 
                          : "bg-muted/30"
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium text-foreground mt-1">
                            {restoration.isTryIn ? "Try-In (PMMA)" : restoration.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Material</p>
                          <p className="font-medium text-foreground mt-1">{restoration.material}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Teeth</p>
                          <p className="font-medium text-foreground mt-1">{restoration.teeth.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Shade</p>
                          <p className="font-medium text-foreground mt-1">{restoration.shade}</p>
                        </div>
                        {restoration.notes && !restoration.isTryIn && (
                          <div className="col-span-2">
                            <p className="text-muted-foreground">Notes</p>
                            <p className="font-medium text-foreground mt-1">{restoration.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Lab Selection */}
              <Card className="p-6 border-2 border-primary/20">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Selected Laboratory
                </h3>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedLab}</p>
                    <p className="text-sm text-muted-foreground">Gold Certified Lab</p>
                  </div>
                </div>
              </Card>

              {/* Files Uploaded */}
              <Card className="p-6 border-2 border-primary/20">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Uploaded Files ({uploadedFiles.length})
                </h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">Type: {file.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Price Summary */}
              <Card className="p-6 border-2 border-primary/20 bg-primary/5">
                <h3 className="font-semibold text-foreground mb-4">Price Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="font-medium text-foreground">${basePrice} per restoration</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Restorations</span>
                    <span className="font-medium text-foreground">{restorations.filter(r => !r.isTryIn).length} items</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold text-foreground">Subtotal</span>
                    <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 6 - Payment */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Payment & Confirmation</h2>
              
              <Card className="p-6 bg-muted/30">
                <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient</span>
                    <span className="font-medium text-foreground">{patientName} ({patientType})</span>
                  </div>
                  {internalPatientId && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Internal ID</span>
                      <span className="font-medium text-foreground">{internalPatientId}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Restorations</span>
                    <span className="font-medium text-foreground">
                      {restorations.filter(r => !r.isTryIn).length} item(s)
                      {restorations.some(r => r.isTryIn) && (
                        <span className="text-secondary ml-1">
                          + {restorations.filter(r => r.isTryIn).length} Try-In(s)
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Laboratory</span>
                    <span className="font-medium text-foreground">{selectedLab || "Not selected"}</span>
                  </div>
                  <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Promo Discount</span>
                        <span className="font-medium text-secondary">-${(totalPrice * promoDiscount).toFixed(2)}</span>
                      </div>
                    )}
                    {paymentOption === "full" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Full Payment Discount (5%)</span>
                        <span className="font-medium text-secondary">-${(priceAfterPromo * 0.05).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base pt-2 border-t border-border">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-primary text-lg">${discountedPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Promo Code Section */}
              <Card className="p-4 bg-card">
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  Have a promo code?
                </Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter promo code (e.g., DENTAL10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1"
                    disabled={promoApplied}
                  />
                  <Button 
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                  >
                    {promoApplied ? "Applied ✓" : "Apply"}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-secondary font-medium mt-2">
                    ✅ Promo code applied! You saved ${(totalPrice * promoDiscount).toFixed(2)}
                  </p>
                )}
              </Card>

              <div className="space-y-4">
                <Label>Payment Option *</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card 
                    className={`p-4 cursor-pointer transition-all ${
                      paymentOption === "full" ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => handlePaymentSelect("full")}
                  >
                    <p className="font-medium text-foreground">Full Payment</p>
                    <p className="text-sm text-muted-foreground">Pay 100% now</p>
                    {paymentOption === "full" && (
                      <div className="mt-2 px-2 py-1 rounded bg-secondary/10 text-secondary text-xs font-medium inline-block">
                        ✓ 5% discount applied
                      </div>
                    )}
                  </Card>
                  <Card 
                    className={`p-4 cursor-pointer transition-all ${
                      paymentOption === "split" ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => handlePaymentSelect("split")}
                  >
                    <p className="font-medium text-foreground">Split Payment</p>
                    <p className="text-sm text-muted-foreground">30% now, 70% on delivery</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      30% now to start; 70% auto-captured on confirmed delivery
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {hasSavedCard ? "✓ Card saved" : "⚠ Requires saved credit card"}
                    </p>
                  </Card>
                </div>
              </div>

              {paymentOption === "split" && !hasSavedCard && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Credit card required</p>
                    <p className="text-muted-foreground">
                      A saved credit card is required for split payments. We'll charge 30% now and automatically capture the remaining 70% when delivery is confirmed.
                    </p>
                  </div>
                </div>
              )}

              {paymentOption === "split" && (
                <Card className="p-4 bg-muted/20">
                  <h4 className="text-sm font-medium text-foreground mb-3">Split Payment Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deposit (30% now)</span>
                      <span className="font-medium text-foreground">${(discountedPrice * 0.3).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Balance (70% on delivery confirmation)</span>
                      <span className="font-medium text-foreground">${(discountedPrice * 0.7).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-primary">${discountedPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Navigation Buttons - Sticky on mobile */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-8 pt-6 border-t border-border sticky sm:static bottom-0 left-0 right-0 bg-card sm:bg-transparent p-4 sm:p-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:shadow-none z-20">
            <div className="flex gap-2 order-2 sm:order-1">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
                className="flex-1 sm:flex-none h-12 sm:h-10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                variant="outline"
                onClick={handleSaveDraft}
                className="flex-1 sm:flex-none gap-2 text-muted-foreground hover:text-foreground h-12 sm:h-10"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save as Draft</span>
                <span className="sm:hidden">Save</span>
              </Button>
            </div>
            {currentStep < 6 ? (
              <Button 
                onClick={handleNext} 
                className="order-1 sm:order-2 bg-primary hover:bg-primary/90 h-12 sm:h-10"
                disabled={isSubmitting}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                className="order-1 sm:order-2 bg-primary hover:bg-primary/90 h-12 sm:h-10"
                disabled={(paymentOption === "split" && !hasSavedCard) || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    <span className="hidden sm:inline">Creating Case...</span>
                    <span className="sm:hidden">Creating...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Create Case & Pay</span>
                    <span className="sm:hidden">Create & Pay</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Credit Card Modal */}
      <AddCreditCardModal 
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        onSaveCard={handleSaveCard}
      />
    </div>
  );
};

export default CreateCase;
