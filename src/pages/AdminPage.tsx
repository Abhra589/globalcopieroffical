import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createAdminMessage } from "@/components/pricing/WhatsAppService";

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
}

const AdminPage = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleSendWhatsAppConfirmation = async (order: Order) => {
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

      const { data, error } = await supabase.functions.invoke('send-whatsapp', {
        body: { message, phoneNumber: order.customer_phone }
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-center text-gray-500">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border p-6 rounded-lg space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{order.customer_name}</h3>
                    <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-600">Email: {order.customer_email}</p>
                    <p className="text-sm text-gray-600">Phone: {order.customer_phone}</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium">Print Details</p>
                        <p className="text-sm text-gray-600">Pages: {order.pages}</p>
                        <p className="text-sm text-gray-600">Copies: {order.copies}</p>
                        <p className="text-sm text-gray-600">Paper: {order.gsm}gsm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Service Details</p>
                        <p className="text-sm text-gray-600">Type: {order.print_type}</p>
                        <p className="text-sm text-gray-600">Sides: {order.print_sides}</p>
                        <p className="text-sm text-gray-600">Delivery: {order.delivery_type}</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-primary mt-2">
                      Total Amount: ₹{order.amount}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: <span className="capitalize">{order.payment_status}</span>
                    </p>
                  </div>
                  <Button
                    onClick={() => handleSendWhatsAppConfirmation(order)}
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                  >
                    Send WhatsApp Confirmation
                  </Button>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-center text-gray-500">No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;