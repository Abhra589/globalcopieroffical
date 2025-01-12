import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrdersTable } from "@/integrations/supabase/types/orders";

type Order = OrdersTable['Row'];

interface OrderRealtimeProps {
  orderId: string;
  onOrderUpdate: (order: Order) => void;
}

export const OrderRealtime = ({ orderId, onOrderUpdate }: OrderRealtimeProps) => {
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
      });

    // Initial fetch to ensure we have the latest data
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching order:', error);
          return;
        }

        if (data) {
          console.log('Initial order data:', data);
          onOrderUpdate(data);
        } else {
          console.log('No order found with id:', orderId);
        }
      } catch (error) {
        console.error('Error in fetchOrder:', error);
      }
    };

    fetchOrder();

    return () => {
      console.log('Cleaning up subscription for order:', orderId);
      supabase.removeChannel(channel);
    };
  }, [orderId, onOrderUpdate]);

  return null;
};