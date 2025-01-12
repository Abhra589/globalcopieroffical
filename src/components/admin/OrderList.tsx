import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrderCard } from "./OrderCard";
import { OrdersTable } from "@/integrations/supabase/types/orders";
import { useToast } from "@/hooks/use-toast";

type Order = OrdersTable['Row'];

interface OrderListProps {
  initialOrders: Order[];
}

export const OrderList = ({ initialOrders }: OrderListProps) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const { toast } = useToast();

  const setupRealtimeSubscription = useCallback(() => {
    console.log('Setting up real-time subscription for orders');
    
    const channel = supabase
      .channel('admin-orders')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
        },
        (payload) => {
          console.log('New order received:', payload);
          if (payload.new) {
            setOrders(currentOrders => [payload.new as Order, ...currentOrders]);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
        },
        (payload) => {
          console.log('Order updated:', payload);
          if (payload.new) {
            setOrders(currentOrders =>
              currentOrders.map(order =>
                order.id === (payload.new as Order).id ? (payload.new as Order) : order
              )
            );
          }
        }
      )
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') {
          console.error('Subscription error, retrying...');
          toast({
            title: "Connection Error",
            description: "Lost connection to updates. Retrying...",
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
  }, [toast]);

  useEffect(() => {
    const channel = setupRealtimeSubscription();

    return () => {
      console.log('Cleaning up order subscription');
      supabase.removeChannel(channel);
    };
  }, [setupRealtimeSubscription]);

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onDelete={handleDeleteOrder}
        />
      ))}
      {orders.length === 0 && (
        <p className="text-center text-gray-500">No orders yet</p>
      )}
    </div>
  );
};