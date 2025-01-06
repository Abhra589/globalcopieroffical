import React from 'react';

interface DeliveryAddressProps {
  street: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
}

export const DeliveryAddress = ({
  street,
  city,
  state,
  pincode,
}: DeliveryAddressProps) => {
  const hasAddress = Boolean(street || city || state || pincode);

  if (!hasAddress) {
    return (
      <div className="mt-2">
        <p className="text-sm font-medium">Delivery Address:</p>
        <p className="text-sm text-gray-600">No address provided</p>
      </div>
    );
  }

  return (
    <div className="mt-2 animate-fade-in">
      <p className="text-sm font-medium">Delivery Address:</p>
      {street && <p className="text-sm text-gray-600">{street}</p>}
      <p className="text-sm text-gray-600">
        {[city, state, pincode].filter(Boolean).join(', ')}
      </p>
    </div>
  );
};