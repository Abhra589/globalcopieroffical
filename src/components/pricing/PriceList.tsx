import React from 'react';
import { theme } from '@/config/theme';

interface PriceListProps {
  selectedGsm: "70" | "100";
}

export const PriceList = ({ selectedGsm }: PriceListProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <h3 className="font-semibold mb-4 text-lg text-primary">Current Price List ({selectedGsm} GSM)</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700">Black & White (Single side)</span>
          <span className="font-medium">₹{selectedGsm === "70" ? "0.80" : "2.00"}</span>
        </div>
        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700">Black & White (Both sides)</span>
          <span className="font-medium">₹{selectedGsm === "70" ? "1.00" : "3.00"}</span>
        </div>
        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700">Colour (Single side)</span>
          <span className="font-medium">₹{selectedGsm === "70" ? "2.50" : "3.00"}</span>
        </div>
        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700">Colour (Both sides)</span>
          <span className="font-medium">₹{selectedGsm === "70" ? "4.50" : "5.00"}</span>
        </div>
      </div>
    </div>
  );
};