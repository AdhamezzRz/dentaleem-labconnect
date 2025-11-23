import { useState } from "react";

interface TeethChartInteractiveProps {
  selectedTeeth: string[];
  onTeethChange: (teeth: string[]) => void;
}

// Tooth mapping: FDI to Quadrant notation
const toothMapping: { [key: number]: string } = {
  // Upper Right (UR)
  18: "UR8", 17: "UR7", 16: "UR6", 15: "UR5", 14: "UR4", 13: "UR3", 12: "UR2", 11: "UR1",
  // Upper Left (UL)
  21: "UL1", 22: "UL2", 23: "UL3", 24: "UL4", 25: "UL5", 26: "UL6", 27: "UL7", 28: "UL8",
  // Lower Left (LL)
  31: "LL1", 32: "LL2", 33: "LL3", 34: "LL4", 35: "LL5", 36: "LL6", 37: "LL7", 38: "LL8",
  // Lower Right (LR)
  48: "LR8", 47: "LR7", 46: "LR6", 45: "LR5", 44: "LR4", 43: "LR3", 42: "LR2", 41: "LR1",
};

const reverseMapping: { [key: string]: number } = {};
Object.entries(toothMapping).forEach(([fdi, alpha]) => {
  reverseMapping[alpha] = parseInt(fdi);
});

const TeethChartInteractive = ({ selectedTeeth, onTeethChange }: TeethChartInteractiveProps) => {
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const toggleTooth = (fdiNumber: number) => {
    const alphaCode = toothMapping[fdiNumber];
    if (selectedTeeth.includes(alphaCode)) {
      onTeethChange(selectedTeeth.filter((t) => t !== alphaCode));
    } else {
      onTeethChange([...selectedTeeth, alphaCode]);
    }
  };

  const ToothButton = ({ fdiNumber }: { fdiNumber: number }) => {
    const alphaCode = toothMapping[fdiNumber];
    const isSelected = selectedTeeth.includes(alphaCode);
    
    return (
      <button
        type="button"
        onClick={() => toggleTooth(fdiNumber)}
        className={`w-10 h-14 rounded-lg border-2 text-xs font-medium transition-all relative group ${
          isSelected
            ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
            : "bg-card border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
        }`}
        title={`Click to ${isSelected ? "deselect" : "select"} ${alphaCode}`}
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-[10px] opacity-60">{fdiNumber}</span>
          <span className="font-bold">{alphaCode}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-muted/30 rounded-lg">
      <div className="text-sm text-muted-foreground mb-3">
        Click teeth to select • Quadrant notation (UR/UL/LL/LR)
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Upper Arch</p>
        <div className="flex justify-center gap-1 mb-1">
          {upperTeeth.map((tooth) => (
            <ToothButton key={tooth} fdiNumber={tooth} />
          ))}
        </div>
        <div className="flex justify-center gap-1 text-[10px] text-muted-foreground">
          <span className="w-[344px] text-center border-r border-muted-foreground/30 pr-1">Right</span>
          <span className="w-[344px] text-center pl-1">Left</span>
        </div>
      </div>

      <div className="h-px bg-border my-4"></div>

      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Lower Arch</p>
        <div className="flex justify-center gap-1 mb-1">
          {lowerTeeth.map((tooth) => (
            <ToothButton key={tooth} fdiNumber={tooth} />
          ))}
        </div>
        <div className="flex justify-center gap-1 text-[10px] text-muted-foreground">
          <span className="w-[344px] text-center border-r border-muted-foreground/30 pr-1">Right</span>
          <span className="w-[344px] text-center pl-1">Left</span>
        </div>
      </div>

      {selectedTeeth.length > 0 && (
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-primary font-medium mb-2">
            Selected: {selectedTeeth.length} {selectedTeeth.length === 1 ? "tooth" : "teeth"}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedTeeth.sort().map((tooth) => (
              <div 
                key={tooth}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {tooth}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeethChartInteractive;
