import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface FiltersProps {
  onApplyFilters: (filters: any) => void;
  onResetFilters: () => void;
}

const MarketplaceFilters = ({ onApplyFilters, onResetFilters }: FiltersProps) => {
  const [turnaround, setTurnaround] = useState<string[]>([]);
  const [pricing, setPricing] = useState<string[]>([]);
  const [certification, setCertification] = useState<string>("all");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [country, setCountry] = useState<string>("all");
  const [rating, setRating] = useState<number[]>([0]);
  const [delivery, setDelivery] = useState<string>("all");

  const specializationOptions = [
    "Crown", "Veneer", "Implant", "Bridge", 
    "Ortho Appliance", "Clear Aligners", "PMMA Try-Ins"
  ];

  const technologyOptions = [
    "CAD/CAM", "3D Printing", "Milling", 
    "Layered Ceramics", "Digital Wax-Up", "AI-Assisted Design"
  ];

  const handleApply = () => {
    onApplyFilters({
      turnaround,
      pricing,
      certification,
      specializations,
      technologies,
      country,
      rating: rating[0],
      delivery
    });
  };

  const handleReset = () => {
    setTurnaround([]);
    setPricing([]);
    setCertification("all");
    setSpecializations([]);
    setTechnologies([]);
    setCountry("all");
    setRating([0]);
    setDelivery("all");
    onResetFilters();
  };

  const toggleArrayValue = (arr: string[], value: string, setter: (arr: string[]) => void) => {
    if (arr.includes(value)) {
      setter(arr.filter(v => v !== value));
    } else {
      setter([...arr, value]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Clear All
        </Button>
      </div>

      {/* Delivery Speed / Turnaround */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
          <Label className="font-medium text-foreground cursor-pointer">Delivery Speed</Label>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {["1-3 days", "4-7 days", "8-14 days", "15+ days"].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`turnaround-${option}`}
                checked={turnaround.includes(option)}
                onCheckedChange={() => toggleArrayValue(turnaround, option, setTurnaround)}
              />
              <Label htmlFor={`turnaround-${option}`} className="cursor-pointer text-sm">
                {option}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Pricing Tier */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
          <Label className="font-medium text-foreground cursor-pointer">Pricing Tier</Label>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {["Economy", "Standard", "Premium"].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`pricing-${option}`}
                checked={pricing.includes(option)}
                onCheckedChange={() => toggleArrayValue(pricing, option, setPricing)}
              />
              <Label htmlFor={`pricing-${option}`} className="cursor-pointer text-sm">
                {option}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Certification Level */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
          <Label className="font-medium text-foreground cursor-pointer">Certification</Label>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          <RadioGroup value={certification} onValueChange={setCertification}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="cert-all" />
              <Label htmlFor="cert-all" className="cursor-pointer text-sm">All Labs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gold" id="cert-gold" />
              <Label htmlFor="cert-gold" className="cursor-pointer text-sm flex items-center gap-2">
                🟡 Gold Certified
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="cert-standard" />
              <Label htmlFor="cert-standard" className="cursor-pointer text-sm flex items-center gap-2">
                🟢 Standard Certified
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unverified" id="cert-unverified" />
              <Label htmlFor="cert-unverified" className="cursor-pointer text-sm flex items-center gap-2">
                ⚪ Unverified
              </Label>
            </div>
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Specialization */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
          <Label className="font-medium text-foreground cursor-pointer">Specialization</Label>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="flex flex-wrap gap-2">
            {specializationOptions.map((spec) => (
              <Badge
                key={spec}
                variant={specializations.includes(spec) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleArrayValue(specializations, spec, setSpecializations)}
              >
                {spec}
                {specializations.includes(spec) && <X className="h-3 w-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Technology Used */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
          <Label className="font-medium text-foreground cursor-pointer">Technology</Label>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="flex flex-wrap gap-2">
            {technologyOptions.map((tech) => (
              <Badge
                key={tech}
                variant={technologies.includes(tech) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleArrayValue(technologies, tech, setTechnologies)}
              >
                {tech}
                {technologies.includes(tech) && <X className="h-3 w-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Country / Region */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
          <Label className="font-medium text-foreground cursor-pointer">Country / Region</Label>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="egypt">Egypt</SelectItem>
              <SelectItem value="saudi">Saudi Arabia</SelectItem>
              <SelectItem value="uae">UAE</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      {/* Rating */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
          <Label className="font-medium text-foreground cursor-pointer">Minimum Rating</Label>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0★</span>
            <span className="font-medium text-foreground">{rating[0]}★ & up</span>
            <span>5★</span>
          </div>
          <Slider
            value={rating}
            onValueChange={setRating}
            max={5}
            step={0.5}
            className="w-full"
          />
        </CollapsibleContent>
      </Collapsible>

      {/* Delivery Option */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
          <Label className="font-medium text-foreground cursor-pointer">Delivery Option</Label>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          <RadioGroup value={delivery} onValueChange={setDelivery}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="delivery-all" />
              <Label htmlFor="delivery-all" className="cursor-pointer text-sm">All Options</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="local" id="delivery-local" />
              <Label htmlFor="delivery-local" className="cursor-pointer text-sm">Local Courier</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="international" id="delivery-international" />
              <Label htmlFor="delivery-international" className="cursor-pointer text-sm">International Shipping</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="delivery-both" />
              <Label htmlFor="delivery-both" className="cursor-pointer text-sm">Both</Label>
            </div>
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Action Buttons */}
      <div className="pt-6 space-y-3 border-t">
        <Button onClick={handleApply} className="w-full bg-primary hover:bg-primary/90">
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceFilters;