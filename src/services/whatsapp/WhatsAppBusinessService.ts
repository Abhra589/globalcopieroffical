import { supabase } from '@/integrations/supabase/client';

interface WhatsAppMessage {
  to: string;
  template?: string;
  text?: string;
}

export class WhatsAppBusinessService {
  private static async getApiCredentials() {
    const { data: secrets } = await supabase
      .from('secrets')
      .select('value')
      .in('name', ['WHATSAPP_BUSINESS_TOKEN', 'WHATSAPP_BUSINESS_PHONE_ID'])
      .throwOnError();

    if (!secrets || secrets.length < 2) {
      throw new Error('WhatsApp Business API credentials not found');
    }

    return {
      token: secrets.find(s => s.name === 'WHATSAPP_BUSINESS_TOKEN')?.value,
      phoneId: secrets.find(s => s.name === 'WHATSAPP_BUSINESS_PHONE_ID')?.value,
    };
  }

  public static async sendMessage({ to, template, text }: WhatsAppMessage) {
    try {
      const { token, phoneId } = await this.getApiCredentials();
      
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
            to,
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