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
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm min-w-[60px]">Email:</span>
          <span className="text-sm text-gray-600">{customerEmail || 'Not provided'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm min-w-[60px]">Phone:</span>
          <span className="text-sm text-gray-600">{customerPhone || 'Not provided'}</span>
        </div>
        {organization && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm min-w-[60px]">Org:</span>
            <span className="text-sm text-gray-600">{organization}</span>
          </div>
        )}
      </div>
    </div>
  );
};