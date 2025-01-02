import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const order = localStorage.getItem("currentOrder");
    if (!order) {
      navigate("/order");
      return;
    }
    setOrderDetails(JSON.parse(order));
  }, [navigate]);

  const handlePhonePePayment = async () => {
    if (!orderDetails) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-phonepe-payment', {
        body: {
          orderId: orderDetails.orderId,
          amount: orderDetails.total
        }
      });

      if (error) throw error;

      if (data.success) {
        // Redirect to PhonePe payment page
        window.location.href = data.data.instrumentResponse.redirectInfo.url;
      } else {
        throw new Error(data.message || 'Payment initialization failed');
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initialize payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!orderDetails) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6 text-[#1A1F2C]">Complete Payment</h1>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-2 text-[#1A1F2C]">Order Summary</h2>
              <p>Pages: {orderDetails.pageCount}</p>
              <p>Copies: {orderDetails.copies}</p>
              <p className="text-xl font-bold mt-2">Total: ₹{orderDetails.total}</p>
            </div>
            <div className="text-center">
              <Button
                onClick={handlePhonePePayment}
                disabled={isLoading}
                className="w-full bg-[#5f259f] hover:bg-[#4a1d7a] text-white"
              >
                {isLoading ? "Processing..." : "Pay with PhonePe"}
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                You will be redirected to PhonePe's secure payment page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;