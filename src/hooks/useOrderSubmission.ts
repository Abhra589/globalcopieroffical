import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface OrderSubmissionProps {
  pageCount: number;
  copies: number;
  selectedGsm: string;
  selectedType: string;
  selectedSides: string;
  deliveryType: string;
  pickupDate?: string;
  pickupTime?: string;
  fileUrl: string;
  filePath: string;
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
  filePath,
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
      // First create the order in Supabase
      const { data: newOrder, error: createError } = await supabase
        .from('orders')
        .insert([{
          pages: pageCount,
          copies: copies,
          print_type: selectedType,
          delivery_type: deliveryType,
          amount: calculateTotal(),
          customer_name: userProfile.name,
          customer_email: userProfile.email,
          customer_phone: userProfile.phone,
          gsm: selectedGsm,
          print_sides: selectedSides,
          file_url: fileUrl,
          file_path: filePath,
          street: userProfile.street,
          city: userProfile.city,
          state: userProfile.state,
          pincode: userProfile.pincode,
          pickup_date: pickupDate,
          pickup_time: pickupTime,
          payment_status: 'Payment Pending'
        }])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      console.log('New order created:', newOrder);

      const queryParams = new URLSearchParams({
        amount: calculateTotal().toString(),
        orderId: newOrder.id,
        pages: pageCount.toString(),
        copies: copies.toString(),
        printType: selectedType,
        deliveryType,
        customerName: userProfile.name,
        customerEmail: userProfile.email,
        customerPhone: userProfile.phone,
        gsm: selectedGsm,
        printSides: selectedSides,
        fileUrl: fileUrl,
        filePath: filePath,
      });

      if (deliveryType === 'pickup' && pickupDate && pickupTime) {
        queryParams.append('pickupDate', pickupDate);
        queryParams.append('pickupTime', pickupTime);
      }

      if (userProfile.street) queryParams.append('street', userProfile.street);
      if (userProfile.city) queryParams.append('city', userProfile.city);
      if (userProfile.state) queryParams.append('state', userProfile.state);
      if (userProfile.pincode) queryParams.append('pincode', userProfile.pincode);

      navigate(`/payment?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error proceeding to payment:', error);
      toast.toast({
        title: "Error",
        description: "Failed to proceed to payment",
        variant: "destructive",
      });
    }
  }, [calculateTotal, navigate, pageCount, copies, selectedType, deliveryType, pickupDate, pickupTime, userProfile, fileUrl, filePath]);

  return {
    handleProceedToPayment,
  };
};