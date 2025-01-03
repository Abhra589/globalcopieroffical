import React from 'react';

interface OrderSummaryProps {
  pageCount: number;
  calculateCourierCharge: (pages: number) => number;
  calculateTotal: () => number;
}

export const OrderSummary = ({ 
  pageCount, 
  calculateCourierCharge, 
  calculateTotal 
}: OrderSummaryProps) => {
  if (!pageCount) return null;

  const courierCharge = calculateCourierCharge(pageCount);
  const total = calculateTotal();
  const printingCost = total - courierCharge;

  return (
    <div className="p-6 bg-primary/5 rounded-lg space-y-3 animate-scale-in">
      <div className="flex justify-between items-center">
        <span className="text-primary">Document Pages:</span>
        <span className="font-medium">{pageCount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-primary">Printing Cost:</span>
        <span className="font-medium">₹{printingCost.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-primary">Courier Charge:</span>
        <span className="font-medium">₹{courierCharge}</span>
      </div>
      <div className="h-px bg-primary/20 my-2"></div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-primary">Total Amount:</span>
        <span className="text-lg font-bold text-primary">₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};