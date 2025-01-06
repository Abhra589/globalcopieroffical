import { WhatsAppBusinessService } from './WhatsAppBusinessService';

export class WhatsAppNotificationService {
  static async sendOrderConfirmation(orderId: string, amount: string, customerPhone: string) {
    try {
      // Send confirmation to admin
      await WhatsAppBusinessService.sendMessage({
        to: "918777060249",
        text: `Payment confirmed for order ${orderId}. Amount: ₹${amount}`
      });

      // Send confirmation to user
      if (customerPhone) {
        await WhatsAppBusinessService.sendMessage({
          to: customerPhone,
          text: `Thank you! Your payment of ₹${amount} has been confirmed for order ${orderId}. We'll process your order shortly.`
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
        text: message
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
        text: `Reminder: Your payment of ₹${amount} for order ${orderId} is pending. Please complete the payment to process your order.`
      });
    } catch (error) {
      console.error('Error sending payment reminder:', error);
      throw error;
    }
  }
}