import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCase = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: "Case Info", subtitle: "Patient & restoration details" },
    { number: 2, title: "Upload Files", subtitle: "STL, images, X-rays" },
    { number: 3, title: "Material", subtitle: "Select restoration type" },
    { number: 4, title: "Select Lab", subtitle: "Choose from marketplace" },
    { number: 5, title: "Payment", subtitle: "Confirm & pay" },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success("Case created successfully!");
    navigate("/dashboard");
  };

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

      <div className="container mx-auto px-6 py-8 max-w-4xl">
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
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Case Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patientInitials">Patient Initials *</Label>
                  <Input id="patientInitials" placeholder="e.g., A.M." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caseId">Internal Case ID</Label>
                  <Input id="caseId" placeholder="Optional reference" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="restorationType">Restoration Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select restoration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crown">Crown</SelectItem>
                    <SelectItem value="bridge">Bridge</SelectItem>
                    <SelectItem value="veneer">Veneer</SelectItem>
                    <SelectItem value="inlay">Inlay/Onlay</SelectItem>
                    <SelectItem value="implant">Implant Crown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teethNumbers">Teeth Numbers *</Label>
                <Input id="teethNumbers" placeholder="e.g., 14, 15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Special instructions or considerations" rows={4} />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Upload Files</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-medium text-foreground mb-2">Upload STL Files</p>
                  <p className="text-xs text-muted-foreground mb-4">Drag & drop or click to browse</p>
                  <Button variant="outline" size="sm">Browse Files</Button>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-medium text-foreground mb-2">Upload Images/X-rays</p>
                  <p className="text-xs text-muted-foreground mb-4">JPG, PNG, DICOM formats</p>
                  <Button variant="outline" size="sm">Browse Files</Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Select Material</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Zirconia", desc: "High strength, aesthetic", popular: true },
                  { name: "E-max", desc: "Maximum aesthetics", popular: true },
                  { name: "PMMA", desc: "Temporary restorations", popular: false },
                  { name: "Metal Ceramic", desc: "Traditional PFM", popular: false },
                ].map((material) => (
                  <Card 
                    key={material.name}
                    className="p-6 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{material.name}</h3>
                        <p className="text-sm text-muted-foreground">{material.desc}</p>
                      </div>
                      {material.popular && (
                        <div className="px-2 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary">
                          Popular
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="shade">Shade Selection *</Label>
                <Select>
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
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Select Laboratory</h2>
              <div className="space-y-4">
                {[
                  { name: "Precision Dental Lab", rating: 4.9, turnaround: "10-12 days", price: "$350", verified: true },
                  { name: "Elite Dental Solutions", rating: 4.8, turnaround: "8-10 days", price: "$380", verified: true },
                  { name: "Pro Lab Technologies", rating: 4.7, turnaround: "12-14 days", price: "$320", verified: true },
                ].map((lab) => (
                  <Card 
                    key={lab.name}
                    className="p-6 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-primary"></div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{lab.name}</h3>
                            {lab.verified && (
                              <CheckCircle2 className="h-4 w-4 text-secondary" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>⭐ {lab.rating}</span>
                            <span>📅 {lab.turnaround}</span>
                            <span className="font-semibold text-foreground">{lab.price}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">Select</Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Button variant="ghost" className="w-full">View Full Marketplace</Button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Payment & Confirmation</h2>
              <Card className="p-6 bg-muted/30">
                <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient</span>
                    <span className="font-medium text-foreground">A.M.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Restoration</span>
                    <span className="font-medium text-foreground">Crown (Zirconia)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Laboratory</span>
                    <span className="font-medium text-foreground">Precision Dental Lab</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Turnaround</span>
                    <span className="font-medium text-foreground">10-12 days</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-base">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-primary">$350</span>
                  </div>
                </div>
              </Card>
              <div className="space-y-4">
                <Label>Payment Option</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 cursor-pointer border-primary bg-primary/5">
                    <p className="font-medium text-foreground">Full Payment</p>
                    <p className="text-sm text-muted-foreground">Pay 100% now</p>
                  </Card>
                  <Card className="p-4 cursor-pointer hover:border-primary/50">
                    <p className="font-medium text-foreground">Split Payment</p>
                    <p className="text-sm text-muted-foreground">50% now, 50% on delivery</p>
                  </Card>
                </div>
              </div>
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
              <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Create Case & Pay
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateCase;
