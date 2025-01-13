import { format } from "date-fns";

interface OrderDateTimeProps {
  createdAt: string;
  orderId: string;
}

export const OrderDateTime = ({ createdAt, orderId }: OrderDateTimeProps) => {
  const formattedDate = createdAt 
    ? format(new Date(createdAt), 'PPpp')
    : 'Date not available';

  return (
    <div className="mb-4 text-sm text-gray-600">
      <p>Order ID: {orderId}</p>
      <p>Created: {formattedDate}</p>
    </div>
  );
};