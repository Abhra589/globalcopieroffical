import { WhatsAppBusinessService } from './WhatsAppBusinessService';

export class WhatsAppNotificationService {
  static async sendOrderConfirmation(orderId: string, amount: string, customerPhone: string) {
    try {
      // Send confirmation to admin silently
      await WhatsAppBusinessService.sendMessage({
        to: "918777060249", // Admin's number
        text: `New order received!\nOrder ID: ${orderId}\nAmount: ₹${amount}`,
        silent: true // This indicates no popup should be shown
      });

      // Send confirmation to user silently
      if (customerPhone) {
        await WhatsAppBusinessService.sendMessage({
          to: customerPhone,
          text: `Thank you for your order (ID: ${orderId})!\nAmount: ₹${amount}\nWe'll process your order shortly.`,
          silent: true
        });
      }
    } catch (error) {
      console.error('Error sending WhatsApp notifications:', error);
      throw error;
    }
  }

  static async sendOrderUpdate(message: string, customerPhone: string) {
    try {
      await WhatsAppBusinessService.sendMessage({
        to: customerPhone,
        text: message,
        silent: false // This will show popup as it's manual
      });
    } catch (error) {
      console.error('Error sending WhatsApp update:', error);
      throw error;
    }
  }

  static async sendPaymentReminder(orderId: string, amount: string, customerPhone: string) {
    try {
      await WhatsAppBusinessService.sendMessage({
        to: customerPhone,
        text: `Reminder: Your payment of ₹${amount} for order ${orderId} is pending. Please complete the payment to process your order.`,
        silent: true
      });
    } catch (error) {
      console.error('Error sending payment reminder:', error);
      throw error;
    }
  }

  static async sendNewOrderNotification(orderDetails: {
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    amount: number;
    pages: number;
    copies: number;
    printType: string;
    deliveryType: string;
    fileUrl?: string;
    pickupDate?: string;
    pickupTime?: string;
  }) {
    const pickupInfo = orderDetails.deliveryType === 'pickup' 
      ? `\n📅 Pickup Date: ${orderDetails.pickupDate}\n⏰ Pickup Time: ${orderDetails.pickupTime}`
      : '';

    const fileInfo = orderDetails.fileUrl 
      ? `\n📎 Document: ${orderDetails.fileUrl}`
      : '';

    const adminMessage = `🆕 New Order Received!\n\n` +
      `📋 Order ID: ${orderDetails.orderId}\n` +
      `👤 Customer: ${orderDetails.customerName}\n` +
      `📧 Email: ${orderDetails.customerEmail}\n` +
      `📱 Phone: ${orderDetails.customerPhone}\n` +
      `💰 Amount: ₹${orderDetails.amount}\n` +
      `📄 Pages: ${orderDetails.pages}\n` +
      `🔢 Copies: ${orderDetails.copies}\n` +
      `🖨️ Print Type: ${orderDetails.printType}\n` +
      `🚚 Delivery: ${orderDetails.deliveryType}` +
      pickupInfo +
      fileInfo;

    try {
      await WhatsAppBusinessService.sendMessage({
        to: "918777060249", // Admin's number
        text: adminMessage,
        silent: true
      });
    } catch (error) {
      console.error('Error sending new order notification:', error);
      throw error;
    }
  }
}