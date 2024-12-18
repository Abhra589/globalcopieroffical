import React from 'react';

interface PriceListProps {
  selectedGsm: "70" | "100";
}

export const PriceList = ({ selectedGsm }: PriceListProps) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <h3 className="font-semibold mb-4 text-base md:text-lg text-primary">Current Price List ({selectedGsm} GSM)</h3>
      <div className="space-y-3 text-sm md:text-base">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700 mb-1 md:mb-0">Black & White (Single side)</span>
          <span className="font-medium">₹{selectedGsm === "70" ? "0.80" : "2.00"}</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700 mb-1 md:mb-0">Black & White (Both sides)</span>
          <span className="font-medium">₹{selectedGsm === "70" ? "1.00" : "3.00"}</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700 mb-1 md:mb-0">Colour (Single side)</span>
          <span className="font-medium">₹{selectedGsm === "70" ? "2.50" : "3.00"}</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700 mb-1 md:mb-0">Colour (Both sides)</span>
          <span className="font-medium">₹{selectedGsm === "70" ? "4.50" : "5.00"}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="font-medium mb-2 text-primary">Delivery Charges</h4>
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-gray-700 mb-1 md:mb-0">Up to 400 pages</span>
              <span className="font-medium">₹80</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-gray-700 mb-1 md:mb-0">Above 400 pages</span>
              <span className="font-medium">₹150</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};