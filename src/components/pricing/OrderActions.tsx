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
  pickupDate?: string;
  pickupTime?: string;
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

  const handleAdminWhatsApp = () => {
    const message = "Hello, I have a large file order to discuss.";
    sendWhatsAppMessage(message, "918777060249");
  };

  const handleAdminEmail = () => {
    window.location.href = "mailto:globalcopierkly@gmail.com?subject=Large File Order&body=Hello, I have a large file order to discuss.";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleWhatsAppEnquiry}
          type="button"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white animate-scale-in w-full sm:w-auto"
        >
          Enquire on WhatsApp
        </Button>
        <Button
          onClick={handleProceedToPayment}
          type="button"
          className="bg-primary hover:bg-primary/90 text-white animate-scale-in w-full sm:w-auto"
          disabled={!pageCount}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};