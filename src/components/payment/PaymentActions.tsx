import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '../ui/alert-dialog';
import { Progress } from '../ui/progress';

interface PaymentActionsProps {
  upiLink: string;
}

const PaymentActions = ({ upiLink }: PaymentActionsProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePaymentDone = async () => {
    const orderId = searchParams.get("orderId");
    
    if (!orderId) {
      toast({
        title: "Error",
        description: "Order ID not found",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: 'payment done from user side' })
        .eq('id', orderId);

      if (error) throw error;

      setShowConfirmation(true);
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2.5;
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowConfirmation(false);
            navigate('/');
          }, 100);
        }
      }, 100);

      toast({
        title: "Success",
        description: "Payment status updated successfully",
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status",
        variant: "destructive",
      });
    }
  };

  const handleUPIClick = () => {
    window.location.href = upiLink;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Button 
        onClick={handleUPIClick}
        className="w-full"
        variant="default"
      >
        Pay with UPI
      </Button>
      
      <Button 
        onClick={handlePaymentDone}
        className="w-full"
        variant="outline"
      >
        Click here if payment is done
      </Button>

      <AlertDialog open={showConfirmation}>
        <AlertDialogContent className="flex flex-col items-center gap-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Thank you for choosing Global Copier</AlertDialogTitle>
            <AlertDialogDescription>
              You will soon receive a payment confirmation message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Progress value={progress} className="w-full" />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentActions;