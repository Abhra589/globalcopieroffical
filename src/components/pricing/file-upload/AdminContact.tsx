import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";
import { sendWhatsAppMessage } from "../WhatsAppService";

export const AdminContact = () => {
  const handleAdminWhatsApp = () => {
    const message = "Hello, I have a large file order to discuss.";
    sendWhatsAppMessage(message, "918777060249");
  };

  const handleAdminEmail = () => {
    window.location.href = "mailto:globalcopierkly@gmail.com?subject=Large File Order&body=Hello, I have a large file order to discuss.";
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAdminWhatsApp}
        className="flex items-center gap-2"
      >
        <MessageSquare className="w-4 h-4" />
        Contact via WhatsApp
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAdminEmail}
        className="flex items-center gap-2"
      >
        <Mail className="w-4 h-4" />
        Contact via Email
      </Button>
    </div>
  );
};