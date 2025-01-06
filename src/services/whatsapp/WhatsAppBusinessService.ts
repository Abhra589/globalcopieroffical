import { supabase } from '@/integrations/supabase/client';

interface WhatsAppMessage {
  to: string;
  template?: string;
  text?: string;
}

interface Secret {
  name: string;
  value: string;
}

export class WhatsAppBusinessService {
  private static async getApiCredentials() {
    try {
      const { data: secrets, error } = await supabase
        .from('secrets')
        .select('*')
        .in('name', ['WHATSAPP_BUSINESS_TOKEN', 'WHATSAPP_BUSINESS_PHONE_ID']) as { data: Secret[] | null, error: any };

      if (error) {
        console.error('Error fetching WhatsApp credentials:', error);
        return null;
      }

      if (!secrets || secrets.length < 2) {
        console.error('WhatsApp Business API credentials not found in Supabase secrets');
        return null;
      }

      return {
        token: secrets.find(s => s.name === 'WHATSAPP_BUSINESS_TOKEN')?.value,
        phoneId: secrets.find(s => s.name === 'WHATSAPP_BUSINESS_PHONE_ID')?.value,
      };
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