import React, { useState } from 'react';
import { PaymentButtons } from './PaymentButtons';
import { PaymentConfirmationDialog } from './PaymentConfirmationDialog';
import { usePaymentStatusUpdate } from '@/hooks/usePaymentStatusUpdate';

interface PaymentActionsProps {
  upiLink: string;
}

const PaymentActions = ({ upiLink }: PaymentActionsProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const { isUpdating, handlePaymentUpdate } = usePaymentStatusUpdate();

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (showConfirmation) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = '/';
            return 0;
          }
          const newCount = prev - 1;
          setProgress((5 - newCount) * 20);
          return newCount;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [showConfirmation]);

  const handlePaymentDone = async () => {
    const success = await handlePaymentUpdate();
    if (success) {
      setShowConfirmation(true);
    }
  };

  const handleUPIClick = () => {
    window.location.href = upiLink;
  };

  return (
    <>
      <PaymentButtons
        onUPIClick={handleUPIClick}
        onPaymentDone={handlePaymentDone}
        isLoading={isUpdating}
      />
      
      <PaymentConfirmationDialog
        showConfirmation={showConfirmation}
        countdown={countdown}
        progress={progress}
      />
    </>
  );
};

export default PaymentActions;