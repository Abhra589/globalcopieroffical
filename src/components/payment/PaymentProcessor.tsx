import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { PaymentService } from '@/services/payment/PaymentService';

export const usePaymentProcessor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const processPayment = async () => {
    const orderId = searchParams.get("orderId");
    const customerPhone = searchParams.get("customerPhone");
    const customerName = searchParams.get("customerName");
    const customerEmail = searchParams.get("customerEmail");
    const amount = searchParams.get("amount");
    const pages = searchParams.get("pages");
    const copies = searchParams.get("copies");
    const printType = searchParams.get("printType");
    const deliveryType = searchParams.get("deliveryType");
    const gsm = searchParams.get("gsm") || "70";
    const printSides = searchParams.get("printSides") || "single";
    const fileUrl = searchParams.get("fileUrl") || "";
    const filePath = searchParams.get("filePath") || "";
    const pickupDate = searchParams.get("pickupDate");
    const pickupTime = searchParams.get("pickupTime");
    const street = searchParams.get("street");
    const city = searchParams.get("city");
    const state = searchParams.get("state");
    const pincode = searchParams.get("pincode");
    
    try {
      console.log('Processing payment with data:', {
        orderId,
        customerPhone,
        customerName,
        customerEmail,
        amount,
        pages,
        copies,
        printType,
        deliveryType,
        fileUrl,
        filePath,
        street,
        city,
        state,
        pincode
      });

      let finalOrderId = orderId;

      if (orderId === 'new') {
        const newOrder = await PaymentService.createNewOrder({
          pages: Number(pages),
          copies: Number(copies),
          print_type: printType || '',
          delivery_type: deliveryType || '',
          amount: Number(amount),
          customer_phone: customerPhone || '',
          customer_name: customerName || '',
          customer_email: customerEmail || '',
          gsm,
          print_sides: printSides,
          file_path: filePath,
          file_url: fileUrl,
          street: street || undefined,
          city: city || undefined,
          state: state || undefined,
          pincode: pincode || undefined,
          pickup_date: pickupDate,
          pickup_time: pickupTime,
          payment_status: 'Payment Pending'
        });
        console.log('New order created:', newOrder);
        finalOrderId = newOrder.id;
      }

      return { success: true, orderId: finalOrderId };
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  return { processPayment };
};