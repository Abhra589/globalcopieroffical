import React from 'react';

interface OrderHeaderProps {
  customerName: string;
  orderId: string;
  customerEmail: string;
  customerPhone: string;
  organization: string | null;
}

export const OrderHeader = ({
  customerName,
  orderId,
  customerEmail,
  customerPhone,
  organization,
}: OrderHeaderProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{customerName}</h3>
      <p className="text-sm text-gray-600">Order ID: {orderId}</p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Email:</span> {customerEmail}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Phone:</span> {customerPhone}
      </p>
      
      {organization && (
        <p className="text-sm text-gray-600">
          <span className="font-medium">Organization:</span> {organization}
        </p>
      )}
    </div>
  );
};