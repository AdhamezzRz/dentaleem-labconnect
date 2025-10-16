import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

interface AddressPickerProps {
  onAddressSelect: (address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
    lat: number;
    lng: number;
  }) => void;
  initialAddress?: string;
}

const AddressPicker = ({ onAddressSelect, initialAddress }: AddressPickerProps) => {
  const [mapPosition, setMapPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMapPosition({ x, y });
    
    // Mock geocoding - in production this would be a real API call
    const mockLat = 25.2048 + (y - 50) * 0.01;
    const mockLng = 55.2708 + (x - 50) * 0.01;
    
    onAddressSelect({
      street,
      city: city || "Dubai",
      country: country || "UAE",
      postalCode: postalCode || "00000",
      lat: mockLat,
      lng: mockLng,
    });
  };

  const handleUseCurrentLocation = () => {
    // Mock current location - in production this would use navigator.geolocation
    setMapPosition({ x: 50, y: 50 });
    setCity("Dubai");
    setCountry("UAE");
    setStreet("Sheikh Zayed Road");
    setPostalCode("12345");
    
    onAddressSelect({
      street: "Sheikh Zayed Road",
      city: "Dubai",
      country: "UAE",
      postalCode: "12345",
      lat: 25.2048,
      lng: 55.2708,
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Pick an Address *</Label>
      <p className="text-sm text-muted-foreground">
        Your address helps us match you with nearby verified labs.
      </p>

      {/* Mock Map */}
      <Card 
        className="relative h-64 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden cursor-crosshair"
        onClick={handleMapClick}
      >
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="border border-muted-foreground/20"></div>
          ))}
        </div>

        {/* Mock map features */}
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-secondary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/4 h-1/4 bg-primary/10 rounded-full blur-xl"></div>

        {/* Location Pin */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 ease-out animate-fade-in"
          style={{ 
            left: `${mapPosition.x}%`, 
            top: `${mapPosition.y}%`,
          }}
        >
          <MapPin className="h-10 w-10 text-primary drop-shadow-lg" fill="currentColor" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary/20 rounded-full blur-sm"></div>
        </div>

        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 text-xs text-muted-foreground border border-border">
          Click to pin location
        </div>
      </Card>

      <Button 
        type="button"
        variant="outline" 
        className="w-full gap-2"
        onClick={handleUseCurrentLocation}
      >
        <Navigation className="h-4 w-4" />
        Use Current Location
      </Button>

      {/* Manual Address Input */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="street">Street Address</Label>
          <Input 
            id="street"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              onAddressSelect({
                street: e.target.value,
                city,
                country,
                postalCode,
                lat: 25.2048,
                lng: 55.2708,
              });
            }}
            placeholder="Enter street address"
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input 
            id="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              onAddressSelect({
                street,
                city: e.target.value,
                country,
                postalCode,
                lat: 25.2048,
                lng: 55.2708,
              });
            }}
            placeholder="Enter city"
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input 
            id="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              onAddressSelect({
                street,
                city,
                country: e.target.value,
                postalCode,
                lat: 25.2048,
                lng: 55.2708,
              });
            }}
            placeholder="Enter country"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input 
            id="postalCode"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
              onAddressSelect({
                street,
                city,
                country,
                postalCode: e.target.value,
                lat: 25.2048,
                lng: 55.2708,
              });
            }}
            placeholder="Enter postal code"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressPicker;
