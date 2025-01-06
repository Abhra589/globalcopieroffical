import { WhatsAppButton } from "./WhatsAppButton";
import { DeleteOrderButton } from "./DeleteOrderButton";

interface OrderActionsProps {
  customerPhone: string;
  orderId: string;
  onDelete: () => void;
}

export const OrderActions = ({ customerPhone, orderId, onDelete }: OrderActionsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-auto">
      <WhatsAppButton customerPhone={customerPhone} orderId={orderId} />
      <DeleteOrderButton onDelete={onDelete} />
    </div>
  );
};