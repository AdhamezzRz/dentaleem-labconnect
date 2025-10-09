import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState("");
  const [preferredMaterials, setPreferredMaterials] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const materials = preferredMaterials.split(",").map((m) => m.trim());
        
        await supabase
          .from("profiles")
          .update({
            specialty,
            preferred_materials: materials,
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
      <Card className="w-full max-w-2xl p-8">
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

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Specialty & Focus Areas
            </h2>
            <div>
              <label className="text-sm font-medium text-foreground">
                Primary Specialty
              </label>
              <Input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="e.g., Prosthodontics, General Dentistry"
                className="mt-1"
              />
            </div>
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={!specialty}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Preferred Materials
            </h2>
            <div>
              <label className="text-sm font-medium text-foreground">
                Materials You Work With
              </label>
              <Textarea
                value={preferredMaterials}
                onChange={(e) => setPreferredMaterials(e.target.value)}
                placeholder="e.g., Zirconia, E-max, PMMA (comma-separated)"
                className="mt-1"
                rows={4}
              />
            </div>
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
                disabled={!preferredMaterials}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
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
