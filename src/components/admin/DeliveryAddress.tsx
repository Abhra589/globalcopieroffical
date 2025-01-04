import React from 'react';

interface DeliveryAddressProps {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export const DeliveryAddress = ({
  street,
  city,
  state,
  pincode,
}: DeliveryAddressProps) => {
  return (
    <div className="mt-2">
      <p className="text-sm font-medium">Delivery Address:</p>
      <p className="text-sm text-gray-600">{street}</p>
      <p className="text-sm text-gray-600">
        {city}, {state} {pincode}
      </p>
    </div>
  );
};