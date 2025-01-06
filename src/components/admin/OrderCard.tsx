import { useOrderDeletion } from "@/hooks/useOrderDeletion";
import { OrderContainer } from "./OrderContainer";
import { OrderHeader } from './OrderHeader';
import { OrderDetails } from './OrderDetails';
import { OrderPaymentStatus } from './OrderPaymentStatus';
import { DeliveryAddress } from './DeliveryAddress';
import { DocumentLink } from './DocumentLink';
import { OrderActions } from './OrderActions';
import { InStorePickupInfo } from './InStorePickupInfo';

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
  street: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  pickup_date?: string;
  pickup_time?: string;
}

interface OrderCardProps {
  order: Order;
  onDelete: (orderId: string) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  const { handleDelete } = useOrderDeletion(order.id, onDelete);

  return (
    <OrderContainer>
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

      {order.delivery_type === 'pickup' ? (
        <InStorePickupInfo
          pickupDate={order.pickup_date}
          pickupTime={order.pickup_time}
        />
      ) : (
        <DeliveryAddress
          street={order.street}
          city={order.city}
          state={order.state}
          pincode={order.pincode}
        />
      )}

      {order.file_url && (
        <div className="mt-4">
          <DocumentLink fileUrl={order.file_url} />
        </div>
      )}

      <OrderActions
        customerPhone={order.customer_phone}
        orderId={order.id}
        onDelete={handleDelete}
      />
    </OrderContainer>
  );
};