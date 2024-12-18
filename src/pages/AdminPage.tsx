import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AdminPage = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from a backend
    const currentOrder = localStorage.getItem("currentOrder");
    if (currentOrder) {
      setOrders([JSON.parse(currentOrder)]);
    }
  }, []);

  const handlePaymentReceived = (orderId: string) => {
    // In a real app, this would update the backend and trigger notifications
    toast({
      title: "Success",
      description: "Payment marked as received. Notifications sent to customer.",
    });
    
    // Update local storage for demo
    const updatedOrders = orders.map(order => 
      order.orderId === orderId ? { ...order, status: "paid" } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="border p-4 rounded-lg space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Order ID: {order.orderId}</p>
                    <p>Organization: {order.organization}</p>
                    <p>Pages: {order.pages}</p>
                    <p>Copies: {order.copies}</p>
                    <p>Status: {order.status}</p>
                  </div>
                  <Button
                    onClick={() => handlePaymentReceived(order.orderId)}
                    disabled={order.status === "paid"}
                  >
                    Mark Payment Received
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