import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManualPageCountProps {
  pageCount: number;
  onPageCountChange: (count: number) => void;
}

export const ManualPageCount = ({ pageCount, onPageCountChange }: ManualPageCountProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string to clear input
    if (value === '') {
      onPageCountChange(0);
      return;
    }
    // Convert to number and ensure it's positive
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      onPageCountChange(numValue);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="manual-pages" className="text-base font-medium">
        Number of pages in your document to be printed
      </Label>
      <Input
        id="manual-pages"
        type="number"
        min="0"
        value={pageCount || ''}
        onChange={handleInputChange}
        className="w-full text-lg py-2 px-3"
        placeholder="Enter number of pages"
      />
      <p className="text-sm text-muted-foreground">
        Please enter the total number of pages in your document
      </p>
    </div>
  );
};