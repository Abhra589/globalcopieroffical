import { useEffect } from "react";
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
          toast({
            title: "Connection Error",
            description: "Failed to connect to real-time updates. Please refresh the page.",
            variant: "destructive",
          });
        }
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
          toast({
            title: "Error",
            description: "Failed to fetch order details. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          console.log('Initial order data:', data);
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
        toast({
          title: "Error",
          description: "Something went wrong. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    fetchOrder();

    return () => {
      console.log('Cleaning up subscription for order:', orderId);
      supabase.removeChannel(channel);
    };
  }, [orderId, onOrderUpdate, toast]);

  return null;
};