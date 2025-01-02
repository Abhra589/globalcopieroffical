import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingCalculator } from "@/components/PricingCalculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <PricingCalculator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;