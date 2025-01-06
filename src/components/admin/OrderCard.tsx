import React from 'react';
import { Card } from "@/components/ui/card";
import { OrderHeader } from './OrderHeader';
import { OrderDetails } from './OrderDetails';
import { OrderPaymentStatus } from './OrderPaymentStatus';
import { DeliveryAddress } from './DeliveryAddress';
import { DocumentLink } from './DocumentLink';
import { OrderActions } from './OrderActions';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  file_url: string;
  organization: string | null;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface OrderCardProps {
  order: Order;
  onDelete: (orderId: string) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      // First, verify the order exists
      const { data: existingOrder, error: fetchError } = await supabase
        .from('orders')
        .select('id')
        .eq('id', order.id)
        .single();

      if (fetchError) {
        console.error('Error fetching order:', fetchError);
        throw new Error('Order not found');
      }

      // Then delete it
      const { error: deleteError } = await supabase
        .from('orders')
        .delete()
        .eq('id', order.id);

      if (deleteError) throw deleteError;

      onDelete(order.id);
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
  };

  return (
    <Card className="p-6 space-y-4">
      <OrderHeader
        customerName={order.customer_name}
        orderId={order.id}
        customerEmail={order.customer_email}
        customerPhone={order.customer_phone}
        organization={order.organization}
      />

      <OrderDetails
        pages={order.pages}
        copies={order.copies}
        gsm={order.gsm}
        printType={order.print_type}
        printSides={order.print_sides}
        deliveryType={order.delivery_type}
      />

      <OrderPaymentStatus
        status={order.payment_status}
        amount={order.amount}
      />

      <DeliveryAddress
        street={order.street}
        city={order.city}
        state={order.state}
        pincode={order.pincode}
      />

      <DocumentLink fileUrl={order.file_url} />

      <OrderActions
        customerPhone={order.customer_phone}
        orderId={order.id}
        onDelete={handleDelete}
      />
    </Card>
  );
};