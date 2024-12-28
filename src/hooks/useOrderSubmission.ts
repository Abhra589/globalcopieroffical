import { supabase } from "@/integrations/supabase/client";
import { NavigateFunction } from "react-router-dom";
import { ToastType } from "@/components/ui/use-toast";

interface OrderSubmissionProps {
  pageCount: number;
  copies: number;
  selectedGsm: string;
  selectedType: string;
  selectedSides: string;
  deliveryType: string;
  fileUrl: string;
  navigate: NavigateFunction;
  toast: ToastType;
}

export const useOrderSubmission = ({
  pageCount,
  copies,
  selectedGsm,
  selectedType,
  selectedSides,
  deliveryType,
  fileUrl,
  navigate,
  toast,
}: OrderSubmissionProps) => {
  const calculateTotal = () => {
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
  };

  const createOrder = async (redirectPath: string) => {
    const total = calculateTotal();
    
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: "Customer", // This will be updated in the order page
          customer_email: "customer@example.com", // This will be updated in the order page
          customer_phone: "1234567890", // This will be updated in the order page
          pages: pageCount,
          copies,
          gsm: selectedGsm,
          print_type: selectedType,
          print_sides: selectedSides,
          delivery_type: deliveryType,
          file_path: fileUrl,
          file_url: fileUrl,
          amount: total,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Store order details for the next page
      localStorage.setItem('currentOrder', JSON.stringify({
        orderId: orderData.id,
        pageCount,
        copies,
        selectedGsm,
        selectedType,
        selectedSides,
        deliveryType,
        fileUrl,
        total,
      }));

      // Trigger WhatsApp notification to admin
      await supabase.functions.invoke('send-whatsapp-notification', {
        body: {
          type: 'new_order',
          orderDetails: {
            orderId: orderData.id,
            pageCount,
            copies,
            selectedGsm,
            selectedType,
            selectedSides,
            deliveryType,
            fileUrl,
            total,
          }
        }
      });

      navigate(redirectPath);
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWhatsAppRedirect = () => createOrder('/order');
  const handleProceedToPayment = () => createOrder('/payment');

  return {
    handleWhatsAppRedirect,
    handleProceedToPayment,
  };
};