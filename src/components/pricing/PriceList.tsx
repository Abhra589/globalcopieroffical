import React from 'react';

interface PriceListProps {
  selectedGsm: "70" | "100";
}

export const PriceList = ({ selectedGsm }: PriceListProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg animate-fade-in">
      <h3 className="font-semibold mb-2">Current Price List ({selectedGsm} GSM)</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Black & White (Single side)</span>
          <span>₹{selectedGsm === "70" ? "0.80" : "2.00"}</span>
        </div>
        <div className="flex justify-between">
          <span>Black & White (Both sides)</span>
          <span>₹{selectedGsm === "70" ? "1.00" : "3.00"}</span>
        </div>
        <div className="flex justify-between">
          <span>Colour (Single side)</span>
          <span>₹{selectedGsm === "70" ? "2.50" : "3.00"}</span>
        </div>
        <div className="flex justify-between">
          <span>Colour (Both sides)</span>
          <span>₹{selectedGsm === "70" ? "4.50" : "5.00"}</span>
        </div>
      </div>
    </div>
  );
};