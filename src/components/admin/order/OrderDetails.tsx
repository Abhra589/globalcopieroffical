import React from 'react';
import { PrintSpecifications } from './PrintSpecifications';
import { PaymentStatus } from './PaymentStatus';

interface OrderDetailsProps {
  pages: number;
  copies: number;
  gsm: string;
  printType: string;
  printSides: string;
  amount: number;
  paymentStatus: string;
  customerPaymentResponse?: boolean;
  onUpdatePaymentStatus?: (newStatus: string) => void;
}

export const OrderDetails = ({
  pages,
  copies,
  gsm,
  printType,
  printSides,
  amount,
  paymentStatus,
  customerPaymentResponse,
  onUpdatePaymentStatus
}: OrderDetailsProps) => {
  return (
    <div className="space-y-4">
      <PrintSpecifications
        pages={pages}
        copies={copies}
        gsm={gsm}
        printType={printType}
        printSides={printSides}
      />
      <PaymentStatus 
        status={paymentStatus} 
        amount={amount} 
        customerPaymentResponse={customerPaymentResponse}
        onUpdatePaymentStatus={onUpdatePaymentStatus}
      />
    </div>
  );
};