import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const LabOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const [onboardingData, setOnboardingData] = useState({
    services: [] as string[],
    materials: {} as Record<string, number>,
    technologies: [] as string[],
    shippingLocal: true,
    shippingInternational: false,
    courierPartner: "",
    pickupAddress: "",
    pricing: {} as Record<string, { price: string; turnaround: string }>,
    staff: [] as Array<{ name: string; role: string; email: string }>,
    galleryImages: [] as File[],
    marketplaceVisible: true,
  });

  const services = [
    "Crowns/Bridges",
    "Veneers",
    "Implant Prosthetics",
    "PMMA / Temporaries",
    "Night Guards",
    "Clear Aligners",
    "Digital Design (CAD)",
    "Milling Services",
  ];

  const materials = [
    "Zirconia",
    "E-max",
    "PMMA",
    "Acrylic",
    "Composite",
    "Titanium Bars",
    "Resin (3D Printing)",
  ];

  const technologies = [
    "CAD/CAM",
    "3D Printing",
    "Milling Machines",
    "Layering Ovens",
    "Digital Scanners",
    "AI-Assisted Design",
  ];

  const restorationTypes = [
    { name: "Crown", defaultPrice: "900", defaultDays: "4-5", subTypes: ["Full Crown", "Inlay", "Onlay", "3/4 Crown"] },
    { name: "Veneer", defaultPrice: "1200", defaultDays: "5-6", subTypes: ["Porcelain Veneer", "Composite Veneer", "Lumineers"] },
    { name: "Implant Crown", defaultPrice: "1500", defaultDays: "6-7", subTypes: ["Screw-Retained", "Cement-Retained", "Custom Abutment"] },
    { name: "PMMA Try-In", defaultPrice: "400", defaultDays: "2-3", subTypes: ["Provisional Crown", "Provisional Bridge", "Diagnostic Wax-Up"] },
    { name: "Night Guard", defaultPrice: "600", defaultDays: "3-4", subTypes: ["Hard Splint", "Soft Splint", "Dual Laminate"] },
  ];

  const staffRoles = [
    "Lab Manager",
    "CAD Designer",
    "Ceramist",
    "Admin",
    "Quality Control",
    "Milling Technician",
    "3D Printing Operator",
    "Courier Manager",
  ];

  const handleNext = () => {
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

  const handleFinish = () => {
    toast.success("🎉 Setup Complete! Welcome to Dentaleem");
    setTimeout(() => {
      navigate("/lab/dashboard");
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
              <h1 className="text-3xl font-bold text-foreground">Lab Onboarding</h1>
              <p className="text-muted-foreground mt-1">Complete your operational setup</p>
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
        {/* Section A: Services Offered */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Select all services your lab can provide
              </p>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <label
                    key={service}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      onboardingData.services.includes(service)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-accent/5"
                    }`}
                  >
                    <Checkbox
                      checked={onboardingData.services.includes(service)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setOnboardingData({
                            ...onboardingData,
                            services: [...onboardingData.services, service],
                          });
                        } else {
                          setOnboardingData({
                            ...onboardingData,
                            services: onboardingData.services.filter((s) => s !== service),
                          });
                        }
                      }}
                      className="mr-3"
                    />
                    <span className="text-sm text-foreground font-medium">{service}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section B: Materials & Turnaround */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Materials & Average Turnaround</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Select materials and set average turnaround time (in days)
              </p>
              {materials.map((material) => (
                <div key={material} className="space-y-3 p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">{material}</Label>
                    <Checkbox
                      checked={!!onboardingData.materials[material]}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setOnboardingData({
                            ...onboardingData,
                            materials: { ...onboardingData.materials, [material]: 7 },
                          });
                        } else {
                          const { [material]: _, ...rest } = onboardingData.materials;
                          setOnboardingData({ ...onboardingData, materials: rest });
                        }
                      }}
                    />
                  </div>
                  {onboardingData.materials[material] !== undefined && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Full Arch Turnaround</span>
                          <span className="font-medium text-foreground">
                            {onboardingData.materials[material]} days
                          </span>
                        </div>
                        <Slider
                          value={[onboardingData.materials[material]]}
                          onValueChange={([value]) =>
                            setOnboardingData({
                              ...onboardingData,
                              materials: { ...onboardingData.materials, [material]: value },
                            })
                          }
                          min={2}
                          max={21}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm bg-muted/50 rounded-md px-3 py-2">
                        <span className="text-muted-foreground">Est. Single Unit</span>
                        <span className="font-medium text-primary">
                          ~{Math.max(1, Math.round(onboardingData.materials[material] * 0.4))} days
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Section C: Technologies */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Technologies & Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Select technologies and equipment your lab uses
              </p>
              <div className="grid grid-cols-2 gap-3">
                {technologies.map((tech) => (
                  <label
                    key={tech}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      onboardingData.technologies.includes(tech)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-accent/5"
                    }`}
                  >
                    <Checkbox
                      checked={onboardingData.technologies.includes(tech)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setOnboardingData({
                            ...onboardingData,
                            technologies: [...onboardingData.technologies, tech],
                          });
                        } else {
                          setOnboardingData({
                            ...onboardingData,
                            technologies: onboardingData.technologies.filter((t) => t !== tech),
                          });
                        }
                      }}
                      className="mr-3"
                    />
                    <span className="text-sm text-foreground font-medium">{tech}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section D: Shipping & Coverage */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Delivery Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base">Delivery Options</Label>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Checkbox
                    checked={onboardingData.shippingLocal}
                    onCheckedChange={(checked) =>
                      setOnboardingData({ ...onboardingData, shippingLocal: !!checked })
                    }
                  />
                  <div>
                    <p className="font-medium text-foreground">Local Shipping</p>
                    <p className="text-xs text-muted-foreground">Deliver to local clinics</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Checkbox
                    checked={onboardingData.shippingInternational}
                    onCheckedChange={(checked) =>
                      setOnboardingData({ ...onboardingData, shippingInternational: !!checked })
                    }
                  />
                  <div>
                    <p className="font-medium text-foreground">International Shipping</p>
                    <p className="text-xs text-muted-foreground">Deliver to international clinics</p>
                  </div>
                </div>
              </div>

              <div>
                <Label>Preferred Courier Partner (Optional)</Label>
                <Input
                  value={onboardingData.courierPartner}
                  onChange={(e) =>
                    setOnboardingData({ ...onboardingData, courierPartner: e.target.value })
                  }
                  placeholder="e.g., DHL, FedEx, Aramex"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Pickup Address</Label>
                <Textarea
                  value={onboardingData.pickupAddress}
                  onChange={(e) =>
                    setOnboardingData({ ...onboardingData, pickupAddress: e.target.value })
                  }
                  placeholder="Enter your lab's pickup address"
                  className="mt-2 min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section E: Pricing Table */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Turnaround</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Set baseline pricing per restoration type
              </p>
              {restorationTypes.map((resto) => (
                <div key={resto.name} className="p-4 rounded-lg border space-y-3">
                  <div className="grid grid-cols-3 gap-4 items-end">
                    <div>
                      <Label className="text-xs">Restoration Type</Label>
                      <Input
                        defaultValue={resto.name}
                        className="mt-1 font-medium"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Turnaround (days)</Label>
                      <Input
                        defaultValue={resto.defaultDays}
                        placeholder="4-5"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Price (EGP)</Label>
                      <Input
                        defaultValue={resto.defaultPrice}
                        placeholder="900"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Sub-Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select sub-type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {resto.subTypes.map((sub) => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Section F: Staff & Permissions */}
        {currentStep === 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Staff & Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add team members (you can add more later)
              </p>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="grid grid-cols-3 gap-3 p-4 rounded-lg border">
                    <Input placeholder="Staff Name" />
                    <Input placeholder="Role (Designer, QC...)" />
                    <Input placeholder="Email" type="email" />
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                + Add More Staff
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Section G: Marketplace Visibility */}
        {currentStep === 7 && (
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Checkbox
                  checked={onboardingData.marketplaceVisible}
                  onCheckedChange={(checked) =>
                    setOnboardingData({ ...onboardingData, marketplaceVisible: !!checked })
                  }
                />
                <div>
                  <p className="font-medium text-foreground">Make Lab Visible in Marketplace</p>
                  <p className="text-xs text-muted-foreground">
                    Dentists will be able to find and start cases with your lab
                  </p>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Setup Complete!</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Your lab is now ready to accept cases</li>
                      <li>• You can manage everything from your dashboard</li>
                      <li>• Update your profile and pricing anytime</li>
                      <li>• Start receiving cases from dentists immediately</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground mb-2">
                  🎓 Quick Tips for Success
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Upload high-quality photos of your work to your gallery</li>
                  <li>• Keep turnaround times realistic and accurate</li>
                  <li>• Respond to dentist inquiries within 24 hours</li>
                  <li>• Upload QC photos for every completed case</li>
                </ul>
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
            <Button onClick={handleFinish}>
              Finish Setup
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabOnboarding;
