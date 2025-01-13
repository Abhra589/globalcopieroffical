import React from 'react';

interface PaymentResponseAlertProps {
  customerPaymentResponse: string;
  show: boolean;
}

export const PaymentResponseAlert = ({ customerPaymentResponse, show }: PaymentResponseAlertProps) => {
  if (!show) return null;

  return (
    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
      <p className="text-sm text-blue-700 font-medium">
        {customerPaymentResponse}
      </p>
    </div>
  );
};