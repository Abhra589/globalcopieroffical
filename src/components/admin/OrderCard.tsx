import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createAdminMessage, sendWhatsAppMessage } from "@/components/pricing/WhatsAppService";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pages: number;
  copies: number;
  gsm: string;
  print_type: string;
  print_sides: string;
  delivery_type: string;
  amount: number;
  payment_status: string;
  created_at: string;
  file_url: string;
  file_path: string;
  organization: string | null;
}

interface OrderCardProps {
  order: Order;
  onDelete: (id: string) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  const handleSendWhatsAppConfirmation = () => {
    try {
      const message = createAdminMessage(
        order.pages,
        order.copies,
        order.gsm,
        order.print_type,
        order.print_sides,
        order.delivery_type,
        order.amount,
        order.file_url
      );
      sendWhatsAppMessage(message, order.customer_phone);
      toast({
        title: "Success",
        description: "WhatsApp confirmation initiated",
      });
    } catch (error) {
      console.error('Error sending WhatsApp confirmation:', error);
      toast({
        title: "Error",
        description: "Failed to send WhatsApp confirmation",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', order.id);

      if (error) throw error;
      
      onDelete(order.id);
      toast({
        title: "Success",
        description: "Order deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border p-4 md:p-6 rounded-lg space-y-3 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="space-y-2 flex-grow">
          <h3 className="font-semibold text-lg">{order.customer_name}</h3>
          <p className="text-sm text-gray-600">Order ID: {order.id}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {order.customer_email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone:</span> {order.customer_phone}
          </p>
          
          {order.organization && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Organization:</span> {order.organization}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm font-medium">Print Details</p>
              <p className="text-sm text-gray-600">Pages: {order.pages}</p>
              <p className="text-sm text-gray-600">Copies: {order.copies}</p>
              <p className="text-sm text-gray-600">Paper: {order.gsm}gsm</p>
            </div>
            <div>
              <p className="text-sm font-medium">Service Details</p>
              <p className="text-sm text-gray-600">
                Type: {order.print_type === 'bw' ? 'Black & White' : 'Color'}
              </p>
              <p className="text-sm text-gray-600">
                Sides: {order.print_sides === 'single' ? 'Single side' : 'Both sides'}
              </p>
              <p className="text-sm text-gray-600">
                Delivery: {order.delivery_type === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
              </p>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-lg font-semibold text-primary">
              Total Amount: ₹{order.amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              Status: <span className="capitalize">{order.payment_status}</span>
            </p>
            {order.file_url && (
              <a
                href={order.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View Document
              </a>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <Button
            onClick={handleSendWhatsAppConfirmation}
            className="w-full md:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white"
          >
            Send WhatsApp
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="w-full md:w-auto"
          >
            Delete Order
          </Button>
        </div>
      </div>
    </div>
  );
};