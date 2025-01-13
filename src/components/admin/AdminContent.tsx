import { useState, useEffect } from "react";
import { OrderList } from "./OrderList";
import { AdminHeader } from "./AdminHeader";
import { LoadingState } from "./LoadingState";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { OrdersTable } from "@/integrations/supabase/types/orders";

type Order = OrdersTable['Row'];

interface AdminContentProps {
  onLogout: () => void;
}

export const AdminContent = ({ onLogout }: AdminContentProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <AdminHeader onLogout={onLogout} />
      <OrderList initialOrders={orders} />
    </>
  );
};