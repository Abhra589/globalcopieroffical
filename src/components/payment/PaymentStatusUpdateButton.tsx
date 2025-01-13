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
      console.log('Starting payment status update for order:', orderId);

      // First, verify the order exists
      const { data: existingOrder, error: fetchError } = await supabase
        .from('orders')
        .select('payment_status')
        .eq('id', orderId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching order:', fetchError);
        throw new Error('Failed to fetch order');
      }

      if (!existingOrder) {
        throw new Error('Order not found');
      }

      console.log('Found existing order:', existingOrder);

      // Update payment status with exact string match
      const { data: updatedOrder, error: updateError } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Done' })
        .eq('id', orderId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating payment status:', updateError);
        throw new Error('Failed to update payment status');
      }

      console.log('Successfully updated order:', updatedOrder);
      
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