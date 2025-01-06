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
  if (!street && !city && !state && !pincode) {
    return (
      <div className="mt-2">
        <p className="text-sm font-medium">Delivery Address:</p>
        <p className="text-sm text-gray-600">No address provided</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <p className="text-sm font-medium">Delivery Address:</p>
      <p className="text-sm text-gray-600">{street}</p>
      <p className="text-sm text-gray-600">
        {city && state ? `${city}, ${state}` : city || state} {pincode}
      </p>
    </div>
  );
};