import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const LabRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Step 1 - Basic Info
    labName: "",
    country: "",
    city: "",
    email: "",
    phone: "",
    labType: [] as string[],
    
    // Step 2 - Verification Docs
    tradeLicense: null as File | null,
    ownerID: null as File | null,
    operatingLicense: null as File | null,
    certifications: [] as File[],
    
    // Step 3 - Owner Account
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    password: "",
    confirmPassword: "",
    
    // Step 4 - Final Review
    agreedToTerms: false,
  });

  const labTypes = [
    "Full Service",
    "Fixed Prosthetics",
    "Removable",
    "Design Center",
    "Ortho / Clear Aligners"
  ];

  const handleNext = () => {
    // Validation logic here
    if (currentStep === 1) {
      if (!formData.labName || !formData.email || !formData.phone) {
        toast.error("Please fill all required fields");
        return;
      }
    }
    if (currentStep === 3) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    toast.success("Registration submitted! Verification pending.");
    setTimeout(() => {
      navigate("/lab/onboarding");
    }, 1500);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Lab Registration</h1>
              <p className="text-muted-foreground mt-1">Join Dentaleem Marketplace</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Lab Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="required">Lab Name</Label>
                <Input
                  value={formData.labName}
                  onChange={(e) => setFormData({ ...formData, labName: e.target.value })}
                  placeholder="Precision Dental Lab"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="required">Country</Label>
                  <Input
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Egypt"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="required">City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Cairo"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="required">Contact Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="info@precisionlab.com"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="required">Contact Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+20 123 456 7890"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Lab Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {labTypes.map((type) => (
                    <label
                      key={type}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.labType.includes(type)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-accent/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.labType.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              labType: [...formData.labType, type],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              labType: formData.labType.filter((t) => t !== type),
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-foreground">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label>Lab Logo (Optional)</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload lab logo</p>
                  <p className="text-xs text-muted-foreground mt-1">Recommended: 400x400px</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Business Verification */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Business Verification Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  Upload the following documents for verification. Your application will be reviewed by Dentaleem admin team.
                </p>
              </div>

              <div>
                <Label className="required">Trade License</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload trade license</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG</p>
                </div>
              </div>

              <div>
                <Label className="required">Owner ID</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload owner ID document</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG</p>
                </div>
              </div>

              <div>
                <Label className="required">Lab Operating License</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload operating license</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG</p>
                </div>
              </div>

              <div>
                <Label>Quality Certifications (ISO, DAMAS, etc.) - Optional</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload certifications</p>
                  <p className="text-xs text-muted-foreground mt-1">Multiple files accepted</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 font-medium">
                  📋 Verification Timeline
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Our team typically reviews applications within 2-3 business days. You'll receive an email notification once verified.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Owner/Manager Account */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Owner / Manager Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="required">Full Name</Label>
                <Input
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="Dr. Mohamed Ali"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="required">Email</Label>
                  <Input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                    placeholder="mohamed@precisionlab.com"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="required">Phone</Label>
                  <Input
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    placeholder="+20 123 456 7890"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="required">Password</Label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="required">Confirm Password</Label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  This account will have owner-level access to your lab dashboard and can manage all settings, staff, and operations.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Final Review */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="font-semibold text-foreground mb-2">Lab Information</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">Name: <span className="text-foreground font-medium">{formData.labName}</span></p>
                    <p className="text-muted-foreground">Location: <span className="text-foreground font-medium">{formData.city}, {formData.country}</span></p>
                    <p className="text-muted-foreground">Email: <span className="text-foreground font-medium">{formData.email}</span></p>
                    <p className="text-muted-foreground">Phone: <span className="text-foreground font-medium">{formData.phone}</span></p>
                    <p className="text-muted-foreground">Lab Type: <span className="text-foreground font-medium">{formData.labType.join(", ") || "Not specified"}</span></p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="font-semibold text-foreground mb-2">Owner Account</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">Name: <span className="text-foreground font-medium">{formData.ownerName}</span></p>
                    <p className="text-muted-foreground">Email: <span className="text-foreground font-medium">{formData.ownerEmail}</span></p>
                    <p className="text-muted-foreground">Phone: <span className="text-foreground font-medium">{formData.ownerPhone}</span></p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm text-foreground">
                    I agree to Dentaleem's Terms of Service and Privacy Policy
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    By submitting this application, you agree to our terms and conditions.
                  </p>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">What happens next?</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Your application will be reviewed by our team</li>
                      <li>• You'll receive an email notification (2-3 business days)</li>
                      <li>• Once verified, you'll gain full access to the lab portal</li>
                      <li>• Start receiving cases from dentists immediately</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.agreedToTerms}
            >
              Submit Application
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabRegistration;
