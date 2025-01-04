import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { OrderSummary } from '../components/pricing/OrderSummary';
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
        <PaymentActions />
      </div>
    </div>
  );
};

export default PaymentPage;