import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface OrderActionsProps {
  pageCount: number;
  onWhatsAppRedirect: () => void;
  onProceedToPayment: () => void;
}

export const OrderActions = ({ pageCount, onWhatsAppRedirect, onProceedToPayment }: OrderActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button
        onClick={onWhatsAppRedirect}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white animate-scale-in flex-1"
        disabled={!pageCount}
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