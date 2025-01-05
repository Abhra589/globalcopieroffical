import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderHeader } from './OrderHeader';
import { OrderDetails } from './OrderDetails';
import { OrderPaymentStatus } from './OrderPaymentStatus';
import { DeliveryAddress } from './DeliveryAddress';
import { DocumentLink } from './DocumentLink';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

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
}

interface OrderCardProps {
  order: Order;
  onDelete: (orderId: string) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', order.id);

      if (error) throw error;

      onDelete(order.id);
      toast({
        title: "Order deleted",
        description: "The order has been successfully deleted",
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
      <div className="flex justify-between items-start">
        <OrderHeader
          customerName={order.customer_name}
          orderId={order.id}
          customerEmail={order.customer_email}
          customerPhone={order.customer_phone}
          organization={order.organization}
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

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
        street="123 Main St"
        city="Chennai"
        state="Tamil Nadu"
        pincode="600001"
      />

      <DocumentLink fileUrl={order.file_url} />
    </Card>
  );
};