import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentButtons } from './PaymentButtons';
import { PaymentConfirmationDialog } from './PaymentConfirmationDialog';
import { usePaymentProcessor } from './PaymentProcessor';
import { supabase } from "@/integrations/supabase/client";

interface PaymentActionsProps {
  upiLink: string;
}

const PaymentActions = ({ upiLink }: PaymentActionsProps) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const { processPayment } = usePaymentProcessor();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (showConfirmation) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/');
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
  }, [showConfirmation, navigate]);

  const handlePaymentDone = async () => {
    const result = await processPayment();
    
    if (result.success) {
      setShowConfirmation(true);
      
      // Subscribe to real-time updates for this order
      const channel = supabase
        .channel('order_status')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `id=eq.${result.orderId}`,
          },
          (payload) => {
            console.log('Order status updated:', payload);
          }
        )
        .subscribe();

      // Cleanup subscription when component unmounts
      return () => {
        supabase.removeChannel(channel);
      };
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