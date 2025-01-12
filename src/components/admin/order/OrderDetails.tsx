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

  const statusColor = getStatusColor(paymentStatus);
  const displayStatus = paymentStatus || 'Payment Pending';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Print Specifications</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Pages: {pages}</li>
            <li>Copies: {copies}</li>
            <li>Paper: {gsm}gsm</li>
            <li>Type: {printType === 'bw' ? 'Black & White' : 'Color'}</li>
            <li>Sides: {printSides === 'single' ? 'Single side' : 'Both sides'}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Payment Information</h4>
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
        </div>
      </div>
    </div>
  );
};