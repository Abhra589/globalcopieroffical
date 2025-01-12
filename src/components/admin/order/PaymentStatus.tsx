import React from 'react';

interface PaymentStatusProps {
  status: string;
  amount: number;
}

export const PaymentStatus = ({ status, amount }: PaymentStatusProps) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'payment done':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'payment pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const statusColor = getStatusColor(status);
  const displayStatus = status || 'Payment Pending';

  return (
    <div className="space-y-3">
      <p className="text-primary font-medium text-lg">
        Amount: ₹{amount.toFixed(2)}
      </p>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Status:</span>
        <div className={`px-3 py-2 rounded-md border ${statusColor} text-sm font-medium flex items-center gap-2 w-fit`}>
          {displayStatus}
          {displayStatus.toLowerCase() === 'payment pending' && (
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
          )}
        </div>
      </div>
    </div>
  );
};