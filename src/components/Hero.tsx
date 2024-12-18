import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-20">
      <div className="container mx-auto text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Professional Bulk Printing Solutions</h1>
        <p className="text-xl mb-8">Serving large organizations across India with quality and reliability</p>
        <Button asChild className="bg-white text-primary hover:bg-gray-100">
          <Link to="/order">Place Bulk Order</Link>
        </Button>
      </div>
    </div>
  );
};