import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/22349649-e79d-4981-988f-12f058600d58.png" 
              alt="GlobalCopier Logo" 
              className="h-8 md:h-12 w-auto"
            />
          </Link>
          
          <Button 
            variant="ghost" 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="hidden lg:flex space-x-4">
            <Button variant="ghost" className="text-white hover:text-secondary">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:text-secondary">
              <Link to="/order">Place Order</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:text-secondary">
              <Link to="/admin">Admin</Link>
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2 animate-fade-in">
            <Button variant="ghost" className="text-white hover:text-secondary w-full text-left justify-start">
              <Link to="/" className="w-full">Home</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:text-secondary w-full text-left justify-start">
              <Link to="/order" className="w-full">Place Order</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:text-secondary w-full text-left justify-start">
              <Link to="/admin" className="w-full">Admin</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};