import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeSectionProps {
  amount: number;
}

const QRCodeSection = ({ amount }: QRCodeSectionProps) => {
  const upiUrl = `upi://pay?pa=9831162681-2@axl&pn=GlobalCopier&am=${amount}&cu=INR`;
  
  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Scan QR Code to Pay ₹{amount.toFixed(2)}</h2>
      <div className="p-4 bg-white rounded-lg">
        <QRCodeSVG 
          value={upiUrl}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>
      <p className="text-sm text-gray-500">Scan this QR code with any UPI app to make the payment</p>
      <p className="text-sm font-medium">UPI ID: 9831162681-2@axl</p>
    </div>
  );
};

export default QRCodeSection;