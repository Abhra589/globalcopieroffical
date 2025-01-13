import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrdersTable } from "@/integrations/supabase/types/orders";
import { useOrderFetch } from "@/hooks/useOrderFetch";
import { useOrderSubscription } from "@/hooks/useOrderSubscription";

type Order = OrdersTable['Row'];

interface OrderRealtimeProps {
  orderId: string;
  onOrderUpdate: (order: Order) => void;
}

export const OrderRealtime = ({ orderId, onOrderUpdate }: OrderRealtimeProps) => {
  const fetchOrder = useOrderFetch(orderId, onOrderUpdate);
  const setupRealtimeSubscription = useOrderSubscription(orderId, onOrderUpdate);

  useEffect(() => {
    // Initial fetch with retry logic
    fetchOrder(orderId);

    // Setup realtime subscription with retry logic
    const channel = setupRealtimeSubscription();

    return () => {
      console.log('Cleaning up subscription for order:', orderId);
      supabase.removeChannel(channel);
    };
  }, [orderId, fetchOrder, setupRealtimeSubscription]);

  return null;
};