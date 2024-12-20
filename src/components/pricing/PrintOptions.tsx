import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PrintOptionsProps {
  selectedGsm: "70" | "100";
  setSelectedGsm: (value: "70" | "100") => void;
  selectedType: "bw" | "color";
  setSelectedType: (value: "bw" | "color") => void;
  selectedSides: "single" | "double";
  setSelectedSides: (value: "single" | "double") => void;
}

export const PrintOptions = ({
  selectedGsm,
  setSelectedGsm,
  selectedType,
  setSelectedType,
  selectedSides,
  setSelectedSides,
}: PrintOptionsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Paper Weight</Label>
        <RadioGroup
          value={selectedGsm}
          onValueChange={(value: "70" | "100") => setSelectedGsm(value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="70" id="gsm-70" />
            <Label htmlFor="gsm-70">70 GSM</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100" id="gsm-100" />
            <Label htmlFor="gsm-100">100 GSM</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Print Type</Label>
        <RadioGroup
          value={selectedType}
          onValueChange={(value: "bw" | "color") => setSelectedType(value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bw" id="type-bw" />
            <Label htmlFor="type-bw">Black & White</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="color" id="type-color" />
            <Label htmlFor="type-color">Color</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Printing Sides</Label>
        <RadioGroup
          value={selectedSides}
          onValueChange={(value: "single" | "double") => setSelectedSides(value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single" id="sides-single" />
            <Label htmlFor="sides-single">Single Side</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="double" id="sides-double" />
            <Label htmlFor="sides-double">Both Sides</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};