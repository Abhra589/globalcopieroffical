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
}