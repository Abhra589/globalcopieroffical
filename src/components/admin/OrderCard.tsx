import React, { useState, useEffect } from "react";
import { useOrderDeletion } from "@/hooks/useOrderDeletion";
import { OrderContainer } from "./OrderContainer";
import { OrderMetadata } from "./order/OrderMetadata";
import { OrderDetails } from "./order/OrderDetails";
import { OrderActions } from "./OrderActions";
import { OrderDateTime } from "./order/OrderDateTime";
import { OrderDeliveryInfo } from "./order/OrderDeliveryInfo";
import { OrdersTable } from "@/integrations/supabase/types/orders";
import { supabase } from "@/integrations/supabase/client";

type Order = OrdersTable['Row'];

interface OrderCardProps {
  order: Order;
  onDelete: (orderId: string) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const { handleDelete } = useOrderDeletion(order.id, onDelete);

  useEffect(() => {
    console.log('Setting up real-time subscription for order:', order.id);
    
    const channel = supabase
      .channel(`order-${order.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${order.id}`,
        },
        (payload) => {
          console.log('Order update received:', payload);
          if (payload.eventType === 'UPDATE' && payload.new) {
            console.log('Updating order with new data:', payload.new);
            setCurrentOrder(payload.new as Order);
          }
        }
      )
      .subscribe((status) => {
        console.log(`Subscription status for order ${order.id}:`, status);
      });

    // Initial fetch of the order
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', order.id)
        .maybeSingle();

      if (!error && data) {
        setCurrentOrder(data);
      }
    };

    fetchOrder();

    return () => {
      console.log('Cleaning up subscription for order:', order.id);
      supabase.removeChannel(channel);
    };
  }, [order.id]);

  return (
    <OrderContainer>
      <OrderDateTime 
        createdAt={currentOrder.created_at}
        orderId={currentOrder.id}
      />

      <OrderMetadata
        customerName={currentOrder.customer_name}
        customerEmail={currentOrder.customer_email}
        customerPhone={currentOrder.customer_phone}
        organization={currentOrder.organization}
      />

      <OrderDetails
        pages={currentOrder.pages}
        copies={currentOrder.copies}
        gsm={currentOrder.gsm}
        printType={currentOrder.print_type}
        printSides={currentOrder.print_sides}
        amount={currentOrder.amount}
        orderId={currentOrder.id}
        paymentStatus={currentOrder.payment_status || 'Payment Pending'}
        customerPaymentResponse={currentOrder.customer_payment_response}
        onUpdatePaymentStatus={(newStatus) => {
          setCurrentOrder(prev => ({
            ...prev,
            payment_status: newStatus
          }));
        }}
      />

      <OrderDeliveryInfo
        deliveryType={currentOrder.delivery_type}
        pickupDate={currentOrder.pickup_date}
        pickupTime={currentOrder.pickup_time}
        street={currentOrder.street}
        city={currentOrder.city}
        state={currentOrder.state}
        pincode={currentOrder.pincode}
        fileUrl={currentOrder.file_url}
      />

      <OrderActions
        customerPhone={currentOrder.customer_phone}
        orderId={currentOrder.id}
        onDelete={handleDelete}
      />
    </OrderContainer>
  );
};