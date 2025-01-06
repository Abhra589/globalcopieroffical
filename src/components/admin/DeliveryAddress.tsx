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
      <div className="mt-4">
        <p className="text-sm font-medium mb-1">Delivery Address</p>
        <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded-md">
          No address provided
        </div>
      </div>
    );
  }

  const addressParts = [street, city, state, pincode].filter(Boolean);
  const formattedAddress = addressParts.join(', ');

  return (
    <div className="mt-4">
      <p className="text-sm font-medium mb-1">Delivery Address</p>
      <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
        {formattedAddress}
      </div>
    </div>
  );
};