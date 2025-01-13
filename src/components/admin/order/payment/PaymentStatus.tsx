import React from 'react';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { PaymentResponseAlert } from './PaymentResponseAlert';
import { PaymentAmount } from './PaymentAmount';
import { ConfirmPaymentButton } from './ConfirmPaymentButton';

interface PaymentStatusProps {
  status: string;
  amount: number;
  orderId: string;
  customerPaymentResponse: string;
  onUpdatePaymentStatus?: (newStatus: string) => void;
}

export const PaymentStatus = ({ 
  status, 
  amount,
  orderId,
  customerPaymentResponse,
  onUpdatePaymentStatus 
}: PaymentStatusProps) => {
  const isPending = status.toLowerCase() === 'payment pending';

  console.log('Payment Status Component:', {
    status,
    customerPaymentResponse,
    isPending
  });

  return (
    <div className="space-y-3">
      <PaymentAmount amount={amount} />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Status:</span>
        <div className="space-y-2">
          <PaymentStatusBadge status={status} />
          <PaymentResponseAlert 
            customerPaymentResponse={customerPaymentResponse}
            show={true}
          />
        </div>

        <ConfirmPaymentButton
          orderId={orderId}
          onUpdatePaymentStatus={onUpdatePaymentStatus}
          show={isPending}
        />
      </div>
    </div>
  );
};