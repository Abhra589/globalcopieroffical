import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PaymentResponseAlertProps {
  customerPaymentResponse: string;
  show: boolean;
}

export const PaymentResponseAlert = ({ 
  customerPaymentResponse,
  show 
}: PaymentResponseAlertProps) => {
  if (!show) return null;

  console.log('Payment Response Alert:', {
    customerPaymentResponse,
    show
  });
  
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm text-blue-700 font-medium ml-2">
        {customerPaymentResponse}
      </AlertDescription>
    </Alert>
  );
};