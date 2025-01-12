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
    const fetchInitialStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('payment_status')
          .eq('id', orderId)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          console.log('Initial payment status:', data.payment_status);
          setStatus(data.payment_status || "Payment Pending");
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
      }
    };

    fetchInitialStatus();

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
          console.log('Payment status update received:', payload);
          if (payload.new) {
            const newStatus = (payload.new as any).payment_status;
            console.log('Setting new payment status:', newStatus);
            setStatus(newStatus || "Payment Pending");
          }
        }
      )
      .subscribe((status) => {
        console.log(`Payment status subscription status:`, status);
      });

    return () => {
      console.log('Cleaning up payment status subscription');
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  const handlePaymentConfirmation = async () => {
    try {
      console.log('Updating payment status for order:', orderId);
      
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Done' })
        .eq('id', orderId);

      if (error) throw error;

      console.log('Payment status updated successfully');
      
      toast({
        title: "Success",
        description: "Payment status updated successfully",
      });

      // Update local state immediately for better UX
      setStatus('Payment Done');
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
    <div className="text-center mt-4 space-y-4">
      <p className="text-lg font-medium">
        Current Status: 
        <span className={`ml-2 ${
          status === 'Payment Done' 
            ? 'text-green-600' 
            : 'text-yellow-600'
        }`}>
          {status}
        </span>
      </p>
      
      {status !== 'Payment Done' && (
        <Button
          onClick={handlePaymentConfirmation}
          variant="outline"
          className="w-full max-w-md text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          Click here if payment is done
        </Button>
      )}
    </div>
  );
};