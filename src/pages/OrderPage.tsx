import { Navbar } from "@/components/Navbar";
import { OrderForm } from "@/components/pricing/OrderForm";
import { OrderWorkflow } from "@/components/OrderWorkflow";

const OrderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 space-y-8">
        <OrderWorkflow />
        <OrderForm />
      </div>
    </div>
  );
};

export default OrderPage;