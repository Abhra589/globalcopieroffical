import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .single();

        if (profile?.is_admin) {
          navigate('/admin');
        }
      }
    };

    checkSession();
  }, [navigate]);

  // Handle auth state changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN") {
      console.log("Signed in:", session);
      
      // Check if the user is an admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .single();

      if (profile?.is_admin) {
        navigate('/admin');
      } else {
        setError("You don't have admin privileges");
        await supabase.auth.signOut();
      }
    } else if (event === "SIGNED_OUT") {
      console.log("Signed out");
      setError(null);
    }
  });

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Auth
        supabaseClient={supabase}
        appearance={{ 
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#2563eb',
                brandAccent: '#1d4ed8',
              },
            },
          },
        }}
        providers={[]}
        redirectTo={`${window.location.origin}/admin`}
      />
    </div>
  );
};