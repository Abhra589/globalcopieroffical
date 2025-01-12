import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useOrderDeletion = (orderId: string, onDelete: (orderId: string) => void) => {
  const { toast } = useToast();

  const handleDelete = useCallback(async () => {
    try {
      const { error: deleteError } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (deleteError) throw deleteError;

      onDelete(orderId);
      toast({
        title: "Order deleted",
        description: "The order has been permanently deleted",
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    }
  }, [orderId, onDelete, toast]);

  return { handleDelete };
};