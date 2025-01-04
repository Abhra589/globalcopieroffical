import React from 'react';

interface OrderDetailsProps {
  pages: number;
  copies: number;
  gsm: string;
  printType: string;
  printSides: string;
  deliveryType: string;
}

export const OrderDetails = ({
  pages,
  copies,
  gsm,
  printType,
  printSides,
  deliveryType,
}: OrderDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      <div>
        <p className="text-sm font-medium">Print Details</p>
        <p className="text-sm text-gray-600">Pages: {pages}</p>
        <p className="text-sm text-gray-600">Copies: {copies}</p>
        <p className="text-sm text-gray-600">Paper: {gsm}gsm</p>
      </div>
      <div>
        <p className="text-sm font-medium">Service Details</p>
        <p className="text-sm text-gray-600">
          Type: {printType === 'bw' ? 'Black & White' : 'Color'}
        </p>
        <p className="text-sm text-gray-600">
          Sides: {printSides === 'single' ? 'Single side' : 'Both sides'}
        </p>
        <p className="text-sm text-gray-600">
          Delivery: {deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
        </p>
      </div>
    </div>
  );
};