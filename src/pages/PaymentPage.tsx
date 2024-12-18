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
          <h1 className="text-3xl font-bold mb-6">Complete Payment</h1>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <p>Pages: {orderDetails.pages}</p>
              <p>Copies: {orderDetails.copies}</p>
              <p>Courier Charge: ₹{orderDetails.courierCharge}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">Scan QR Code to Pay</p>
              {/* Replace with actual QR code image */}
              <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                <p className="text-gray-500">QR Code Placeholder</p>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                After payment, our team will verify and process your order
              </p>
              <Button
                onClick={() => navigate("/order-confirmation")}
                className="w-full"
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