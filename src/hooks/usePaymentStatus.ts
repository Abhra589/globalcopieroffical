import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePaymentStatus = (orderId: string) => {
  const [status, setStatus] = useState<string>("Payment Pending");

  useEffect(() => {
    console.log('Setting up payment status subscription for order:', orderId);
    
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
      .subscribe();

    // Initial fetch
    const fetchInitialStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('payment_status')
          .eq('id', orderId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching payment status:', error);
          return;
        }

        if (data) {
          setStatus(data.payment_status || "Payment Pending");
        }
      } catch (error) {
        console.error('Error in fetchInitialStatus:', error);
      }
    };

    fetchInitialStatus();

    return () => {
      console.log('Cleaning up payment status subscription');
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  return status;
};