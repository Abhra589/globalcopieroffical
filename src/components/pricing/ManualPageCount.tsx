import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManualPageCountProps {
  pageCount: number;
  onPageCountChange: (count: number) => void;
}

export const ManualPageCount = ({ pageCount, onPageCountChange }: ManualPageCountProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="manual-pages">Number of pages in your document</Label>
      <Input
        id="manual-pages"
        type="number"
        min="1"
        value={pageCount}
        onChange={(e) => onPageCountChange(Math.max(1, parseInt(e.target.value) || 1))}
        className="w-full"
        placeholder="Enter number of pages"
      />
      <p className="text-sm text-muted-foreground">
        You can manually adjust the page count if needed
      </p>
    </div>
  );
};