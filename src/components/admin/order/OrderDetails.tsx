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
}

export const OrderDetails = ({
  pages,
  copies,
  gsm,
  printType,
  printSides,
  amount,
  paymentStatus,
}: OrderDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <PrintSpecifications
          pages={pages}
          copies={copies}
          gsm={gsm}
          printType={printType}
          printSides={printSides}
        />
        <div>
          <h4 className="font-medium mb-2">Payment Information</h4>
          <PaymentStatus status={paymentStatus} amount={amount} />
        </div>
      </div>
    </div>
  );
};