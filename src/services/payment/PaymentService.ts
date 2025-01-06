import { supabase } from '@/integrations/supabase/client';

interface OrderData {
  pages: number;
  copies: number;
  print_type: string;
  delivery_type: string;
  amount: number;
  customer_phone: string;
  customer_name?: string;
  customer_email?: string;
  gsm?: string;
  print_sides?: string;
  file_path?: string;
  file_url?: string;
}

export class PaymentService {
  static async createNewOrder(orderData: OrderData) {
    const { data: newOrder, error: createError } = await supabase
      .from('orders')
      .insert([{
        pages: orderData.pages,
        copies: orderData.copies,
        print_type: orderData.print_type,
        delivery_type: orderData.delivery_type,
        amount: orderData.amount,
        payment_status: 'Payment Done',
        customer_name: orderData.customer_name || 'Customer',
        customer_email: orderData.customer_email || 'email@example.com',
        customer_phone: orderData.customer_phone,
        gsm: orderData.gsm || '70',
        print_sides: orderData.print_sides || 'single',
        file_path: orderData.file_path || '',
        file_url: orderData.file_url || '',
      }])
      .select()
      .single();

    if (createError) throw createError;
    return newOrder;
  }

  static async updatePaymentStatus(orderId: string) {
    const { error: updateError } = await supabase
      .from('orders')
      .update({ payment_status: 'Payment Done' })
      .eq('id', orderId);

    if (updateError) throw updateError;
  }
}