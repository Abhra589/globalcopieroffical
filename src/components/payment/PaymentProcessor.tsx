import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppNotificationService } from '@/services/whatsapp/WhatsAppNotificationService';
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
    
    try {
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
          pickup_date: pickupDate,
          pickup_time: pickupTime
        });
        finalOrderId = newOrder.id;
      } else if (orderId) {
        await PaymentService.updatePaymentStatus(orderId);
      }

      if (customerPhone && amount && finalOrderId) {
        await WhatsAppNotificationService.sendOrderConfirmation(finalOrderId, amount, customerPhone);
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