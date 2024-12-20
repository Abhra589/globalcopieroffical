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

  return (
    <div className="p-6 bg-primary/5 rounded-lg space-y-3 animate-scale-in">
      <p className="text-primary">Document Pages: {pageCount}</p>
      <p className="text-primary">Courier Charge: ₹{calculateCourierCharge(pageCount)}</p>
      <p className="text-xl font-bold text-primary">
        Total Amount: ₹{calculateTotal().toFixed(2)}
      </p>
    </div>
  );
};