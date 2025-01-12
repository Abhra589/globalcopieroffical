import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { UserCircle2, Shield } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger animation on mount
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/order");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/order");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLoginChoice = (adminChoice: boolean) => {
    setIsAdmin(adminChoice);
    setShowAuthForm(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary p-4">
      <div className="w-full max-w-md">
        {!showAuthForm ? (
          <div className="space-y-6 text-center">
            <h1 
              className={`text-3xl font-bold text-white mb-8 transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Welcome to GlobalCopier
            </h1>
            <div 
              className={`space-y-4 transition-all duration-700 delay-200 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Button
                onClick={() => handleLoginChoice(false)}
                variant="outline"
                size="lg"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all duration-300 hover:scale-105"
              >
                <UserCircle2 className="mr-2" />
                Login as Customer
              </Button>
              <Button
                onClick={() => handleLoginChoice(true)}
                variant="outline"
                size="lg"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all duration-300 hover:scale-105"
              >
                <Shield className="mr-2" />
                Login as Admin
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className={`transition-all duration-500 transform ${
              showAuthForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                {isAdmin ? 'Admin Login' : 'Customer Login'}
              </h2>
              <AuthForm isAdmin={isAdmin} />
              <Button
                onClick={() => setShowAuthForm(false)}
                variant="ghost"
                className="mt-4 w-full text-gray-600 hover:text-gray-800"
              >
                Back to Selection
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;