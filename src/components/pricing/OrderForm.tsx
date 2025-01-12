import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useOrderSubmission } from "@/hooks/useOrderSubmission";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomerInfoForm } from "./CustomerInfoForm";
import { DeliveryOptions } from "./DeliveryOptions";
import { FormContainer } from "./form/FormContainer";
import { PrintingOptions } from "./form/PrintingOptions";
import { OrderSummarySection } from "./form/OrderSummarySection";
import { calculateCourierCharge, calculateTotal } from "@/utils/orderCalculations";

export const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedGsm, setSelectedGsm] = useState<"70" | "100">("70");
  const [selectedType, setSelectedType] = useState<"bw" | "color">("bw");
  const [selectedSides, setSelectedSides] = useState<"single" | "double">("single");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("delivery");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [filePath, setFilePath] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(0);
  const [copies, setCopies] = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'color') {
      setSelectedType('color');
    } else if (type === 'bw') {
      setSelectedType('bw');
    }
  }, [location]);

  const handleFileChange = (newFile: File | null, uploadedUrl: string, path?: string) => {
    setFile(newFile);
    setFileUrl(uploadedUrl);
    if (path) {
      setFilePath(path);
    }
  };

  const { handleProceedToPayment } = useOrderSubmission({
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
    userProfile: {
      name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      email: customerInfo.email,
      phone: customerInfo.phone,
      street: customerInfo.street,
      city: customerInfo.city,
      state: customerInfo.state,
      pincode: customerInfo.pincode,
    },
    navigate,
    toast: {
      toast: (props: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
        toast(props);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (deliveryType === "delivery" && (!customerInfo.street || !customerInfo.city || !customerInfo.state || !customerInfo.pincode)) {
      toast({
        title: "Missing Address",
        description: "Please fill in all address fields for delivery",
        variant: "destructive",
      });
      return;
    }

    if (!file) {
      toast({
        title: "Missing Document",
        description: "Please upload a document to print",
        variant: "destructive",
      });
      return;
    }

    if (deliveryType === "pickup" && (!pickupDate || !pickupTime)) {
      toast({
        title: "Missing Pickup Information",
        description: "Please select pickup date and time",
        variant: "destructive",
      });
      return;
    }

    handleProceedToPayment();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div className="space-y-6 max-w-full overflow-x-hidden">
        <CustomerInfoForm customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} />
        
        <PrintingOptions
          selectedGsm={selectedGsm}
          setSelectedGsm={setSelectedGsm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedSides={selectedSides}
          setSelectedSides={setSelectedSides}
          pageCount={pageCount}
          setPageCount={setPageCount}
          copies={copies}
          setCopies={setCopies}
          onFileChange={handleFileChange}
        />

        <DeliveryOptions 
          deliveryType={deliveryType} 
          setDeliveryType={setDeliveryType}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
          onPickupDateChange={setPickupDate}
          onPickupTimeChange={setPickupTime}
        />
        
        <OrderSummarySection
          pageCount={pageCount}
          copies={copies}
          selectedGsm={selectedGsm}
          selectedType={selectedType}
          selectedSides={selectedSides}
          deliveryType={deliveryType}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
          fileUrl={fileUrl}
          calculateCourierCharge={(pages: number) => calculateCourierCharge(pages)}
          calculateTotal={() => calculateTotal(pageCount, copies, selectedGsm, selectedType, selectedSides, deliveryType)}
          onProceedToPayment={handleProceedToPayment}
        />
      </div>
    </FormContainer>
  );
};
