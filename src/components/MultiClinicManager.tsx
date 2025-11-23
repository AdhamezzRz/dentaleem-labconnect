import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, X, MapPin } from "lucide-react";
import AddressPicker from "@/components/AddressPicker";
import { EmptyState } from "@/components/EmptyState";

export interface Clinic {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  lat?: number;
  lng?: number;
  phone: string;
  isDefault: boolean;
}

interface MultiClinicManagerProps {
  clinics: Clinic[];
  onChange: (clinics: Clinic[]) => void;
}

const MultiClinicManager = ({ clinics, onChange }: MultiClinicManagerProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addClinic = () => {
    const newClinic: Clinic = {
      id: Date.now().toString(),
      name: "",
      address: "",
      city: "",
      country: "",
      phone: "",
      isDefault: clinics.length === 0, // First clinic is default
    };
    onChange([...clinics, newClinic]);
    setEditingId(newClinic.id);
  };

  const removeClinic = (id: string) => {
    const filtered = clinics.filter(c => c.id !== id);
    // If we removed the default, set the first remaining as default
    if (filtered.length > 0 && !filtered.some(c => c.isDefault)) {
      filtered[0].isDefault = true;
    }
    onChange(filtered);
  };

  const updateClinic = (id: string, field: keyof Clinic, value: any) => {
    onChange(clinics.map(c => {
      if (c.id === id) {
        // If setting this as default, unset all others
        if (field === "isDefault" && value === true) {
          onChange(clinics.map(clinic => ({
            ...clinic,
            isDefault: clinic.id === id
          })));
          return c;
        }
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const handleAddressSelect = (id: string, addressData: any) => {
    onChange(clinics.map(c => {
      if (c.id === id) {
        return {
          ...c,
          address: addressData.street,
          city: addressData.city,
          country: addressData.country,
          lat: addressData.lat,
          lng: addressData.lng,
        };
      }
      return c;
    }));
  };

  if (clinics.length === 0) {
    return (
      <div className="space-y-4">
        <Label>Clinics *</Label>
        <Card className="border-2 border-dashed border-border">
          <EmptyState
            icon={MapPin}
            title="No Clinics Added"
            description="Add all locations you practice in; set your default pickup/delivery address."
            action={{
              label: "Add Your First Clinic",
              onClick: addClinic
            }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label>Clinics *</Label>
          <p className="text-xs text-muted-foreground mt-1">
            Add all locations you practice in; set your default pickup/delivery address.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addClinic} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Clinic
        </Button>
      </div>

      <div className="space-y-4">
        {clinics.map((clinic) => (
          <Card key={clinic.id} className="p-4 border-2">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">
                    {clinic.name || "New Clinic"}
                  </h4>
                  {clinic.isDefault && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      Default
                    </span>
                  )}
                </div>
                {clinics.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeClinic(clinic.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {(editingId === clinic.id || !clinic.name) ? (
                <div className="space-y-3">
                  <div>
                    <Label>Clinic Name *</Label>
                    <Input
                      value={clinic.name}
                      onChange={(e) => updateClinic(clinic.id, "name", e.target.value)}
                      placeholder="e.g., Downtown Dental Clinic"
                      required
                    />
                  </div>

                  <div>
                    <Label>Address (Map Picker) *</Label>
                    <AddressPicker
                      onAddressSelect={(addr) => handleAddressSelect(clinic.id, addr)}
                    />
                    {clinic.address && (
                      <p className="text-xs text-secondary mt-1">
                        ✓ {clinic.address}, {clinic.city}, {clinic.country}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Primary Phone</Label>
                    <Input
                      type="tel"
                      value={clinic.phone}
                      onChange={(e) => updateClinic(clinic.id, "phone", e.target.value)}
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <Label className="font-medium">Set as Default</Label>
                      <p className="text-xs text-muted-foreground">
                        Use for pickup/delivery by default
                      </p>
                    </div>
                    <Switch
                      checked={clinic.isDefault}
                      onCheckedChange={(checked) => updateClinic(clinic.id, "isDefault", checked)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(null)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-foreground">{clinic.address}</p>
                      <p className="text-muted-foreground">{clinic.city}, {clinic.country}</p>
                    </div>
                  </div>
                  {clinic.phone && (
                    <p className="text-muted-foreground">📞 {clinic.phone}</p>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(clinic.id)}
                    className="mt-2"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MultiClinicManager;
