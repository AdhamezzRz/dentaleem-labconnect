import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, X } from "lucide-react";

const specialtiesList = [
  "Prosthodontics",
  "Orthodontics",
  "Endodontics",
  "Implantology",
  "Cosmetic Dentistry",
  "Oral Surgery",
  "Pediatric Dentistry",
  "Periodontics",
];

const materialsList = [
  "Zirconia",
  "Emax",
  "PMMA",
  "Composite",
  "Acrylic",
  "Metal-Ceramic",
  "Hybrid",
  "3D Printed Resin",
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase
          .from("profiles")
          .update({
            specialty: selectedSpecialties.join(", "),
            preferred_materials: selectedMaterials,
          })
          .eq("id", user.id);

        toast({
          title: "Profile Complete!",
          description: "Your account is ready. Redirecting to dashboard...",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground">
            Tell us more about your practice
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex items-center ${
                s < 3 ? "flex-1" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1 - Specialties */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Select Your Specialties
            </h2>
            <p className="text-sm text-muted-foreground">Choose all that apply</p>
            
            <div className="grid grid-cols-2 gap-3">
              {specialtiesList.map((specialty) => (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => toggleSpecialty(specialty)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedSpecialties.includes(specialty)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{specialty}</span>
                    {selectedSpecialties.includes(specialty) && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedSpecialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSpecialties.map((specialty) => (
                  <div key={specialty} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-2">
                    {specialty}
                    <button onClick={() => toggleSpecialty(specialty)} className="hover:bg-primary/20 rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={selectedSpecialties.length === 0}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2 - Materials */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Preferred Materials
            </h2>
            <p className="text-sm text-muted-foreground">Select materials you commonly work with</p>
            
            <div className="grid grid-cols-2 gap-3">
              {materialsList.map((material) => (
                <button
                  key={material}
                  type="button"
                  onClick={() => toggleMaterial(material)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedMaterials.includes(material)
                      ? "border-secondary bg-secondary/5"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{material}</span>
                    {selectedMaterials.includes(material) && (
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedMaterials.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedMaterials.map((material) => (
                  <div key={material} className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-sm flex items-center gap-2">
                    {material}
                    <button onClick={() => toggleMaterial(material)} className="hover:bg-secondary/20 rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={selectedMaterials.length === 0}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 - Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                You're All Set!
              </h2>
              <p className="text-muted-foreground mb-8">
                Your profile is complete. Start creating cases now.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleComplete}
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Completing..." : "Go to Dashboard"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Onboarding;
