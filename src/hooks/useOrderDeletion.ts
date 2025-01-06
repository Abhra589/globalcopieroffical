import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WhatsAppNotificationService } from "@/services/whatsapp/WhatsAppNotificationService";

export const useOrderDeletion = (orderId: string, onDelete: (orderId: string) => void) => {
  const { toast } = useToast();

  const handleDelete = useCallback(async () => {
    try {
      const { error: deleteError } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (deleteError) throw deleteError;

      try {
        await WhatsAppNotificationService.sendOrderUpdate(
          `Order ${orderId} has been deleted.`,
          "918777060249"
        );
      } catch (notificationError) {
        console.error('Error sending WhatsApp notification:', notificationError);
      }

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