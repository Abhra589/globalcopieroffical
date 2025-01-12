import React from 'react';

interface OrderMetadataProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  organization?: string | null;
}

export const OrderMetadata = ({
  customerName,
  customerEmail,
  customerPhone,
  organization
}: OrderMetadataProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{customerName}</h3>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Email: {customerEmail}</p>
        <p>Phone: {customerPhone}</p>
        {organization && <p>Organization: {organization}</p>}
      </div>
    </div>
  );
};