export const sendWhatsAppMessage = (message: string, phoneNumber: string = "918777060249") => {
  // Clean the phone number to ensure it's in the correct format
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  // Add country code if not present
  const formattedNumber = cleanedNumber.startsWith('91') ? cleanedNumber : `91${cleanedNumber}`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
};

export const createOrderMessage = (
  pageCount: number,
  copies: number,
  selectedGsm: string,
  selectedType: string,
  selectedSides: string,
  deliveryType: string,
  total: number,
  fileUrl?: string
) => {
  return `Hi, I would like to place an order:\n` +
    `Pages: ${pageCount}\n` +
    `Copies: ${copies}\n` +
    `Paper: ${selectedGsm}gsm\n` +
    `Type: ${selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
    `Sides: ${selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
    `Delivery: ${deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n` +
    `Total Amount: ₹${total.toFixed(2)}` +
    (fileUrl ? `\nFile URL: ${fileUrl}` : '');
};

export const createAdminMessage = (
  pageCount: number,
  copies: number,
  selectedGsm: string,
  selectedType: string,
  selectedSides: string,
  deliveryType: string,
  total: number,
  fileUrl?: string
) => {
  return `New order received:\n` +
    `Pages: ${pageCount}\n` +
    `Copies: ${copies}\n` +
    `Paper: ${selectedGsm}gsm\n` +
    `Type: ${selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
    `Sides: ${selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
    `Delivery: ${deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n` +
    `Total Amount: ₹${total.toFixed(2)}\n` +
    `Status: Pending Payment` +
    (fileUrl ? `\nFile URL: ${fileUrl}` : '');
};