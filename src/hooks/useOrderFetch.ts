import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrdersTable } from "@/integrations/supabase/types/orders";
import { useToast } from "@/hooks/use-toast";

type Order = OrdersTable['Row'];

export const useOrderFetch = (orderId: string, onOrderUpdate: (order: Order) => void) => {
  const { toast } = useToast();

  const fetchOrder = useCallback(async (orderId: string, retryCount = 0) => {
    try {
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
          setTimeout(() => fetchOrder(orderId, retryCount + 1), delay);
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
        setTimeout(() => fetchOrder(orderId, retryCount + 1), 1000 * (retryCount + 1));
        return;
      }
      toast({
        title: "Error",
        description: "Something went wrong. Please refresh the page.",
        variant: "destructive",
      });
    }
  }, [orderId, onOrderUpdate, toast]);

  return fetchOrder;
};