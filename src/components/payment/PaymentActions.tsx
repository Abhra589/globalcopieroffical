import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentButtons } from './PaymentButtons';
import { PaymentConfirmationDialog } from './PaymentConfirmationDialog';
import { usePaymentProcessor } from './PaymentProcessor';
import { PaymentService } from '@/services/payment/PaymentService';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

interface PaymentActionsProps {
  upiLink: string;
}

const PaymentActions = ({ upiLink }: PaymentActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    try {
      const result = await processPayment();
      
      if (result.success) {
        // Update the payment status to "Payment Done"
        const { error } = await supabase
          .from('orders')
          .update({ payment_status: 'Payment Done' })
          .eq('id', result.orderId);

        if (error) {
          console.error('Error updating payment status:', error);
          toast({
            title: "Error",
            description: "Failed to update payment status. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setShowConfirmation(true);
        toast({
          title: "Success",
          description: "Payment status updated successfully!",
        });
      }
    } catch (error) {
      console.error('Error in handlePaymentDone:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
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
        isLoading={false}
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