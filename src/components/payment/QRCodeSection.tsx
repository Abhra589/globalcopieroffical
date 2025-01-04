import React from 'react';

interface QRCodeSectionProps {
  upiLink: string;
}

const QRCodeSection = ({ upiLink }: QRCodeSectionProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Scan QR Code to Pay</h2>
      <div className="p-4 bg-white rounded-lg">
        <img 
          src="/lovable-uploads/e326d847-5bce-4ce1-87dd-44906c3a5ef6.png" 
          alt="Payment QR Code"
          width={200}
          height={200}
          className="w-[200px] h-[200px]"
        />
      </div>
    </div>
  );
};

export default QRCodeSection;