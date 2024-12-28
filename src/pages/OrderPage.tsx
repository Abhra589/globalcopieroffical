import { Navbar } from "@/components/Navbar";
import { OrderForm } from "@/components/pricing/OrderForm";

const OrderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <OrderForm />
      </div>
    </div>
  );
};

export default OrderPage;