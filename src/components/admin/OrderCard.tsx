import React, { useState, useEffect } from "react";
import { useOrderDeletion } from "@/hooks/useOrderDeletion";
import { OrderContainer } from "./OrderContainer";
import { OrderMetadata } from "./order/OrderMetadata";
import { OrderDetails } from "./order/OrderDetails";
import { DeliveryAddress } from "./DeliveryAddress";
import { DocumentLink } from "./DocumentLink";
import { OrderActions } from "./OrderActions";
import { InStorePickupInfo } from "./InStorePickupInfo";
import { OrdersTable } from "@/integrations/supabase/types/orders";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

type Order = OrdersTable['Row'];

interface OrderCardProps {
  order: Order;
  onDelete: (orderId: string) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const { handleDelete } = useOrderDeletion(order.id, onDelete);

  const handlePaymentStatusUpdate = (newStatus: string) => {
    setCurrentOrder(prev => ({
      ...prev,
      payment_status: newStatus
    }));
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', order.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching order:', error);
          return;
        }

        if (data && data.payment_status !== currentOrder.payment_status) {
          console.log('Payment status updated:', data.payment_status);
          setCurrentOrder(data);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    // Check every 5 seconds if payment is pending
    const interval = setInterval(() => {
      if (currentOrder.payment_status?.toLowerCase() === 'payment pending') {
        checkPaymentStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentOrder.id, currentOrder.payment_status]);

  const formattedDate = currentOrder.created_at 
    ? format(new Date(currentOrder.created_at), 'PPpp')
    : 'Date not available';

  return (
    <OrderContainer>
      <div className="mb-4 text-sm text-gray-600">
        <p>Order ID: {currentOrder.id}</p>
        <p>Created: {formattedDate}</p>
      </div>

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
        paymentStatus={currentOrder.payment_status || 'Payment Pending'}
        customerPaymentResponse={currentOrder.customer_payment_response}
        onUpdatePaymentStatus={handlePaymentStatusUpdate}
      />

      {currentOrder.delivery_type === 'pickup' ? (
        <InStorePickupInfo
          pickupDate={currentOrder.pickup_date || ''}
          pickupTime={currentOrder.pickup_time || ''}
        />
      ) : (
        <DeliveryAddress
          street={currentOrder.street || ''}
          city={currentOrder.city || ''}
          state={currentOrder.state || ''}
          pincode={currentOrder.pincode || ''}
        />
      )}

      <div className="mt-4">
        <DocumentLink fileUrl={currentOrder.file_url} />
      </div>

      <OrderActions
        customerPhone={currentOrder.customer_phone}
        orderId={currentOrder.id}
        onDelete={handleDelete}
      />
    </OrderContainer>
  );
};
