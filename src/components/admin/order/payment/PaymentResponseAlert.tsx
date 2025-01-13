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
    <Alert className={`${customerPaymentResponse.includes('has paid') ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'}`}>
      <AlertCircle className={`h-4 w-4 ${customerPaymentResponse.includes('has paid') ? 'text-blue-600' : 'text-yellow-600'}`} />
      <AlertDescription className={`text-sm font-medium ml-2 ${customerPaymentResponse.includes('has paid') ? 'text-blue-700' : 'text-yellow-700'}`}>
        {customerPaymentResponse}
      </AlertDescription>
    </Alert>
  );
};