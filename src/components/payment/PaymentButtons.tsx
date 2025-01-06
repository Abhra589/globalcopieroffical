import React from 'react';
import { Button } from '../ui/button';

interface PaymentButtonsProps {
  onUPIClick: () => void;
  onPaymentDone: () => void;
}

export const PaymentButtons = ({ onUPIClick, onPaymentDone }: PaymentButtonsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Button 
        onClick={onUPIClick}
        className="w-full"
        variant="default"
      >
        Pay with UPI
      </Button>
      
      <Button 
        onClick={onPaymentDone}
        className="w-full"
        variant="outline"
      >
        Click here if payment is done
      </Button>
    </div>
  );
};