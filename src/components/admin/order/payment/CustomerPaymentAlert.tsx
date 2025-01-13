import React from 'react';

interface CustomerPaymentAlertProps {
  show: boolean;
}

export const CustomerPaymentAlert = ({ show }: CustomerPaymentAlertProps) => {
  if (!show) return null;

  return (
    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
      <p className="text-sm text-blue-700 font-medium">
        Customer has paid the amount. Please check if you received the payment before confirming.
      </p>
    </div>
  );
};