import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from 'react-router-dom';

interface PaymentStatusUpdateButtonProps {
  orderId: string;
  onSuccess?: () => void;
}

export const PaymentStatusUpdateButton = ({ orderId, onSuccess }: PaymentStatusUpdateButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const customerName = searchParams.get("customerName") || "";
  const amount = searchParams.get("amount") || "0";
  const pages = searchParams.get("pages") || "0";
  const copies = searchParams.get("copies") || "1";
  const printType = searchParams.get("printType") || "";
  const deliveryType = searchParams.get("deliveryType") || "";

  const handlePaymentDone = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      console.log('Starting payment status update for order:', orderId);

      // Create WhatsApp message with order details and the additional text
      const message = `I ${customerName} have paid Rs.${amount} for my order (Order ID: ${orderId}).\n\nOrder Details:\n- Pages: ${pages}\n- Copies: ${copies}\n- Print Type: ${printType}\n- Delivery: ${deliveryType}\n\nPlease confirm my order asap`;
      
      // Open WhatsApp with admin number
      const adminPhone = "918777060249"; // Admin's phone number
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${adminPhone}?text=${encodedMessage}`, '_blank');

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Pending' })
        .eq('id', orderId);

      if (updateError) {
        console.error('Error updating payment status:', updateError);
        throw new Error('Failed to update payment status');
      }

      console.log('Successfully updated order payment status');
      
      toast({
        title: "Success",
        description: "Payment status updated successfully! Admin will verify the payment via WhatsApp.",
      });

      if (onSuccess) {
        onSuccess();
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

  return (
    <Button 
      onClick={handlePaymentDone}
      className="w-full"
      variant="outline"
      disabled={isUpdating}
    >
      {isUpdating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending payment confirmation...
        </>
      ) : (
        'Click here if payment is done'
      )}
    </Button>
  );
};