import { useState } from "react";
import { useOrderDeletion } from "@/hooks/useOrderDeletion";
import { OrderContainer } from "./OrderContainer";
import { OrderMetadata } from "./order/OrderMetadata";
import { OrderDetails } from "./order/OrderDetails";
import { DeliveryAddress } from "./DeliveryAddress";
import { DocumentLink } from "./DocumentLink";
import { OrderActions } from "./OrderActions";
import { InStorePickupInfo } from "./InStorePickupInfo";
import { OrderRealtime } from "./order/OrderRealtime";
import { OrdersTable } from "@/integrations/supabase/types/orders";

type Order = OrdersTable['Row'];

interface OrderCardProps {
  order: Order;
  onDelete: (orderId: string) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  const [currentOrder, setCurrentOrder] = useState(order);
  const { handleDelete } = useOrderDeletion(order.id, onDelete);

  return (
    <OrderContainer>
      <OrderRealtime 
        orderId={order.id} 
        onOrderUpdate={(updatedOrder) => setCurrentOrder(updatedOrder)} 
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
        paymentStatus={currentOrder.payment_status}
      />

      {currentOrder.delivery_type === 'pickup' ? (
        <InStorePickupInfo
          pickupDate={currentOrder.pickup_date}
          pickupTime={currentOrder.pickup_time}
        />
      ) : (
        <DeliveryAddress
          street={currentOrder.street}
          city={currentOrder.city}
          state={currentOrder.state}
          pincode={currentOrder.pincode}
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