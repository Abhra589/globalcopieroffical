import { OrderSummary } from "../OrderSummary";
import { OrderActions } from "../OrderActions";

interface OrderSummarySectionProps {
  pageCount: number;
  copies: number;
  selectedGsm: string;
  selectedType: string;
  selectedSides: string;
  deliveryType: string;
  pickupDate?: string;
  pickupTime?: string;
  fileUrl: string;
  calculateCourierCharge: (pages: number) => number;
  calculateTotal: () => number;
  onProceedToPayment: () => void;
}

export const OrderSummarySection = ({
  pageCount,
  copies,
  selectedGsm,
  selectedType,
  selectedSides,
  deliveryType,
  pickupDate,
  pickupTime,
  fileUrl,
  calculateCourierCharge,
  calculateTotal,
  onProceedToPayment,
}: OrderSummarySectionProps) => {
  const total = calculateTotal();

  return (
    <div className="space-y-6">
      <OrderSummary
        pageCount={pageCount}
        calculateCourierCharge={calculateCourierCharge}
        calculateTotal={calculateTotal}
      />
      <OrderActions
        pageCount={pageCount}
        copies={copies}
        selectedGsm={selectedGsm}
        selectedType={selectedType}
        selectedSides={selectedSides}
        deliveryType={deliveryType}
        pickupDate={pickupDate}
        pickupTime={pickupTime}
        total={total}
        fileUrl={fileUrl}
        onProceedToPayment={onProceedToPayment}
      />
    </div>
  );
};