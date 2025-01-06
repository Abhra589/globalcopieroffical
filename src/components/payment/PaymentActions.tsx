import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppNotificationService } from '@/services/whatsapp/WhatsAppNotificationService';
import { PaymentConfirmationDialog } from './PaymentConfirmationDialog';
import { PaymentService } from '@/services/payment/PaymentService';

interface PaymentActionsProps {
  upiLink: string;
}

const PaymentActions = ({ upiLink }: PaymentActionsProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);

  const handlePaymentDone = async () => {
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

      setShowConfirmation(true);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate('/');
            return 0;
          }
          const newCount = prev - 1;
          setProgress((5 - newCount) * 20);
          return newCount;
        });
      }, 1000);

    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUPIClick = () => {
    window.location.href = upiLink;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Button 
        onClick={handleUPIClick}
        className="w-full"
        variant="default"
      >
        Pay with UPI
      </Button>
      
      <Button 
        onClick={handlePaymentDone}
        className="w-full"
        variant="outline"
      >
        Click here if payment is done
      </Button>

      <PaymentConfirmationDialog
        showConfirmation={showConfirmation}
        countdown={countdown}
        progress={progress}
      />
    </div>
  );
};

export default PaymentActions;