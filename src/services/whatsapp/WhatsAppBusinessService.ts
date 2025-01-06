import { supabase } from '@/integrations/supabase/client';

interface WhatsAppMessage {
  to: string;
  template?: string;
  text?: string;
}

export class WhatsAppBusinessService {
  private static async getApiCredentials() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      // Use wa.me links as fallback when credentials aren't available
      return null;
    } catch (error) {
      console.error('Error in getApiCredentials:', error);
      return null;
    }
  }

  public static async sendMessage({ to, template, text }: WhatsAppMessage) {
    try {
      const credentials = await this.getApiCredentials();
      
      // Always fall back to wa.me links for now
      if (text) {
        const cleanedNumber = to.replace(/\D/g, '');
        const formattedNumber = cleanedNumber.startsWith('91') ? cleanedNumber : `91${cleanedNumber}`;
        const encodedMessage = encodeURIComponent(text);
        window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
        return { success: true, fallback: true };
      }
      
      throw new Error('Message text is required');
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }
}