import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaymentButtons } from './PaymentButtons';
import { PaymentConfirmationDialog } from './PaymentConfirmationDialog';

interface PaymentActionsProps {
  upiLink: string;
}

const PaymentActions = ({ upiLink }: PaymentActionsProps) => {
  const [searchParams] = useSearchParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);

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

  const handleUPIClick = () => {
    window.location.href = upiLink;
  };

  const handlePaymentSuccess = () => {
    setShowConfirmation(true);
  };

  const orderId = searchParams.get('orderId') || '';

  return (
    <>
      <PaymentButtons
        orderId={orderId}
        onUPIClick={handleUPIClick}
        onPaymentSuccess={handlePaymentSuccess}
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