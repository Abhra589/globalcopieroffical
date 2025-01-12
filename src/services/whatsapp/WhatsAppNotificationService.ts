import { WhatsAppBusinessService } from './WhatsAppBusinessService';

export class WhatsAppNotificationService {
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

  static async sendMessage(message: string, customerPhone: string, silent: boolean = true) {
    try {
      await WhatsAppBusinessService.sendMessage({
        to: customerPhone,
        text: message,
        silent
      });
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }
}