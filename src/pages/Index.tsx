import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Navbar } from "@/components/Navbar";
import { PricingCalculator } from "@/components/PricingCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <PricingCalculator />
        </div>
      </div>
    </div>
  );
};

export default Index;