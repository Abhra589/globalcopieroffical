import { Button } from "@/components/ui/button";
import { WhatsAppNotificationService } from "@/services/whatsapp/WhatsAppNotificationService";

interface WhatsAppButtonProps {
  customerPhone: string;
  orderId: string;
}

export const WhatsAppButton = ({ customerPhone, orderId }: WhatsAppButtonProps) => {
  const handleWhatsAppClick = async () => {
    const message = `Hello! This is regarding your order ${orderId}. How may we assist you today?`;
    await WhatsAppNotificationService.sendOrderUpdate(message, customerPhone);
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="w-full md:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white"
    >
      Send WhatsApp Update
    </Button>
  );
};