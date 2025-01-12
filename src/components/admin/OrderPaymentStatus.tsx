import React from 'react';

interface OrderPaymentStatusProps {
  status: string;
  amount: number;
}

export const OrderPaymentStatus = ({ status, amount }: OrderPaymentStatusProps) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'payment done':
        return 'text-green-600';
      case 'payment pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const statusColor = getStatusColor(status);
  const displayStatus = status || 'Payment Pending';

  return (
    <div className="mt-3 space-y-2">
      <p className="text-lg font-semibold text-primary">
        Total Amount: ₹{amount.toFixed(2)}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-sm">Status:</p>
        <span className={`font-medium ${statusColor} capitalize flex items-center gap-2`}>
          {displayStatus}
          {status?.toLowerCase() !== 'payment done' && (
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
          )}
        </span>
      </div>
    </div>
  );
};