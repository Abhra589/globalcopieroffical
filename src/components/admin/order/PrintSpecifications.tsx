import React from 'react';

interface PrintSpecificationsProps {
  pages: number;
  copies: number;
  gsm: string;
  printType: string;
  printSides: string;
}

export const PrintSpecifications = ({
  pages,
  copies,
  gsm,
  printType,
  printSides,
}: PrintSpecificationsProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Print Specifications</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>Pages: {pages}</li>
        <li>Copies: {copies}</li>
        <li>Paper: {gsm}gsm</li>
        <li>Type: {printType === 'bw' ? 'Black & White' : 'Color'}</li>
        <li>Sides: {printSides === 'single' ? 'Single side' : 'Both sides'}</li>
      </ul>
    </div>
  );
};