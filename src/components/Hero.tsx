import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-20 relative overflow-hidden">
      <div className="container mx-auto text-center text-white">
        <h1 
          className={`text-5xl font-bold mb-6 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Professional Bulk Printing Solutions
        </h1>
        <p 
          className={`text-xl mb-8 transition-all duration-700 delay-200 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Serving large organizations across India with quality and reliability
        </p>
        
        <div 
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <p className="text-lg font-medium hover:opacity-100 transition-all duration-500 ease-in-out transform hover:-translate-x-4">
            Color printing
          </p>
        </div>
        
        <div 
          className={`absolute right-0 bottom-0 mb-4 mr-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <p className="text-lg font-medium hover:opacity-100 transition-all duration-500 ease-in-out transform hover:translate-y-2">
            Black & white printing
          </p>
        </div>

        <Button 
          asChild 
          className={`bg-white text-primary hover:bg-gray-100 transition-all duration-700 delay-600 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link to="/order">Place Bulk Order</Link>
        </Button>
      </div>
    </div>
  );
};