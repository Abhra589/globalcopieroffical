import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface CopiesInputProps {
  copies: number;
  setCopies: (copies: number) => void;
}

export const CopiesInput = ({ copies, setCopies }: CopiesInputProps) => {
  const incrementCopies = () => setCopies(copies + 1);
  const decrementCopies = () => setCopies(Math.max(1, copies - 1));

  return (
    <div className="space-y-2">
      <Label htmlFor="copies">Number of Copies</Label>
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={decrementCopies}
          className="h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          id="copies"
          type="number"
          min="1"
          value={copies}
          onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 text-center"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={incrementCopies}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};