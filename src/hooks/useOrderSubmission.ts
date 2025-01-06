import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface OrderSubmissionProps {
  pageCount: number;
  copies: number;
  selectedGsm: string;
  selectedType: string;
  selectedSides: string;
  deliveryType: string;
  pickupDate?: string;  // Added this
  pickupTime?: string;  // Added this
  fileUrl: string;
  userProfile: UserProfile;
  navigate: NavigateFunction;
  toast: {
    toast: (props: { title?: string; description?: string; variant?: "default" | "destructive" }) => void;
  };
}

export const useOrderSubmission = ({
  pageCount,
  copies,
  selectedGsm,
  selectedType,
  selectedSides,
  deliveryType,
  pickupDate,
  pickupTime,
  fileUrl,
  userProfile,
  navigate,
  toast,
}: OrderSubmissionProps) => {
  const calculateTotal = useCallback(() => {
    const pricingOptions = [
      { gsm: "70", type: "bw", sides: "single", pricePerPage: 0.8 },
      { gsm: "70", type: "bw", sides: "double", pricePerPage: 1.0 },
      { gsm: "70", type: "color", sides: "single", pricePerPage: 2.5 },
      { gsm: "70", type: "color", sides: "double", pricePerPage: 4.5 },
      { gsm: "100", type: "bw", sides: "single", pricePerPage: 2.0 },
      { gsm: "100", type: "bw", sides: "double", pricePerPage: 3.0 },
      { gsm: "100", type: "color", sides: "single", pricePerPage: 3.0 },
      { gsm: "100", type: "color", sides: "double", pricePerPage: 5.0 },
    ];

    const selectedOption = pricingOptions.find(
      (option) =>
        option.gsm === selectedGsm &&
        option.type === selectedType &&
        option.sides === selectedSides
    );

    if (!selectedOption || !pageCount) return 0;

    const printingCost = selectedOption.pricePerPage * pageCount * copies;
    const courierCharge = deliveryType === "pickup" ? 0 : (pageCount <= 400 ? 80 : 150);
    return printingCost + courierCharge;
  }, [pageCount, copies, selectedGsm, selectedType, selectedSides, deliveryType]);

  const handleProceedToPayment = useCallback(async () => {
    try {
      const total = calculateTotal();
      navigate(`/payment?amount=${total}&orderId=new&pages=${pageCount}&copies=${copies}&printType=${selectedType}&deliveryType=${deliveryType}`);
    } catch (error) {
      console.error('Error proceeding to payment:', error);
      toast.toast({
        title: "Error",
        description: "Failed to proceed to payment",
        variant: "destructive",
      });
    }
  }, [calculateTotal, navigate, pageCount, copies, selectedType, deliveryType]);

  return {
    handleProceedToPayment,
  };
};