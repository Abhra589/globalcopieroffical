import React from 'react';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { sendWhatsAppMessage } from '../pricing/WhatsAppService';

interface OrderActionsProps {
  customerPhone: string;
  orderId: string;
  onDelete: () => void;
}

export const OrderActions = ({ customerPhone, orderId, onDelete }: OrderActionsProps) => {
  const handleWhatsAppClick = () => {
    const message = `Hello! This is regarding your order ${orderId}. How may we assist you today?`;
    sendWhatsAppMessage(message, customerPhone);
  };

  return (
    <div className="flex flex-col gap-2 w-full md:w-auto">
      <Button
        onClick={handleWhatsAppClick}
        className="w-full md:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white"
      >
        Send WhatsApp Update
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="w-full md:w-auto"
          >
            Delete Order
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the order
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};