import { supabase } from "@/integrations/supabase/client";

export async function sendWhatsAppNotification(to: string, message: string) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('No session found');

    const response = await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ to, message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send WhatsApp notification');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    throw error;
  }
}

export function createOrderEnquiryMessage(orderDetails: {
  pageCount: number;
  copies: number;
  selectedGsm: string;
  selectedType: string;
  selectedSides: string;
  deliveryType: string;
  total: number;
  fileUrl: string;
}) {
  return `Hi, I would like to enquire about placing an order:\n` +
    `Pages: ${orderDetails.pageCount}\n` +
    `Copies: ${orderDetails.copies}\n` +
    `Paper: ${orderDetails.selectedGsm}gsm\n` +
    `Type: ${orderDetails.selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
    `Sides: ${orderDetails.selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
    `Delivery: ${orderDetails.deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n` +
    `Total Amount: ₹${orderDetails.total.toFixed(2)}` +
    (orderDetails.fileUrl ? `\nFile URL: ${orderDetails.fileUrl}` : '');
}

export function createPaymentMessage(customerName: string, amount: number) {
  return `Dear ${customerName},\n` +
    `Please pay ₹${amount.toFixed(2)} using the payment details provided and click ` +
    `"Click Here If Payment is Done" on the payment page to confirm your order at GlobalCopier.`;
}