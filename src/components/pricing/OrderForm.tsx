import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PriceList } from "./PriceList";
import { DeliveryOptions } from "./DeliveryOptions";
import { CopiesInput } from "./CopiesInput";
import { FileUpload } from "./FileUpload";
import { OrderSummary } from "./OrderSummary";
import { PrintOptions } from "./PrintOptions";
import { OrderActions } from "./OrderActions";
import { ManualPageCount } from "./ManualPageCount";
import { CustomerInfoForm } from "./CustomerInfoForm";
import { useOrderSubmission } from "@/hooks/useOrderSubmission";
import { useNavigate } from "react-router-dom";
import { FormHeader } from "./FormHeader";
import { FormContainer } from "./FormContainer";
import { calculateCourierCharge, calculateTotal } from "@/utils/orderCalculations";

export const OrderForm = () => {
  const navigate = useNavigate();
  const [selectedGsm, setSelectedGsm] = useState<"70" | "100">("70");
  const [selectedType, setSelectedType] = useState<"bw" | "color">("bw");
  const [selectedSides, setSelectedSides] = useState<"single" | "double">("single");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("delivery");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(0);
  const [copies, setCopies] = useState(1);
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

  const handleFileChange = (newFile: File | null, uploadedUrl: string) => {
    setFile(newFile);
    setFileUrl(uploadedUrl);
  };

  const { handleProceedToPayment } = useOrderSubmission({
    pageCount,
    copies,
    selectedGsm,
    selectedType,
    selectedSides,
    deliveryType,
    fileUrl,
    userProfile: {
      name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      email: customerInfo.email,
      phone: customerInfo.phone,
    },
    navigate,
    toast: {
      toast: (props: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
        toast({
          ...props,
          duration: 3000,
        });
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

    if (!file) {
      toast({
        title: "Missing Document",
        description: "Please upload a document to print",
        variant: "destructive",
      });
      return;
    }

    handleProceedToPayment();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader />
      
      <div className="space-y-6">
        <CustomerInfoForm customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} />
        
        <PrintOptions
          selectedGsm={selectedGsm}
          setSelectedGsm={setSelectedGsm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedSides={selectedSides}
          setSelectedSides={setSelectedSides}
        />

        <PriceList selectedGsm={selectedGsm} />
        <FileUpload onFileChange={handleFileChange} />
        <ManualPageCount pageCount={pageCount} onPageCountChange={setPageCount} />
        <CopiesInput copies={copies} setCopies={setCopies} />
        <DeliveryOptions deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
        
        <OrderSummary
          pageCount={pageCount}
          calculateCourierCharge={(pages) => calculateCourierCharge(pages, deliveryType)}
          calculateTotal={() => calculateTotal(pageCount, copies, selectedGsm, selectedType, selectedSides, deliveryType)}
        />
        
        <OrderActions
          pageCount={pageCount}
          copies={copies}
          selectedGsm={selectedGsm}
          selectedType={selectedType}
          selectedSides={selectedSides}
          deliveryType={deliveryType}
          total={calculateTotal(pageCount, copies, selectedGsm, selectedType, selectedSides, deliveryType)}
          fileUrl={fileUrl}
          onProceedToPayment={handleProceedToPayment}
        />
      </div>
    </FormContainer>
  );
};