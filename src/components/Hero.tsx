import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto text-center text-white relative px-4">
        <h1 
          className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Professional Bulk Printing Solutions
        </h1>
        <p 
          className={`text-lg md:text-xl mb-6 md:mb-8 transition-all duration-700 delay-200 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Serving large organizations across India with quality and reliability
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <Button 
            asChild 
            variant="outline"
            className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            <Link to="/order?type=color">Color Printing</Link>
          </Button>

          <Button 
            asChild 
            className="w-full md:w-auto bg-white text-primary hover:bg-gray-100"
          >
            <Link to="/order">Place Bulk Order</Link>
          </Button>

          <Button 
            asChild 
            variant="outline"
            className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            <Link to="/order?type=bw">Black & White Printing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};