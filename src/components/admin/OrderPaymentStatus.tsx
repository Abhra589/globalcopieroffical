import React from 'react';

interface OrderPaymentStatusProps {
  status: string;
  amount: number;
}

export const OrderPaymentStatus = ({ status, amount }: OrderPaymentStatusProps) => {
  return (
    <div className="mt-3">
      <p className="text-lg font-semibold text-primary">
        Total Amount: ₹{amount.toFixed(2)}
      </p>
      <p className="text-sm text-gray-600">
        Status: <span className="capitalize">{status}</span>
      </p>
    </div>
  );
};