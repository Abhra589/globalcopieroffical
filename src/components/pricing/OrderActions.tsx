import React from 'react';
import { Button } from "@/components/ui/button";
import { createOrderEnquiryMessage } from '@/services/whatsapp';
import { sendWhatsAppMessage } from './WhatsAppService';

interface OrderActionsProps {
  pageCount: number;
  copies: number;
  selectedGsm: string;
  selectedType: string;
  selectedSides: string;
  deliveryType: string;
  pickupDate?: string;  // Added this
  pickupTime?: string;  // Added this
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
  pickupDate,
  pickupTime,
  total,
  fileUrl,
  onProceedToPayment
}: OrderActionsProps) => {
  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = createOrderEnquiryMessage({
      pageCount,
      copies,
      selectedGsm,
      selectedType,
      selectedSides,
      deliveryType,
      pickupDate,
      pickupTime,
      total,
      fileUrl
    });
    sendWhatsAppMessage(message);
  };

  const handleProceedToPayment = (e: React.MouseEvent) => {
    e.preventDefault();
    onProceedToPayment();
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={handleWhatsAppEnquiry}
        type="button"
        className="bg-[#25D366] hover:bg-[#128C7E] text-white animate-scale-in flex-1"
      >
        Enquire on WhatsApp
      </Button>
      <Button
        onClick={handleProceedToPayment}
        type="button"
        className="bg-primary hover:bg-primary/90 text-white animate-scale-in flex-1"
        disabled={!pageCount}
      >
        Proceed to Payment
      </Button>
    </div>
  );
};