import React from 'react';

interface OrderPaymentStatusProps {
  status: string;
  amount: number;
}

export const OrderPaymentStatus = ({ status, amount }: OrderPaymentStatusProps) => {
  const statusColor = status === 'Payment Done' ? 'text-green-600' : 'text-yellow-600';
  const displayStatus = status || 'Pending';

  return (
    <div className="mt-3">
      <p className="text-lg font-semibold text-primary">
        Total Amount: ₹{amount.toFixed(2)}
      </p>
      <p className="text-sm flex items-center gap-2">
        Status: 
        <span className={`font-medium ${statusColor} capitalize`}>
          {displayStatus}
        </span>
        {status !== 'Payment Done' && (
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
        )}
      </p>
    </div>
  );
};