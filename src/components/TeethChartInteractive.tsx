import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Baby } from "lucide-react";

interface TeethChartInteractiveProps {
  selectedTeeth: string[];
  onTeethChange: (teeth: string[]) => void;
  mode?: "adult" | "pediatric";
  onModeChange?: (mode: "adult" | "pediatric") => void;
}

// Adult Tooth mapping: FDI to Quadrant notation
const adultToothMapping: { [key: number]: string } = {
  // Upper Right (UR)
  18: "UR8", 17: "UR7", 16: "UR6", 15: "UR5", 14: "UR4", 13: "UR3", 12: "UR2", 11: "UR1",
  // Upper Left (UL)
  21: "UL1", 22: "UL2", 23: "UL3", 24: "UL4", 25: "UL5", 26: "UL6", 27: "UL7", 28: "UL8",
  // Lower Left (LL)
  31: "LL1", 32: "LL2", 33: "LL3", 34: "LL4", 35: "LL5", 36: "LL6", 37: "LL7", 38: "LL8",
  // Lower Right (LR)
  48: "LR8", 47: "LR7", 46: "LR6", 45: "LR5", 44: "LR4", 43: "LR3", 42: "LR2", 41: "LR1",
};

// Pediatric Tooth mapping: FDI to Quadrant notation
const pediatricToothMapping: { [key: number]: string } = {
  // Upper Right (UR)
  55: "UR5", 54: "UR4", 53: "UR3", 52: "UR2", 51: "UR1",
  // Upper Left (UL)
  61: "UL1", 62: "UL2", 63: "UL3", 64: "UL4", 65: "UL5",
  // Lower Left (LL)
  71: "LL1", 72: "LL2", 73: "LL3", 74: "LL4", 75: "LL5",
  // Lower Right (LR)
  85: "LR5", 84: "LR4", 83: "LR3", 82: "LR2", 81: "LR1",
};

const TeethChartInteractive = ({ 
  selectedTeeth, 
  onTeethChange, 
  mode = "adult",
  onModeChange 
}: TeethChartInteractiveProps) => {
  const [chartMode, setChartMode] = useState<"adult" | "pediatric">(mode);
  
  const toothMapping = chartMode === "adult" ? adultToothMapping : pediatricToothMapping;
  
  const upperTeeth = chartMode === "adult" 
    ? [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
    : [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
  
  const lowerTeeth = chartMode === "adult"
    ? [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]
    : [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

  const handleModeChange = (newMode: "adult" | "pediatric") => {
    setChartMode(newMode);
    onModeChange?.(newMode);
    // Clear selections when switching modes
    onTeethChange([]);
  };

  const toggleTooth = (fdiNumber: number) => {
    const alphaCode = toothMapping[fdiNumber];
    if (selectedTeeth.includes(alphaCode)) {
      onTeethChange(selectedTeeth.filter((t) => t !== alphaCode));
    } else {
      onTeethChange([...selectedTeeth, alphaCode]);
    }
  };

  const selectQuadrant = (quadrant: "UR" | "UL" | "LL" | "LR") => {
    const quadrantTeeth = Object.entries(toothMapping)
      .filter(([_, code]) => code.startsWith(quadrant))
      .map(([_, code]) => code);
    
    const allSelected = quadrantTeeth.every(t => selectedTeeth.includes(t));
    
    if (allSelected) {
      onTeethChange(selectedTeeth.filter(t => !t.startsWith(quadrant)));
    } else {
      const newSelection = [...new Set([...selectedTeeth, ...quadrantTeeth])];
      onTeethChange(newSelection);
    }
  };

  const clearSelection = () => {
    onTeethChange([]);
  };

  const ToothButton = ({ fdiNumber }: { fdiNumber: number }) => {
    const alphaCode = toothMapping[fdiNumber];
    const isSelected = selectedTeeth.includes(alphaCode);
    
    return (
      <button
        type="button"
        onClick={() => toggleTooth(fdiNumber)}
        className={`w-10 h-16 rounded-lg border-2 text-xs font-medium transition-all relative group flex flex-col items-center justify-center ${
          isSelected
            ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
            : "bg-card border-border text-foreground hover:border-primary/50 hover:bg-primary/5 hover:scale-105"
        }`}
        title={`${alphaCode} (FDI: ${fdiNumber})`}
      >
        <div className="flex flex-col items-center justify-center gap-0.5">
          <span className="text-[9px] opacity-50 font-normal">{fdiNumber}</span>
          <span className="font-bold text-sm">{alphaCode}</span>
        </div>
        {/* Tooth illustration */}
        <div className={`absolute bottom-1 w-3 h-4 rounded-sm transition-colors ${
          isSelected ? "bg-primary-foreground/20" : "bg-muted-foreground/10"
        }`}>
          <div className={`w-full h-2 rounded-t-sm ${
            isSelected ? "bg-primary-foreground/30" : "bg-muted-foreground/20"
          }`}></div>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border border-border/50">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={chartMode === "adult" ? "default" : "outline"}
            size="sm"
            onClick={() => handleModeChange("adult")}
            className="gap-2"
          >
            <User className="h-4 w-4" />
            Adult
          </Button>
          <Button
            type="button"
            variant={chartMode === "pediatric" ? "default" : "outline"}
            size="sm"
            onClick={() => handleModeChange("pediatric")}
            className="gap-2"
          >
            <Baby className="h-4 w-4" />
            Pediatric
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          Quadrant notation (UR/UL/LL/LR)
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => selectQuadrant("UR")}
        >
          Select UR
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => selectQuadrant("UL")}
        >
          Select UL
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => selectQuadrant("LL")}
        >
          Select LL
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => selectQuadrant("LR")}
        >
          Select LR
        </Button>
        {selectedTeeth.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSelection}
          >
            Clear All
          </Button>
        )}
      </div>
      
      {/* Upper Arch */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Upper Arch</p>
          <div className="text-xs text-muted-foreground">
            {chartMode === "adult" ? "Permanent" : "Primary"}
          </div>
        </div>
        <div className="flex justify-center gap-1 sm:gap-1.5 mb-2 overflow-x-auto pb-2">
          {upperTeeth.map((tooth) => (
            <ToothButton key={tooth} fdiNumber={tooth} />
          ))}
        </div>
        <div className="flex justify-center gap-1 text-[10px] text-muted-foreground">
          <span className={`text-center border-r border-muted-foreground/30 pr-2 ${chartMode === "adult" ? "w-[344px]" : "w-[215px]"}`}>
            Right
          </span>
          <span className={`text-center pl-2 ${chartMode === "adult" ? "w-[344px]" : "w-[215px]"}`}>
            Left
          </span>
        </div>
      </div>

      {/* Midline Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t-2 border-dashed border-muted-foreground/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gradient-to-br from-muted/30 to-muted/10 px-3 py-1 text-muted-foreground font-medium rounded-full">
            Midline
          </span>
        </div>
      </div>

      {/* Lower Arch */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Lower Arch</p>
          <div className="text-xs text-muted-foreground">
            {chartMode === "adult" ? "Permanent" : "Primary"}
          </div>
        </div>
        <div className="flex justify-center gap-1 text-[10px] text-muted-foreground">
          <span className={`text-center border-r border-muted-foreground/30 pr-2 ${chartMode === "adult" ? "w-[344px]" : "w-[215px]"}`}>
            Right
          </span>
          <span className={`text-center pl-2 ${chartMode === "adult" ? "w-[344px]" : "w-[215px]"}`}>
            Left
          </span>
        </div>
        <div className="flex justify-center gap-1 sm:gap-1.5 mt-2 overflow-x-auto pb-2">
          {lowerTeeth.map((tooth) => (
            <ToothButton key={tooth} fdiNumber={tooth} />
          ))}
        </div>
      </div>

      {/* Selected Teeth Display */}
      {selectedTeeth.length > 0 && (
        <div className="pt-4 border-t border-border bg-primary/5 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 rounded-b-xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-primary font-semibold">
              Selected: {selectedTeeth.length} {selectedTeeth.length === 1 ? "tooth" : "teeth"}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-xs"
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTeeth.sort().map((tooth) => (
              <button
                key={tooth}
                type="button"
                onClick={() => {
                  const fdiNumber = Object.entries(toothMapping).find(([_, code]) => code === tooth)?.[0];
                  if (fdiNumber) toggleTooth(parseInt(fdiNumber));
                }}
                className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {tooth}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeethChartInteractive;
