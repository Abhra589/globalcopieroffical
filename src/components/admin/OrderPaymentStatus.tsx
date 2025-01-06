import React from 'react';

interface OrderPaymentStatusProps {
  status: string;
  amount: number;
}

export const OrderPaymentStatus = ({ status, amount }: OrderPaymentStatusProps) => {
  const statusColor = status === 'Payment Done' ? 'text-green-600' : 'text-yellow-600';

  return (
    <div className="mt-3">
      <p className="text-lg font-semibold text-primary">
        Total Amount: ₹{amount.toFixed(2)}
      </p>
      <p className="text-sm">
        Status: <span className={`font-medium ${statusColor} capitalize`}>{status || 'Pending'}</span>
      </p>
    </div>
  );
};