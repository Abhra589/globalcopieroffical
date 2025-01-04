// Manual inquiry function using wa.me links
export const sendWhatsAppMessage = (message: string, phoneNumber: string = "918777060249") => {
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  const formattedNumber = cleanedNumber.startsWith('91') ? cleanedNumber : `91${cleanedNumber}`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
};

// Message templates
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
  return `Hi, I would like to enquire about placing an order:\n` +
    `Pages: ${pageCount}\n` +
    `Copies: ${copies}\n` +
    `Paper: ${selectedGsm}gsm\n` +
    `Type: ${selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
    `Sides: ${selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
    `Delivery: ${deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n` +
    `Total Amount: ₹${total.toFixed(2)}` +
    (fileUrl ? `\nFile URL: ${fileUrl}` : '');
};

export const createAdminNotification = (customerName: string, total: number) => {
  return `New order has been received!\nCustomer Name: ${customerName}\nTotal Amount: ₹${total.toFixed(2)}`;
};

export const createUserPaymentNotification = (total: number) => {
  return `Please complete the payment of ₹${total.toFixed(2)} to receive a confirmation message from our side.`;
};

// Automated WhatsApp API functions
export const sendAutomatedWhatsAppMessage = async (
  to: string,
  message: string
) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-whatsapp-message', {
      body: {
        to,
        message
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};