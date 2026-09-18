import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AddressPicker from "@/components/AddressPicker";
import MultiClinicManager, { Clinic } from "@/components/MultiClinicManager";

const Auth = () => {
  const [mode, setMode] = useState<"choice" | "dentist" | "clinic" | "login">("choice");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licensePhoto, setLicensePhoto] = useState<File | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicLicenseNumber, setClinicLicenseNumber] = useState("");
  const [clinicLicensePhoto, setClinicLicensePhoto] = useState<File | null>(null);
  const [ownerLicensePhoto, setOwnerLicensePhoto] = useState<File | null>(null);
  const [ownerBirthDate, setOwnerBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [chairCount, setChairCount] = useState("");
  const [address, setAddress] = useState("");
  const [addressData, setAddressData] = useState<any>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const specialties = ["Prosthodontics", "Orthodontics", "Endodontics", "Periodontics", "Oral Surgery", "Pediatric Dentistry", "General Dentistry"];
  const materialOptions = ["Emax", "Zirconia", "PMMA", "Composite", "Gold", "Porcelain"];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Success!", description: "Logged in successfully" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDentistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!licenseNumber || !licensePhoto || !birthDate) {
      toast({ title: "Error", description: "License number, photo, and birth date are required for verification.", variant: "destructive" });
      return;
    }

    if (clinics.length === 0) {
      toast({ title: "Error", description: "Please add at least one clinic.", variant: "destructive" });
      return;
    }

    const hasIncompleteClinic = clinics.some(c => !c.name || !c.address);
    if (hasIncompleteClinic) {
      toast({ title: "Error", description: "Please complete all clinic details.", variant: "destructive" });
      return;
    }

    const hasDefault = clinics.some(c => c.isDefault);
    if (!hasDefault) {
      toast({ title: "Error", description: "Please set one clinic as default.", variant: "destructive" });
      return;
    }
    
    if (!agreeTerms) {
      toast({ title: "Error", description: "Please agree to terms", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { 
          emailRedirectTo: `${window.location.origin}/`, 
          data: { full_name: fullName, clinic_name: clinicName, phone, birth_date: birthDate, license_number: licenseNumber } 
        }
      });
      if (error) throw error;
      if (data.user) {
        const defaultClinic = clinics.find(c => c.isDefault);
        await supabase.from("profiles").insert({ 
          id: data.user.id, 
          email, 
          full_name: fullName, 
          clinic_name: defaultClinic?.name || clinicName, 
          phone, 
          specialty: specialty.join(", "), 
          preferred_materials: materials, 
          license_url: licenseNumber, 
          country: defaultClinic?.country || country
        });
      }
      setVerificationPending(true);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleClinicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!clinicLicenseNumber || !clinicLicensePhoto || !ownerLicensePhoto || !ownerBirthDate) {
      toast({ title: "Error", description: "All clinic verification documents are required.", variant: "destructive" });
      return;
    }

    if (!addressData || !addressData.street) {
      toast({ title: "Error", description: "Please select your clinic address on the map.", variant: "destructive" });
      return;
    }
    
    if (!agreeTerms) {
      toast({ title: "Error", description: "Please agree to terms", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { 
          emailRedirectTo: `${window.location.origin}/`, 
          data: { 
            clinic_name: clinicName, 
            owner_name: fullName, 
            phone,
            owner_birth_date: ownerBirthDate,
            clinic_license_number: clinicLicenseNumber
          } 
        }
      });
      if (error) throw error;
      if (data.user) {
        await supabase.from("profiles").insert({ 
          id: data.user.id, 
          email, 
          full_name: fullName, 
          clinic_name: clinicName, 
          phone, 
          license_url: clinicLicenseNumber, 
          country 
        });
      }
      setVerificationPending(true);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (verificationPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 text-center">
          <Clock className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Verification Pending</h2>
          <p className="text-muted-foreground mb-6">Your account is pending verification. We'll notify you once approved.</p>
          <Button onClick={() => navigate("/")} className="w-full">Return to Home</Button>
        </Card>
      </div>
    );
  }

  if (mode === "choice") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <span className="text-2xl font-bold text-foreground">DENTALEEM</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Join Dentaleem</h1>
            <p className="text-muted-foreground">Choose your account type</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="p-8 cursor-pointer hover:shadow-lg transition-all hover:border-primary" onClick={() => setMode("dentist")}>
              <h2 className="text-2xl font-bold text-foreground mb-4">Join as Dentist</h2>
              <p className="text-muted-foreground mb-6">Create cases and connect with labs</p>
              <Button className="w-full">Continue as Dentist</Button>
            </Card>
            <Card className="p-8 cursor-pointer hover:shadow-lg transition-all hover:border-primary" onClick={() => setMode("clinic")}>
              <h2 className="text-2xl font-bold text-foreground mb-4">Register Your Clinic</h2>
              <p className="text-muted-foreground mb-6">Manage multiple dentists</p>
              <Button className="w-full">Continue as Clinic</Button>
            </Card>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Already have an account? <button onClick={() => setMode("login")} className="text-primary hover:underline font-medium">Log in</button></p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "login") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div><div className="w-2 h-2 rounded-full bg-secondary"></div><div className="w-2 h-2 rounded-full bg-primary"></div></div>
              <span className="text-2xl font-bold text-foreground">DENTALEEM</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Log in to your account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <Button type="submit" className="w-full" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Log In</Button>
          </form>
          <div className="text-center mt-6"><p className="text-sm text-muted-foreground">Don't have an account? <button onClick={() => setMode("choice")} className="text-primary hover:underline font-medium">Sign up</button></p></div>
        </Card>
      </div>
    );
  }

  if (mode === "dentist") {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-2xl">
          <button onClick={() => setMode("choice")} className="text-sm text-muted-foreground hover:text-foreground mb-6">← Back</button>
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Join as Dentist</h1>
            <p className="text-muted-foreground mb-6">Create your account</p>
            <form onSubmit={handleDentistSubmit} className="space-y-4">
              <div><Label>Full Name *</Label><Input value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div>
              <div><Label>License Number *</Label><Input value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required /></div>
              <div>
                <Label>License Photo * <span className="text-xs text-muted-foreground">(Upload a clear photo of your official dental license)</span></Label>
                <div className="mt-2">
                  <Input type="file" accept="image/*" onChange={(e) => setLicensePhoto(e.target.files?.[0] || null)} required className="cursor-pointer" />
                  {licensePhoto && <p className="text-xs text-secondary mt-1">✓ {licensePhoto.name}</p>}
                </div>
              </div>
              <div><Label>Birth Date *</Label><Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required /></div>
              
              <MultiClinicManager 
                clinics={clinics}
                onChange={setClinics}
              />

              <div><Label>Email *</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <div><Label>Phone</Label><Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              <div><Label>Password *</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
              <div className="flex items-center space-x-2">
                <Checkbox checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked === true)} />
                <label className="text-sm">I agree to Dentaleem Terms & Conditions</label>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Dentist Account
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  if (mode === "clinic") {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-2xl">
          <button onClick={() => setMode("choice")} className="text-sm text-muted-foreground hover:text-foreground mb-6">← Back</button>
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Register Your Clinic</h1>
            <p className="text-muted-foreground mb-6">Complete all fields for verification</p>
            <form onSubmit={handleClinicSubmit} className="space-y-4">
              <div><Label>Clinic Name *</Label><Input value={clinicName} onChange={(e) => setClinicName(e.target.value)} required /></div>
              <div><Label>Clinic License Number *</Label><Input value={clinicLicenseNumber} onChange={(e) => setClinicLicenseNumber(e.target.value)} required /></div>
              <div>
                <Label>Clinic License Upload *</Label>
                <Input type="file" accept="image/*,.pdf" onChange={(e) => setClinicLicensePhoto(e.target.files?.[0] || null)} required className="cursor-pointer mt-2" />
                {clinicLicensePhoto && <p className="text-xs text-secondary mt-1">✓ {clinicLicensePhoto.name}</p>}
              </div>
              <div><Label>Owner Dentist Name *</Label><Input value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div>
              <div>
                <Label>Owner Dentist License Photo *</Label>
                <Input type="file" accept="image/*,.pdf" onChange={(e) => setOwnerLicensePhoto(e.target.files?.[0] || null)} required className="cursor-pointer mt-2" />
                {ownerLicensePhoto && <p className="text-xs text-secondary mt-1">✓ {ownerLicensePhoto.name}</p>}
              </div>
              <div><Label>Owner Dentist Birth Date *</Label><Input type="date" value={ownerBirthDate} onChange={(e) => setOwnerBirthDate(e.target.value)} required /></div>
              <div><Label>Number of Chairs</Label>
                <Select onValueChange={setChairCount}>
                  <SelectTrigger><SelectValue placeholder="Select number" /></SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <AddressPicker 
                onAddressSelect={(addr) => {
                  setAddressData(addr);
                  setCity(addr.city);
                  setCountry(addr.country);
                  setAddress(addr.street);
                }} 
              />
              <div><Label>Contact Email *</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <div><Label>Contact Phone</Label><Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              <div><Label>Password *</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
              <div className="flex items-center space-x-2">
                <Checkbox checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked === true)} />
                <label className="text-sm">I agree to Dentaleem Terms & Conditions</label>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Clinic Account
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default Auth;
