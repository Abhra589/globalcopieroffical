import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrdersTable } from "@/integrations/supabase/types/orders";
import { useToast } from "@/hooks/use-toast";

type Order = OrdersTable['Row'];

export const useOrderSubscription = (orderId: string, onOrderUpdate: (order: Order) => void) => {
  const { toast } = useToast();

  return useCallback(() => {
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
          setTimeout(() => {
            console.log('Retrying subscription...');
            setupRealtimeSubscription();
          }, 3000);
        }
      });

    return channel;
  }, [orderId, onOrderUpdate, toast]);
};