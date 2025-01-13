import React from 'react';

interface PaymentAmountProps {
  amount: number;
}

export const PaymentAmount = ({ amount }: PaymentAmountProps) => {
  return (
    <p className="text-primary font-medium text-lg">
      Amount: ₹{amount.toFixed(2)}
    </p>
  );
};