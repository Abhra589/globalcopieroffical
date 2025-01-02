import { Navbar } from "@/components/Navbar";
import { OrderForm } from "@/components/pricing/OrderForm";
import { OrderWorkflow } from "@/components/OrderWorkflow";
import { Footer } from "@/components/Footer";

const OrderPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 space-y-8">
        <OrderWorkflow />
        <OrderForm />
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;