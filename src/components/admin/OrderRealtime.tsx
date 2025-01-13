import { useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrdersTable } from "@/integrations/supabase/types/orders";
import { useToast } from "@/hooks/use-toast";

type Order = OrdersTable['Row'];

interface OrderRealtimeProps {
  orderId: string;
  onOrderUpdate: (order: Order) => void;
}

export const OrderRealtime = ({ orderId, onOrderUpdate }: OrderRealtimeProps) => {
  const { toast } = useToast();

  const fetchOrder = useCallback(async (retryCount = 0) => {
    try {
      console.log(`Fetching order ${orderId}, attempt ${retryCount + 1}`);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching order:', error);
        if (retryCount < 3) {
          const delay = 1000 * (retryCount + 1);
          console.log(`Retrying fetch in ${delay}ms...`);
          setTimeout(() => fetchOrder(retryCount + 1), delay);
          return;
        }
        toast({
          title: "Error",
          description: "Failed to fetch order details. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        console.log('Order data fetched successfully:', data);
        onOrderUpdate(data);
      }
    } catch (error) {
      console.error('Error in fetchOrder:', error);
      if (retryCount < 3) {
        setTimeout(() => fetchOrder(retryCount + 1), 1000 * (retryCount + 1));
      }
    }
  }, [orderId, onOrderUpdate, toast]);

  useEffect(() => {
    console.log('Setting up real-time subscription for order:', orderId);
    
    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          console.log('Order update received:', payload);
          if (payload.eventType === 'UPDATE' && payload.new) {
            console.log('Updating order with new data:', payload.new);
            onOrderUpdate(payload.new as Order);
          }
        }
      )
      .subscribe((status) => {
        console.log(`Subscription status for order ${orderId}:`, status);
        if (status === 'CHANNEL_ERROR') {
          console.error('Subscription error, retrying...');
          toast({
            title: "Connection Error",
            description: "Failed to connect to real-time updates. Retrying...",
            variant: "destructive",
          });
        }
      });

    // Initial fetch
    fetchOrder();

    return () => {
      console.log('Cleaning up subscription for order:', orderId);
      supabase.removeChannel(channel);
    };
  }, [orderId, fetchOrder, onOrderUpdate]);

  return null;
};