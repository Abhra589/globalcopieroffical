import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PaymentStatusUpdateButtonProps {
  orderId: string;
  onSuccess?: () => void;
}

export const PaymentStatusUpdateButton = ({ orderId, onSuccess }: PaymentStatusUpdateButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handlePaymentDone = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      console.log('Updating payment status for order:', orderId);

      // First, verify the order exists and get its current status
      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('payment_status, created_at')
        .eq('id', orderId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching order:', fetchError);
        throw fetchError;
      }

      if (!order) {
        throw new Error('Order not found');
      }

      console.log('Current order data:', order);

      // Update the payment status
      const { data: updatedOrder, error: updateError } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Done' })
        .eq('id', orderId)
        .select()
        .maybeSingle();

      if (updateError) {
        console.error('Error updating payment status:', updateError);
        throw updateError;
      }

      if (!updatedOrder) {
        throw new Error('Failed to update payment status');
      }

      console.log('Payment status updated successfully:', updatedOrder);
      toast({
        title: "Success",
        description: "Payment status updated successfully!",
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
          Updating payment status...
        </>
      ) : (
        'Click here if payment is done'
      )}
    </Button>
  );
};