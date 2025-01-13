import { useState } from "react";
import { OrderCard } from "./OrderCard";
import { OrdersTable } from "@/integrations/supabase/types/orders";

type Order = OrdersTable['Row'];

interface OrderListProps {
  initialOrders: Order[];
}

export const OrderList = ({ initialOrders }: OrderListProps) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleDeleteOrder = (orderId: string) => {
    setOrders(currentOrders => currentOrders.filter(order => order.id !== orderId));
  };

  if (orders.length === 0) {
    return <p className="text-center text-gray-500">No orders found</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onDelete={handleDeleteOrder}
        />
      ))}
    </div>
  );
};