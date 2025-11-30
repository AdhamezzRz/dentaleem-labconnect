import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Building2, Phone, Globe, LogOut } from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile(data);
          setFullName(data.full_name || "");
          setClinicName(data.clinic_name || "");
          setPhone(data.phone || "");
          setCountry(data.country || "");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: fullName,
            clinic_name: clinicName,
            phone,
            country,
          })
          .eq("id", user.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
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
            <span className="text-xl font-bold text-foreground">
              DENTALEEM
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/settings"
              className="text-sm font-medium text-foreground"
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Profile Information
          </h2>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4" />
                  Clinic Name
                </label>
                <Input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4" />
                  Country
                </label>
                <Input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Account Status
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-foreground">
                {profile?.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Verification Status</span>
              <span
                className={`font-medium ${
                  profile?.is_verified ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {profile?.is_verified ? "Verified" : "Pending"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium text-foreground">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
