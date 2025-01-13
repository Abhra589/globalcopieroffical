import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { PaymentService } from '@/services/payment/PaymentService';

export const usePaymentStatusUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const updatePaymentStatus = async (orderId: string) => {
    try {
      console.log('Updating payment status for order:', orderId);
      
      const { data, error } = await supabase
        .from('orders')
        .update({ payment_status: 'Payment Done' })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating payment status:', error);
        throw error;
      }

      console.log('Payment status updated successfully:', data);
      return true;
    } catch (error) {
      console.error('Error in updatePaymentStatus:', error);
      throw error;
    }
  };

  const handlePaymentUpdate = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      const orderId = searchParams.get('orderId');
      if (!orderId) {
        throw new Error('Order ID not found in URL parameters');
      }

      if (orderId === 'new') {
        const result = await PaymentService.createNewOrder({
          pages: Number(searchParams.get('pages')),
          copies: Number(searchParams.get('copies')),
          print_type: searchParams.get('printType') || '',
          delivery_type: searchParams.get('deliveryType') || '',
          amount: Number(searchParams.get('amount')),
          customer_phone: searchParams.get('customerPhone') || '',
          customer_name: searchParams.get('customerName') || '',
          customer_email: searchParams.get('customerEmail') || '',
          gsm: searchParams.get('gsm') || '70',
          print_sides: searchParams.get('printSides') || 'single',
          file_path: searchParams.get('filePath') || '',
          file_url: searchParams.get('fileUrl') || '',
          street: searchParams.get('street'),
          city: searchParams.get('city'),
          state: searchParams.get('state'),
          pincode: searchParams.get('pincode'),
          pickup_date: searchParams.get('pickupDate'),
          pickup_time: searchParams.get('pickupTime'),
          payment_status: 'Payment Pending'
        });
        await updatePaymentStatus(result.id);
      } else {
        await updatePaymentStatus(orderId);
      }

      toast({
        title: "Success",
        description: "Payment completed successfully!",
      });
      return true;
    } catch (error) {
      console.error('Error in handlePaymentUpdate:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    handlePaymentUpdate
  };
};