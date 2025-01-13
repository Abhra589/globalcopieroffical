import { supabase } from "@/integrations/supabase/client";

interface CreateOrderParams {
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
  pickup_date?: string | null;
  pickup_time?: string | null;
  payment_status: string;
}

export class PaymentService {
  static async createNewOrder(params: CreateOrderParams) {
    console.log('Creating new order with params:', params);
    
    const { data, error } = await supabase
      .from('orders')
      .insert([params])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    if (!data) {
      throw new Error('No data returned from order creation');
    }

    console.log('Order created successfully:', data);
    return data;
  }

  static async updatePaymentStatus(orderId: string, status: string) {
    console.log('Updating payment status:', { orderId, status });
    
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: status })
      .eq('id', orderId)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }

    if (!data) {
      throw new Error('No data returned from payment status update');
    }

    console.log('Payment status updated successfully:', data);
    return data;
  }
}