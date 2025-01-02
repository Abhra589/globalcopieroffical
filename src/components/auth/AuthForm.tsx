import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

export const AuthForm = () => {
  const [error, setError] = useState<string | null>(null);

  // Handle auth state changes to catch and display errors
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      console.log("Signed in:", session);
      setError(null);
    } else if (event === "SIGNED_OUT") {
      console.log("Signed out");
      setError(null);
    } else if (event === "USER_UPDATED") {
      console.log("User updated:", session);
      setError(null);
    } else if (event === "USER_DELETED") {
      console.log("User deleted");
      setError(null);
    } else if (event === "PASSWORD_RECOVERY") {
      console.log("Password recovery requested");
      setError(null);
    }
  });

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome</h2>
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
        redirectTo={`${window.location.origin}/order`}
        onError={(error) => {
          console.error("Auth error:", error);
          setError(error.message);
        }}
      />
    </div>
  );
};