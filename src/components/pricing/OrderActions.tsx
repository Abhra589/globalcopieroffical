import React from 'react';
import { Button } from "@/components/ui/button";
import { sendWhatsAppMessage, createOrderMessage } from './WhatsAppService';

interface OrderActionsProps {
  pageCount: number;
  copies: number;
  selectedGsm: string;
  selectedType: string;
  selectedSides: string;
  deliveryType: string;
  total: number;
  fileUrl: string;
  onProceedToPayment: () => void;
}

export const OrderActions = ({ 
  pageCount,
  copies,
  selectedGsm,
  selectedType,
  selectedSides,
  deliveryType,
  total,
  fileUrl,
  onProceedToPayment
}: OrderActionsProps) => {
  const handleWhatsAppEnquiry = () => {
    const message = createOrderMessage(
      pageCount,
      copies,
      selectedGsm,
      selectedType,
      selectedSides,
      deliveryType,
      total,
      fileUrl
    );
    // Only send WhatsApp message, don't proceed to payment
    sendWhatsAppMessage(message);
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={handleWhatsAppEnquiry}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white animate-scale-in flex-1"
      >
        Enquire on WhatsApp
      </Button>
      <Button
        onClick={onProceedToPayment}
        className="bg-primary hover:bg-primary/90 text-white animate-scale-in flex-1"
        disabled={!pageCount}
      >
        Proceed to Payment
      </Button>
    </div>
  );
};