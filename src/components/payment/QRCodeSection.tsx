import React from 'react';
import { QRCode } from 'qrcode.react';

interface QRCodeSectionProps {
  upiLink: string;
}

const QRCodeSection = ({ upiLink }: QRCodeSectionProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Scan QR Code to Pay</h2>
      <div className="p-4 bg-white rounded-lg">
        <QRCode value={upiLink} size={200} />
      </div>
    </div>
  );
};

export default QRCodeSection;