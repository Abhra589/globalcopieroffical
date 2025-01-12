import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

interface AuthFormProps {
  isAdmin?: boolean;
}

export const AuthForm = ({ isAdmin = false }: AuthFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
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
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [isAdmin]);

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

  return (
    <div className="w-full">
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: 'default',
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
    </div>
  );
};