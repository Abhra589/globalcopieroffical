import React from 'react';
import { Button } from '../ui/button';
import { PaymentStatusUpdateButton } from './PaymentStatusUpdateButton';

interface PaymentButtonsProps {
  orderId: string;
  onUPIClick: () => void;
  onPaymentSuccess?: () => void;
}

export const PaymentButtons = ({ orderId, onUPIClick, onPaymentSuccess }: PaymentButtonsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Button 
        onClick={onUPIClick}
        className="w-full"
        variant="default"
      >
        Pay with UPI
      </Button>
      
      <PaymentStatusUpdateButton 
        orderId={orderId} 
        onSuccess={onPaymentSuccess}
      />
    </div>
  );
};