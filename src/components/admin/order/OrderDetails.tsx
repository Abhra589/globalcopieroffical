import React from 'react';
import { PrintSpecifications } from './PrintSpecifications';
import { PaymentStatus } from './payment/PaymentStatus';

interface OrderDetailsProps {
  pages: number;
  copies: number;
  gsm: string;
  printType: string;
  printSides: string;
  amount: number;
  orderId: string;
  paymentStatus: string;
  customerPaymentResponse?: string;
  onUpdatePaymentStatus?: (newStatus: string) => void;
}

export const OrderDetails = ({
  pages,
  copies,
  gsm,
  printType,
  printSides,
  amount,
  orderId,
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
        orderId={orderId}
        customerPaymentResponse={customerPaymentResponse}
        onUpdatePaymentStatus={onUpdatePaymentStatus}
      />
    </div>
  );
};