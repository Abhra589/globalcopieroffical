import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/22349649-e79d-4981-988f-12f058600d58.png" 
              alt="GlobalCopier Logo" 
              className="h-12 w-auto"
            />
          </Link>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop navigation */}
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

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            <Button variant="ghost" className="text-white hover:text-secondary w-full text-left">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:text-secondary w-full text-left">
              <Link to="/order">Place Order</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:text-secondary w-full text-left">
              <Link to="/admin">Admin</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};