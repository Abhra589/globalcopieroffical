import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sendWhatsAppMessage } from "@/components/pricing/WhatsAppService";
import { OrderHeader } from "./OrderHeader";
import { DeliveryAddress } from "./DeliveryAddress";
import { OrderDetails } from "./OrderDetails";
import { OrderActions } from "./OrderActions";

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
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface OrderCardProps {
  order: Order;
  onDelete: (id: string) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  const handleSendWhatsAppConfirmation = () => {
    try {
      const message = `Hi ${order.customer_name}, your order details:\n` +
        `Pages: ${order.pages}\n` +
        `Copies: ${order.copies}\n` +
        `Paper: ${order.gsm}gsm\n` +
        `Print Type: ${order.print_type === 'bw' ? 'Black & White' : 'Color'}\n` +
        `Print Sides: ${order.print_sides === 'single' ? 'Single side' : 'Both sides'}\n` +
        `Delivery: ${order.delivery_type === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n` +
        `Total Amount: ₹${order.amount.toFixed(2)}\n` +
        `Document Link: ${order.file_url}`;
      
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
      if (order.file_path) {
        const { error: storageError } = await supabase.storage
          .from('print_files')
          .remove([order.file_path]);

        if (storageError) throw storageError;
      }

      const { error: dbError } = await supabase
        .from('orders')
        .delete()
        .eq('id', order.id);

      if (dbError) throw dbError;
      
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
          <OrderHeader
            customerName={order.customer_name}
            orderId={order.id}
            customerEmail={order.customer_email}
            customerPhone={order.customer_phone}
            organization={order.organization}
          />
          
          {order.delivery_type === 'delivery' && (
            <DeliveryAddress
              street={order.street}
              city={order.city}
              state={order.state}
              pincode={order.pincode}
            />
          )}

          <OrderDetails
            pages={order.pages}
            copies={order.copies}
            gsm={order.gsm}
            printType={order.print_type}
            printSides={order.print_sides}
            deliveryType={order.delivery_type}
          />
          
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
        
        <OrderActions
          onWhatsAppClick={handleSendWhatsAppConfirmation}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};