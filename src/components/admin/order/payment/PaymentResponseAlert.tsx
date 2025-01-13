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
  
  const hasPaid = customerPaymentResponse === 'customer has paid the amount';
  
  return (
    <Alert className={`${hasPaid ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'}`}>
      <AlertCircle className={`h-4 w-4 ${hasPaid ? 'text-blue-600' : 'text-yellow-600'}`} />
      <AlertDescription className={`text-sm font-medium ml-2 ${hasPaid ? 'text-blue-700' : 'text-yellow-700'}`}>
        {customerPaymentResponse || 'customer has not paid the amount'}
      </AlertDescription>
    </Alert>
  );
};