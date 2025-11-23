import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface ShadeSelectorProps {
  value: string;
  onChange: (shade: string, stumpNote?: string) => void;
  stumpNote?: string;
}

const vitaClassical = [
  "A1", "A2", "A3", "A3.5", "A4",
  "B1", "B2", "B3", "B4",
  "C1", "C2", "C3", "C4",
  "D2", "D3", "D4"
];

const vita3DMaster = [
  "0M1", "0M2", "0M3",
  "1M1", "1M2", "1M3",
  "2L1.5", "2L2.5", "2M1", "2M2", "2M3", "2R1.5", "2R2.5",
  "3L1.5", "3L2.5", "3M1", "3M2", "3M3", "3R1.5", "3R2.5",
  "4L1.5", "4L2.5", "4M1", "4M2", "4M3", "4R1.5", "4R2.5",
  "5M1", "5M2", "5M3"
];

const ShadeSelector = ({ value, onChange, stumpNote = "" }: ShadeSelectorProps) => {
  const [note, setNote] = useState(stumpNote);

  // Sync note state with prop changes
  useEffect(() => {
    setNote(stumpNote);
  }, [stumpNote]);

  // Single combined VITA shade list (Classical + 3D-Master)
  const shadeList = [...vitaClassical, ...vita3DMaster];

  const handleShadeSelect = (shade: string) => {
    onChange(shade, note);
  };

  const handleNoteChange = (newNote: string) => {
    setNote(newNote);
    onChange(value, newNote);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>Porcelain Shade (VITA) *</Label>
        <p className="text-xs text-muted-foreground">
          Single VITA shade list (Classical + 3D-Master)
        </p>
      </div>

      <div className="space-y-2">
        <Label>Select Shade *</Label>
        <Select value={value} onValueChange={handleShadeSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a shade" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {shadeList.map((shade) => (
              <SelectItem key={shade} value={shade}>
                {shade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stump-note">
          Stump Shade / Characterization <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="stump-note"
          value={note}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="e.g., Stump shade: B3, Add characterization at gingival third..."
          rows={2}
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default ShadeSelector;
