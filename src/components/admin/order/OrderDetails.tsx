import React from 'react';

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
  paymentStatus
}: OrderDetailsProps) => {
  const statusColor = paymentStatus === 'Payment Done' ? 'text-green-600' : 'text-yellow-600';
  const displayStatus = paymentStatus || 'Payment Pending';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium">Print Specifications</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Pages: {pages}</li>
            <li>Copies: {copies}</li>
            <li>Paper: {gsm}gsm</li>
            <li>Type: {printType === 'bw' ? 'Black & White' : 'Color'}</li>
            <li>Sides: {printSides === 'single' ? 'Single side' : 'Both sides'}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Payment Information</h4>
          <div className="text-sm space-y-1">
            <p className="text-primary font-medium">Amount: ₹{amount.toFixed(2)}</p>
            <p className={`${statusColor} font-medium flex items-center gap-2`}>
              Status: {displayStatus}
              {displayStatus !== 'Payment Done' && (
                <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};