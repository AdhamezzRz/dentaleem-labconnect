import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, Plus, X, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TeethChart from "@/components/TeethChart";
import AddCreditCardModal from "@/components/AddCreditCardModal";

interface Restoration {
  id: string;
  type: string;
  teeth: number[];
  material: string;
  shade: string;
  notes: string;
}

interface UploadedFile {
  name: string;
  type: string;
  patientName: string;
}

const CreateCase = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [patientName, setPatientName] = useState("");
  const [internalPatientId, setInternalPatientId] = useState("");
  const [patientType, setPatientType] = useState<"adult" | "pediatric">("adult");
  const [restorations, setRestorations] = useState<Restoration[]>([
    { id: "1", type: "", teeth: [], material: "", shade: "", notes: "" }
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedLab, setSelectedLab] = useState("");
  const [paymentOption, setPaymentOption] = useState<"full" | "split">("full");
  const [showCardModal, setShowCardModal] = useState(false);
  const [hasSavedCard, setHasSavedCard] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: "Patient Info", subtitle: "Details & restorations" },
    { number: 2, title: "Upload Files", subtitle: "STL, images, X-rays" },
    { number: 3, title: "Material", subtitle: "Select materials" },
    { number: 4, title: "Select Lab", subtitle: "Choose from marketplace" },
    { number: 5, title: "Payment", subtitle: "Confirm & pay" },
  ];

  const addRestoration = () => {
    setRestorations([...restorations, { 
      id: Date.now().toString(), 
      type: "", 
      teeth: [], 
      material: "", 
      shade: "", 
      notes: "" 
    }]);
  };

  const removeRestoration = (id: string) => {
    if (restorations.length > 1) {
      setRestorations(restorations.filter(r => r.id !== id));
    }
  };

  const updateRestoration = (id: string, field: keyof Restoration, value: any) => {
    setRestorations(restorations.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleNext = () => {
    // Validation for step 1
    if (currentStep === 1) {
      if (!patientName) {
        toast.error("Patient name is required");
        return;
      }
      if (restorations.some(r => !r.type || r.teeth.length === 0)) {
        toast.error("Please complete all restoration details");
        return;
      }
    }

    // Validation for step 2
    if (currentStep === 2) {
      const hasIntraoralScan = uploadedFiles.some(f => f.type === "intraoral");
      const hasImage = uploadedFiles.some(f => f.type === "image");
      if (!hasIntraoralScan || !hasImage) {
        toast.error("At least one intraoral scan and one image are required");
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (type: string) => {
    // Mock file upload with internal ID
    const fileName = internalPatientId 
      ? `${type}_${internalPatientId}_${Date.now()}.stl`
      : `${type}_${Date.now()}.stl`;
    
    setUploadedFiles([...uploadedFiles, { 
      name: fileName, 
      type, 
      patientName 
    }]);
    toast.success(`${type} file uploaded`);
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
    toast.success("Case created successfully!");
    navigate("/dashboard");
  };

  const basePrice = 350;
  const totalPrice = basePrice * restorations.length;
  const discountedPrice = paymentOption === "full" ? totalPrice * 0.95 : totalPrice;

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

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create New Case</h1>
          <p className="text-muted-foreground">Follow the steps to create your purchase order</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep >= step.number 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="text-center mt-2 hidden md:block">
                    <p className="text-xs font-medium text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-8">
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
                    Add Another Restoration
                  </Button>
                </div>

                {restorations.map((restoration, index) => (
                  <Card key={restoration.id} className="p-6 border-2 animate-fade-in">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Restoration {index + 1}</h3>
                      {restorations.length > 1 && (
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
                        <TeethChart
                          selectedTeeth={restoration.teeth}
                          onTeethChange={(teeth) => updateRestoration(restoration.id, "teeth", teeth)}
                        />
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
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 - File Uploads */}
          {currentStep === 2 && (
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

          {/* Step 3 - Material Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Select Materials</h2>
              {restorations.map((restoration, index) => (
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

                  <div className="space-y-2">
                    <Label>Shade Selection *</Label>
                    <Select 
                      value={restoration.shade}
                      onValueChange={(value) => updateRestoration(restoration.id, "shade", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select shade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a1">A1</SelectItem>
                        <SelectItem value="a2">A2</SelectItem>
                        <SelectItem value="a3">A3</SelectItem>
                        <SelectItem value="b1">B1</SelectItem>
                        <SelectItem value="custom">Custom Match</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Step 4 - Lab Selection */}
          {currentStep === 4 && (
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

          {/* Step 5 - Payment */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Payment & Confirmation</h2>
              
              <Card className="p-6 bg-muted/30">
                <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient</span>
                    <span className="font-medium text-foreground">{patientName} ({patientType})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Restorations</span>
                    <span className="font-medium text-foreground">{restorations.length} item(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Laboratory</span>
                    <span className="font-medium text-foreground">{selectedLab || "Not selected"}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-base">
                    <span className="font-semibold text-foreground">Total</span>
                    <div className="text-right">
                      {paymentOption === "full" && totalPrice > discountedPrice && (
                        <div className="text-xs text-muted-foreground line-through">${totalPrice}</div>
                      )}
                      <span className="font-bold text-primary">${discountedPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <Label>Payment Option *</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card 
                    className={`p-4 cursor-pointer transition-all ${
                      paymentOption === "full" ? "border-primary bg-primary/5" : "hover:border-primary/50"
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
                      paymentOption === "split" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => handlePaymentSelect("split")}
                  >
                    <p className="font-medium text-foreground">Split Payment</p>
                    <p className="text-sm text-muted-foreground">50% now, 50% on delivery</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {hasSavedCard ? "✓ Card saved" : "Requires saved credit card"}
                    </p>
                  </Card>
                </div>
              </div>

              {paymentOption === "split" && !hasSavedCard && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Credit card required</p>
                    <p className="text-muted-foreground">A saved credit card is required for split payments to enable automatic second charge.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {currentStep < 5 ? (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                className="bg-primary hover:bg-primary/90"
                disabled={paymentOption === "split" && !hasSavedCard}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Create Case & Pay
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
