import React from 'react';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { PaymentResponseAlert } from './PaymentResponseAlert';
import { PaymentAmount } from './PaymentAmount';
import { ConfirmPaymentButton } from './ConfirmPaymentButton';

interface PaymentStatusProps {
  status: string;
  amount: number;
  orderId: string;
  customerPaymentResponse?: string;
  onUpdatePaymentStatus?: (newStatus: string) => void;
}

export const PaymentStatus = ({ 
  status, 
  amount,
  orderId,
  customerPaymentResponse = "customer has not paid the amount",
  onUpdatePaymentStatus 
}: PaymentStatusProps) => {
  const isPending = status.toLowerCase() === 'payment pending';
  const hasCustomerConfirmedPayment = customerPaymentResponse === "customer has paid the amount. Did you get it?";

  return (
    <div className="space-y-3">
      <PaymentAmount amount={amount} />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Status:</span>
        <div className="space-y-2">
          <PaymentStatusBadge status={status} />
          <PaymentResponseAlert 
            show={hasCustomerConfirmedPayment && isPending}
            customerPaymentResponse={customerPaymentResponse}
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