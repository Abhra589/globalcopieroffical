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
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching order:', error);
        if (retryCount < 3) {
          console.log(`Retrying fetch attempt ${retryCount + 1}...`);
          setTimeout(() => fetchOrder(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }
        toast({
          title: "Connection Error",
          description: "Failed to fetch order details. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        console.log('Order data fetched successfully:', data);
        onOrderUpdate(data);
      } else {
        console.log('No order found with id:', orderId);
        toast({
          title: "Not Found",
          description: "Order not found. It may have been deleted.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error in fetchOrder:', error);
      if (retryCount < 3) {
        setTimeout(() => fetchOrder(retryCount + 1), 1000 * (retryCount + 1));
        return;
      }
      toast({
        title: "Error",
        description: "Something went wrong. Please refresh the page.",
        variant: "destructive",
      });
    }
  }, [orderId, onOrderUpdate, toast]);

  const setupRealtimeSubscription = useCallback(() => {
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
          toast({
            title: "Connection Error",
            description: "Failed to connect to real-time updates. Retrying...",
            variant: "destructive",
          });
          // Retry subscription after a delay
          setTimeout(() => {
            console.log('Retrying subscription...');
            setupRealtimeSubscription();
          }, 3000);
        }
      });

    return channel;
  }, [orderId, onOrderUpdate, toast]);

  useEffect(() => {
    // Initial fetch with retry logic
    fetchOrder();

    // Setup realtime subscription with retry logic
    const channel = setupRealtimeSubscription();

    return () => {
      console.log('Cleaning up subscription for order:', orderId);
      supabase.removeChannel(channel);
    };
  }, [orderId, fetchOrder, setupRealtimeSubscription]);

  return null;
};