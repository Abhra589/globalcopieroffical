interface OrderDetails {
  pageCount: number;
  copies: number;
  selectedGsm: string;
  selectedType: string;
  selectedSides: string;
  deliveryType: string;
  pickupDate?: string;
  pickupTime?: string;
  total: number;
  fileUrl: string;
}

export const createOrderEnquiryMessage = ({
  pageCount,
  copies,
  selectedGsm,
  selectedType,
  selectedSides,
  deliveryType,
  pickupDate,
  pickupTime,
  total,
  fileUrl,
}: OrderDetails): string => {
  const message = 
`🖨️ *New Print Order Enquiry*

📄 *Document Details:*
• Pages: ${pageCount}
• Copies: ${copies}
• Paper: ${selectedGsm} GSM
• Print: ${selectedType === 'bw' ? 'Black & White' : 'Color'}
• Sides: ${selectedSides === 'single' ? 'Single Side' : 'Both Sides'}

🚚 *Delivery Method:* ${deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}${
  deliveryType === 'pickup' 
    ? `\n\n📅 *Pickup Details:*\n• Date: ${pickupDate}\n• Time: ${pickupTime}` 
    : ''
}

💰 *Total Amount:* ₹${total}

🔗 *Document Link:* ${fileUrl}

Please confirm if you'd like to proceed with this order.`;

  return message.trim();
};