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

      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          customer_payment_response: "customer has paid the amount. Did you get it?",
          payment_status: 'Payment Pending' // Keep as pending for admin verification
        })
        .eq('id', orderId);

      if (updateError) {
        console.error('Error updating payment status:', updateError);
        throw new Error('Failed to update payment status');
      }

      console.log('Successfully updated order payment status');
      
      toast({
        title: "Success",
        description: "Payment status updated successfully! Admin will verify the payment.",
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