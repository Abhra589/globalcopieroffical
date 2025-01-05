import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppBusinessService } from '@/services/whatsapp/WhatsAppBusinessService';
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
  const [countdown, setCountdown] = useState(4);

  const handlePaymentDone = async () => {
    const orderId = searchParams.get("orderId");
    const customerPhone = searchParams.get("customerPhone");
    const amount = searchParams.get("amount");
    
    if (!orderId || orderId === 'new') {
      toast({
        title: "Error",
        description: "Invalid order ID",
        variant: "destructive",
      });
      return;
    }

    try {
      // First check if the order exists
      const { data: existingOrder, error: fetchError } = await supabase
        .from('orders')
        .select('id')
        .eq('id', orderId)
        .single();

      if (fetchError || !existingOrder) {
        throw new Error('Order not found');
      }

      // Update the order
      const { error: updateError } = await supabase
        .from('orders')
        .update({ payment_status: `₹${amount} Paid` })
        .eq('id', orderId);

      if (updateError) throw updateError;

      // Send confirmation to admin
      await WhatsAppBusinessService.sendMessage({
        to: "918777060249",
        text: `Payment confirmed for order ${orderId}. Amount: ₹${amount}`
      });

      // Send confirmation to user
      if (customerPhone) {
        await WhatsAppBusinessService.sendMessage({
          to: customerPhone,
          text: `Thank you! Your payment of ₹${amount} has been confirmed. We'll process your order shortly.`
        });
      }

      setShowConfirmation(true);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          const newCount = prev - 1;
          setProgress((4 - newCount) * 25);
          return newCount;
        });
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        setShowConfirmation(false);
        navigate('/');
      }, 4000);

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
              Redirecting in {countdown} seconds...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Progress value={progress} className="w-full" />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentActions;