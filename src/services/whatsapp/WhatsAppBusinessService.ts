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

      // Use environment variables instead of querying secrets table
      const token = process.env.WHATSAPP_BUSINESS_TOKEN;
      const phoneId = process.env.WHATSAPP_BUSINESS_PHONE_ID;

      if (!token || !phoneId) {
        console.error('WhatsApp Business API credentials not found in environment variables');
        return null;
      }

      return { token, phoneId };
    } catch (error) {
      console.error('Error in getApiCredentials:', error);
      return null;
    }
  }

  public static async sendMessage({ to, template, text }: WhatsAppMessage) {
    try {
      const credentials = await this.getApiCredentials();
      
      if (!credentials) {
        // If credentials are not available, fall back to wa.me links
        if (text) {
          const cleanedNumber = to.replace(/\D/g, '');
          const formattedNumber = cleanedNumber.startsWith('91') ? cleanedNumber : `91${cleanedNumber}`;
          const encodedMessage = encodeURIComponent(text);
          window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
          return { success: true, fallback: true };
        }
        throw new Error('WhatsApp Business API credentials not found');
      }

      const { token, phoneId } = credentials;

      // Clean the phone number
      const cleanedNumber = to.replace(/\D/g, '');
      const formattedNumber = cleanedNumber.startsWith('91') ? cleanedNumber : `91${cleanedNumber}`;

      const response = await fetch(
        `https://graph.facebook.com/v17.0/${phoneId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: formattedNumber,
            type: template ? 'template' : 'text',
            ...(template ? { template: { name: template } } : { text: { body: text } }),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send WhatsApp message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }
}
