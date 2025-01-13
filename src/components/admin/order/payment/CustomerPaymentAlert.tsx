import React from 'react';

interface CustomerPaymentAlertProps {
  show: boolean;
  message?: string;
}

export const CustomerPaymentAlert = ({ show, message }: CustomerPaymentAlertProps) => {
  if (!show) return null;

  return (
    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
      <p className="text-sm text-blue-700 font-medium">
        {message || "Customer has indicated that payment has been made. Please verify the payment in your account before confirming."}
      </p>
    </div>
  );
};