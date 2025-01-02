import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createAdminMessage, sendWhatsAppMessage } from "@/components/pricing/WhatsAppService";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";

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
  const navigate = useNavigate();
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    checkAdminStatus();
    fetchOrders();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (!profile?.is_admin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
    }
  };

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const handleSendWhatsAppConfirmation = (order: Order) => {
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

      // Use the WhatsApp service to send the message
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="hover:bg-red-50 hover:text-red-600"
            >
              Logout
            </Button>
          </div>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border p-6 rounded-lg space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-grow">
                    <h3 className="font-semibold text-lg">{order.customer_name}</h3>
                    <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {order.customer_email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {order.customer_phone}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium">Print Details</p>
                        <p className="text-sm text-gray-600">Pages: {order.pages}</p>
                        <p className="text-sm text-gray-600">Copies: {order.copies}</p>
                        <p className="text-sm text-gray-600">Paper: {order.gsm}gsm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Service Details</p>
                        <p className="text-sm text-gray-600">
                          Type: {order.print_type === 'bw' ? 'Black & White' : 'Color'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Sides: {order.print_sides === 'single' ? 'Single side' : 'Both sides'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Delivery: {order.delivery_type === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
                        </p>
                      </div>
                    </div>
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
                  <div className="ml-4">
                    <Button
                      onClick={() => handleSendWhatsAppConfirmation(order)}
                      className="bg-[#25D366] hover:bg-[#128C7E] text-white whitespace-nowrap"
                    >
                      Send WhatsApp
                    </Button>
                  </div>
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