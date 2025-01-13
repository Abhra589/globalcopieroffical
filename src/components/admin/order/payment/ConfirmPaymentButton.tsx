import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ConfirmPaymentButtonProps {
  orderId: string;
  onUpdatePaymentStatus: (newStatus: string) => void;
  show: boolean;
}

export const ConfirmPaymentButton = ({ 
  orderId, 
  onUpdatePaymentStatus,
  show 
}: ConfirmPaymentButtonProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = React.useState(false);

  if (!show) return null;

  const handleAdminConfirmPayment = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Done' })
        .eq('id', orderId);

      if (error) throw error;

      onUpdatePaymentStatus('Payment Done');

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
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Button
      onClick={handleAdminConfirmPayment}
      disabled={isUpdating}
      className="mt-2 w-fit"
    >
      {isUpdating ? 'Updating...' : 'Confirm Payment Receipt'}
    </Button>
  );
};