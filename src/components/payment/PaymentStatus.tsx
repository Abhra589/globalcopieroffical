import React from 'react';
import { usePaymentStatus } from '@/hooks/usePaymentStatus';

interface PaymentStatusProps {
  orderId: string;
  onStatusChange?: (status: string) => void;
}

export const PaymentStatus = ({ orderId, onStatusChange }: PaymentStatusProps) => {
  const status = usePaymentStatus(orderId);

  React.useEffect(() => {
    if (onStatusChange) {
      onStatusChange(status);
    }
  }, [status, onStatusChange]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'payment done':
        return 'text-green-600 bg-green-50';
      case 'payment pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={`px-4 py-2 rounded-md ${getStatusColor(status)}`}>
      <p className="text-sm font-medium flex items-center gap-2">
        {status}
        {status.toLowerCase() === 'payment pending' && (
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
        )}
      </p>
    </div>
  );
};