import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface PaymentStatusProps {
  orderId: string;
}

export const PaymentStatus = ({ orderId }: PaymentStatusProps) => {
  const [status, setStatus] = useState<string>("Payment Pending");
  const { toast } = useToast();

  useEffect(() => {
    // Initial fetch of payment status
    const fetchInitialStatus = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('payment_status')
        .eq('id', orderId)
        .single();
      
      if (data) {
        setStatus(data.payment_status || "Payment Pending");
      }
    };

    fetchInitialStatus();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`payment-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          console.log('Payment status updated:', payload);
          if (payload.new) {
            setStatus((payload.new as any).payment_status);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  const handlePaymentConfirmation = async () => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Done' })
        .eq('id', orderId);

      if (error) throw error;

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

  return (
    <div className="text-center mt-4">
      <p className="text-lg font-medium mb-2">
        Current Status: 
        <span className={status === 'Payment Done' ? 'text-green-600 ml-2' : 'text-yellow-600 ml-2'}>
          {status}
        </span>
      </p>
      {status !== 'Payment Done' && (
        <Button
          onClick={handlePaymentConfirmation}
          variant="outline"
          className="text-blue-600 hover:text-blue-800"
        >
          Click here if payment is done
        </Button>
      )}
    </div>
  );
};