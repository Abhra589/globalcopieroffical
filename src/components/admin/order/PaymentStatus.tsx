import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PaymentStatusProps {
  status: string;
  amount: number;
  customerPaymentResponse?: boolean;
  onUpdatePaymentStatus?: (newStatus: string) => void;
}

export const PaymentStatus = ({ 
  status, 
  amount, 
  customerPaymentResponse = false,
  onUpdatePaymentStatus 
}: PaymentStatusProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = React.useState(false);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'payment done':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'payment pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleAdminConfirmPayment = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Done' })
        .eq('id', orderId);

      if (error) throw error;

      if (onUpdatePaymentStatus) {
        onUpdatePaymentStatus('Payment Done');
      }

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

  const statusColor = getStatusColor(status);
  const displayStatus = status || 'Payment Pending';

  return (
    <div className="space-y-3">
      <p className="text-primary font-medium text-lg">
        Amount: ₹{amount.toFixed(2)}
      </p>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Status:</span>
        <div 
          className={`px-3 py-2 rounded-md border ${statusColor} text-sm font-medium flex items-center gap-2 w-fit`}
        >
          {displayStatus}
          {displayStatus.toLowerCase() === 'payment pending' && (
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
          )}
        </div>
        
        {customerPaymentResponse && status.toLowerCase() === 'payment pending' && (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-600">
              Customer has indicated payment is complete. Please verify and confirm.
            </p>
          </div>
        )}

        {status.toLowerCase() === 'payment pending' && (
          <Button
            onClick={handleAdminConfirmPayment}
            disabled={isUpdating}
            className="mt-2 w-fit"
          >
            {isUpdating ? 'Updating...' : 'Confirm Payment Receipt'}
          </Button>
        )}
      </div>
    </div>
  );
};