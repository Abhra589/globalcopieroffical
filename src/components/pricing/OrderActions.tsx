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
  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
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
    sendWhatsAppMessage(message);
  };

  const handleProceedToPayment = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    onProceedToPayment();
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={handleWhatsAppEnquiry}
        type="button" // Prevent form submission
        className="bg-[#25D366] hover:bg-[#128C7E] text-white animate-scale-in flex-1"
      >
        Enquire on WhatsApp
      </Button>
      <Button
        onClick={handleProceedToPayment}
        type="button" // Prevent form submission
        className="bg-primary hover:bg-primary/90 text-white animate-scale-in flex-1"
        disabled={!pageCount}
      >
        Proceed to Payment
      </Button>
    </div>
  );
};