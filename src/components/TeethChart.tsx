import { useState } from "react";

interface TeethChartProps {
  selectedTeeth: number[];
  onTeethChange: (teeth: number[]) => void;
}

const TeethChart = ({ selectedTeeth, onTeethChange }: TeethChartProps) => {
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const toggleTooth = (tooth: number) => {
    if (selectedTeeth.includes(tooth)) {
      onTeethChange(selectedTeeth.filter((t) => t !== tooth));
    } else {
      onTeethChange([...selectedTeeth, tooth]);
    }
  };

  const ToothButton = ({ number }: { number: number }) => (
    <button
      type="button"
      onClick={() => toggleTooth(number)}
      className={`w-10 h-12 rounded-lg border-2 text-xs font-medium transition-all ${
        selectedTeeth.includes(number)
          ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
          : "bg-card border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
      }`}
    >
      {number}
    </button>
  );

  return (
    <div className="space-y-6 p-6 bg-muted/30 rounded-lg">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Upper Arch</p>
        <div className="flex justify-center gap-1">
          {upperTeeth.map((tooth) => (
            <ToothButton key={tooth} number={tooth} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Lower Arch</p>
        <div className="flex justify-center gap-1">
          {lowerTeeth.map((tooth) => (
            <ToothButton key={tooth} number={tooth} />
          ))}
        </div>
      </div>
      {selectedTeeth.length > 0 && (
        <p className="text-sm text-center text-primary font-medium">
          Selected: {selectedTeeth.sort((a, b) => a - b).join(", ")}
        </p>
      )}
    </div>
  );
};

export default TeethChart;
