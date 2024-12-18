import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const order = localStorage.getItem("currentOrder");
    if (!order) {
      navigate("/order");
      return;
    }
    setOrderDetails(JSON.parse(order));
  }, [navigate]);

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
              <p>Pages: {orderDetails.pages}</p>
              <p>Copies: {orderDetails.copies}</p>
              <p>Courier Charge: ₹{orderDetails.courierCharge}</p>
              <p className="text-xl font-bold mt-2">Total: ₹{orderDetails.total}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">Scan QR Code to Pay</p>
              <img 
                src="/lovable-uploads/e84eef7f-372e-4d25-8662-a19ca94ea777.png"
                alt="Payment QR Code"
                className="w-48 h-48 mx-auto mb-4"
              />
              <p className="text-sm text-gray-600 mb-4">
                After payment, our team will verify and process your order
              </p>
              <Button
                onClick={() => navigate("/order-confirmation")}
                className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
              >
                I have completed the payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;