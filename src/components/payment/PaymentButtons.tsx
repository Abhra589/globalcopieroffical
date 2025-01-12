import React from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

interface PaymentButtonsProps {
  onUPIClick: () => void;
  onPaymentDone: () => void;
  isLoading: boolean;
}

export const PaymentButtons = ({ onUPIClick, onPaymentDone, isLoading }: PaymentButtonsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Button 
        onClick={onUPIClick}
        className="w-full"
        variant="default"
        disabled={isLoading}
      >
        Pay with UPI
      </Button>
      
      <Button 
        onClick={onPaymentDone}
        className="w-full"
        variant="outline"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating payment status...
          </>
        ) : (
          'Click here if payment is done'
        )}
      </Button>
    </div>
  );
};