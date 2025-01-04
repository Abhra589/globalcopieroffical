import React from 'react';

interface QRCodeSectionProps {
  amount: number;
}

const QRCodeSection = ({ amount }: QRCodeSectionProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Scan QR Code to Pay ₹{amount.toFixed(2)}</h2>
      <div className="p-4 bg-white rounded-lg">
        <img 
          src="/lovable-uploads/b35a9ef1-ebd2-41b8-9de0-90e6c224f2fd.png" 
          alt="Payment QR Code"
          width={200}
          height={200}
          className="w-[200px] h-[200px]"
        />
      </div>
      <p className="text-sm text-gray-500">Scan this QR code with any UPI app to make the payment</p>
    </div>
  );
};

export default QRCodeSection;