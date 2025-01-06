import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-20 relative overflow-hidden">
      <div className="container mx-auto text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Professional Bulk Printing Solutions</h1>
        <p className="text-xl mb-8">Serving large organizations across India with quality and reliability</p>
        
        {/* Animated text elements */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <p className="text-lg font-medium opacity-0 hover:opacity-100 transition-all duration-500 ease-in-out transform hover:-translate-x-4 animate-fade-in">
            Color printing
          </p>
        </div>
        
        <div className="absolute right-0 bottom-0 mb-4 mr-4">
          <p className="text-lg font-medium opacity-0 hover:opacity-100 transition-all duration-500 ease-in-out transform hover:translate-y-2 animate-fade-in delay-300">
            Black & white printing
          </p>
        </div>

        <Button asChild className="bg-white text-primary hover:bg-gray-100">
          <Link to="/order">Place Bulk Order</Link>
        </Button>
      </div>
    </div>
  );
};