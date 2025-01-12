import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        handleAuthChange(session);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAdmin(false);
        setIsAuthenticated(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setIsAdmin(false);
        return;
      }
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        handleAuthChange(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthChange = async (session: any) => {
    try {
      setIsAuthenticated(!!session);
      
      if (!session) {
        setIsAdmin(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .single();

      if (error) throw error;
      setIsAdmin(profile?.is_admin || false);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAdmin(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

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

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-secondary">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:text-secondary">
              <Link to="/order">Place Order</Link>
            </Button>
            {isAdmin && (
              <Button variant="ghost" className="text-white hover:text-secondary">
                <Link to="/admin">Admin</Link>
              </Button>
            )}
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                className="text-white hover:text-secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button variant="ghost" className="text-white hover:text-secondary">
                <Link to="/login">Login</Link>
              </Button>
            )}
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
            {isAdmin && (
              <Button variant="ghost" className="text-white hover:text-secondary w-full text-left justify-start">
                <Link to="/admin" className="w-full">Admin</Link>
              </Button>
            )}
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                className="text-white hover:text-secondary w-full text-left justify-start"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button variant="ghost" className="text-white hover:text-secondary w-full text-left justify-start">
                <Link to="/login" className="w-full">Login</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};