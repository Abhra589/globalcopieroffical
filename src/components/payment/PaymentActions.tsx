import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentButtons } from './PaymentButtons';
import { PaymentConfirmationDialog } from './PaymentConfirmationDialog';
import { usePaymentProcessor } from './PaymentProcessor';
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
  const [isUpdating, setIsUpdating] = useState(false);
  const { processPayment } = usePaymentProcessor();

  React.useEffect(() => {
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

  const updatePaymentStatus = async (orderId: string, retryCount = 0) => {
    try {
      console.log(`Attempting to update payment status for order ${orderId}, attempt ${retryCount + 1}`);
      
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Done' })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating payment status:', error);
        if (retryCount < 3) {
          console.log(`Retrying update attempt ${retryCount + 1}...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return updatePaymentStatus(orderId, retryCount + 1);
        }
        throw error;
      }

      console.log('Payment status updated successfully');
      return true;
    } catch (error) {
      console.error('Error in updatePaymentStatus:', error);
      throw error;
    }
  };

  const handlePaymentDone = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      const result = await processPayment();
      
      if (result.success && result.orderId) {
        await updatePaymentStatus(result.orderId);
        setShowConfirmation(true);
        toast({
          title: "Success",
          description: "Payment status updated successfully!",
        });
      } else {
        throw new Error('Invalid order ID');
      }
    } catch (error) {
      console.error('Error in handlePaymentDone:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
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