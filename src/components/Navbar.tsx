import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-primary py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          GlobalCopier
        </Link>
        <div className="space-x-4">
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
    </nav>
  );
};