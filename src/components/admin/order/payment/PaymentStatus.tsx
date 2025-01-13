import React from 'react';
import { StatusBadge } from './StatusBadge';
import { CustomerPaymentAlert } from './CustomerPaymentAlert';
import { ConfirmPaymentButton } from './ConfirmPaymentButton';
import { PaymentAmount } from './PaymentAmount';

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
  customerPaymentResponse,
  onUpdatePaymentStatus = () => {} 
}: PaymentStatusProps) => {
  const isPending = status.toLowerCase() === 'payment pending';
  const hasCustomerConfirmedPayment = customerPaymentResponse === "customer has paid the amount. Did you get it?";

  return (
    <div className="space-y-3">
      <PaymentAmount amount={amount} />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Status:</span>
        <div className="space-y-2">
          <StatusBadge status={status} />
          <CustomerPaymentAlert 
            show={hasCustomerConfirmedPayment} 
            message={customerPaymentResponse}
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