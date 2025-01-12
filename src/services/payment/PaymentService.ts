import { supabase } from '@/integrations/supabase/client';

interface OrderData {
  pages: number;
  copies: number;
  print_type: string;
  delivery_type: string;
  amount: number;
  customer_phone: string;
  customer_name: string;
  customer_email: string;
  gsm: string;
  print_sides: string;
  file_path: string;
  file_url: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  pickup_date?: string;
  pickup_time?: string;
  payment_status?: string;
}

export class PaymentService {
  static async createNewOrder(orderData: OrderData) {
    console.log('Creating new order with data:', orderData);
    
    const { data: newOrder, error: createError } = await supabase
      .from('orders')
      .insert([{
        pages: orderData.pages,
        copies: orderData.copies,
        print_type: orderData.print_type,
        delivery_type: orderData.delivery_type,
        amount: orderData.amount,
        payment_status: 'Payment Pending',
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        gsm: orderData.gsm,
        print_sides: orderData.print_sides,
        file_path: orderData.file_path || '',
        file_url: orderData.file_url || '',
        street: orderData.street || null,
        city: orderData.city || null,
        state: orderData.state || null,
        pincode: orderData.pincode || null,
        pickup_date: orderData.pickup_date || null,
        pickup_time: orderData.pickup_time || null
      }])
      .select()
      .single();

    if (createError) {
      console.error('Error creating order:', createError);
      throw createError;
    }
    
    console.log('Order created successfully:', newOrder);
    return newOrder;
  }

  static async updatePaymentStatus(orderId: string) {
    console.log('Updating payment status for order:', orderId);
    
    const { error: updateError } = await supabase
      .from('orders')
      .update({ payment_status: 'Payment Done' })
      .eq('id', orderId);

    if (updateError) {
      console.error('Error updating payment status:', updateError);
      throw updateError;
    }
    
    console.log('Payment status updated successfully');
  }
}