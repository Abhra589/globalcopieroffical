import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { OrderSummary } from '../components/pricing/OrderSummary';
import QRCodeSection from '../components/payment/QRCodeSection';
import PaymentActions from '../components/payment/PaymentActions';
import { WhatsAppBusinessService } from '@/services/whatsapp/WhatsAppBusinessService';
import { useToast } from '@/hooks/use-toast';

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const amount = Number(searchParams.get("amount")) || 0;
  const orderId = searchParams.get("orderId") || "";
  const pages = Number(searchParams.get("pages")) || 0;
  const copies = Number(searchParams.get("copies")) || 0;
  const printType = searchParams.get("printType") || "";
  const deliveryType = searchParams.get("deliveryType") || "";
  const customerName = searchParams.get("customerName") || "";
  const customerPhone = searchParams.get("customerPhone") || "";

  useEffect(() => {
    const sendInitialNotifications = async () => {
      try {
        if (!customerPhone || !amount || !customerName) {
          console.error('Missing required parameters for notifications');
          return;
        }

        // Send admin notification
        await WhatsAppBusinessService.sendMessage({
          to: "918777060249",
          text: `Hey! New order has been received from a customer. It has been updated in the admin panel. The customer ${customerName} has to pay ₹${amount}. Please check the payment status in the admin panel and confirm the order.`
        });

        // Send user notification
        await WhatsAppBusinessService.sendMessage({
          to: customerPhone,
          text: `Thank you for filling the form on GlobalCopier. Please pay this amount (₹${amount}) on the website to confirm the order and then click on 'Click Here if Payment is Done.'`
        });
      } catch (error) {
        console.error('Error sending WhatsApp notifications:', error);
        toast({
          title: "Notification Error",
          description: "Could not send payment notifications",
          variant: "destructive",
        });
      }
    };

    sendInitialNotifications();
  }, [amount, customerName, customerPhone, toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold text-center">Complete Your Payment</h1>
        <OrderSummary
          pageCount={pages}
          calculateCourierCharge={(pages) => pages <= 400 ? 80 : 150}
          calculateTotal={() => amount}
        />
        <QRCodeSection amount={amount} />
        <PaymentActions 
          upiLink={`upi://pay?pa=9831162681-2@axl&pn=GlobalCopier&am=${amount}&cu=INR`}
        />
      </div>
    </div>
  );
};

export default PaymentPage;