import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppNotificationService } from '@/services/whatsapp/WhatsAppNotificationService';
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
  const [countdown, setCountdown] = useState(5);

  const handlePaymentDone = async () => {
    const orderId = searchParams.get("orderId");
    const customerPhone = searchParams.get("customerPhone");
    const amount = searchParams.get("amount");
    
    if (!orderId) {
      toast({
        title: "Error",
        description: "Order ID is missing from the URL",
        variant: "destructive",
      });
      return;
    }

    try {
      // Update the order's payment status
      const { error: updateError } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Done' })
        .eq('id', orderId);

      if (updateError) {
        console.error('Error updating payment status:', updateError);
        throw updateError;
      }

      // Send WhatsApp notifications
      if (customerPhone && amount) {
        await WhatsAppNotificationService.sendOrderConfirmation(orderId, amount, customerPhone);
      }

      // Show confirmation dialog with timer
      setShowConfirmation(true);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate('/');
            return 0;
          }
          const newCount = prev - 1;
          setProgress((5 - newCount) * 20); // Convert to percentage (100/5 = 20)
          return newCount;
        });
      }, 1000);

    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status. Please try again.",
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
              Thank You for Placing the Order with Us! You will receive a confirmation message from Admin soon. Redirecting in {countdown} seconds...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Progress value={progress} className="w-full" />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentActions;