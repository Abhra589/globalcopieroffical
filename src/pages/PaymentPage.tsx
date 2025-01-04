"use client";
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import OrderSummary from '../components/pricing/OrderSummary';
import QRCodeSection from '../components/payment/QRCodeSection';
import PaymentActions from '../components/payment/PaymentActions';

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const amount = Number(searchParams.get("amount")) || 0;
  const orderId = searchParams.get("orderId") || "";
  const pages = Number(searchParams.get("pages")) || 0;
  const copies = Number(searchParams.get("copies")) || 0;
  const printType = searchParams.get("printType") || "";
  const deliveryType = searchParams.get("deliveryType") || "";
  const upiLink = "upi://pay?mode=02&pa=Q079714462@ybl&purpose=00&mc=4816&pn=PhonePeMerchant&orgid=180001&sign=MEYCIQD22QosiykqT3nMOeH17s0o5EcUOM/mha6ruHpg6AA8mQIhAKfH/XccisiuxQm2HP4NkPh3v33vdLfHZN4t9HnjMgBd";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold text-center">Complete Your Payment</h1>
        <OrderSummary
          amount={amount}
          orderId={orderId}
          pages={pages}
          copies={copies}
          printType={printType}
          deliveryType={deliveryType}
        />
        <QRCodeSection upiLink={upiLink} />
        <PaymentActions upiLink={upiLink} />
      </div>
    </div>
  );
};

export default PaymentPage;