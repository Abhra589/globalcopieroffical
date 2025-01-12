import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  isAdmin?: boolean;
}

export const AuthForm = ({ isAdmin = false }: AuthFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If not admin, redirect to order page
    if (!isAdmin) {
      navigate('/order');
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && isAdmin) {
        // Check if the user is actually an admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .single();

        if (!profile?.is_admin) {
          // If not admin, sign them out
          await supabase.auth.signOut();
          setErrorMessage("This account doesn't have admin privileges.");
        } else {
          // If admin, redirect to admin page
          navigate('/admin');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [isAdmin, navigate]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case 'invalid_credentials':
          return 'Invalid email or password. Please check your credentials and try again.';
        case 'email_not_confirmed':
          return 'Please verify your email address before signing in.';
        case 'user_not_found':
          return 'No user found with these credentials.';
        case 'invalid_grant':
          return 'Invalid login credentials.';
        default:
          return error.message;
      }
    }
    return error.message;
  };

  // Only render the Auth UI for admin login
  return (
    <div className="w-full">
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      {isAdmin && (
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#004d40',
                  brandAccent: '#00796b',
                },
              },
            },
          }}
          providers={[]}
        />
      )}
    </div>
  );
};