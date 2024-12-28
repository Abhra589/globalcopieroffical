import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Calculator } from "lucide-react";
import { PriceList } from "./PriceList";
import { DeliveryOptions } from "./DeliveryOptions";
import { CopiesInput } from "./CopiesInput";
import { FileUpload } from "./FileUpload";
import { OrderSummary } from "./OrderSummary";
import { PrintOptions } from "./PrintOptions";
import { OrderActions } from "./OrderActions";
import { useOrderSubmission } from "@/hooks/useOrderSubmission";
import { useNavigate } from "react-router-dom";

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
  const { toast } = useToast();

  const { handleWhatsAppRedirect, handleProceedToPayment } = useOrderSubmission({
    pageCount,
    copies,
    selectedGsm,
    selectedType,
    selectedSides,
    deliveryType,
    fileUrl,
    navigate,
    toast: { toast },
  });

  const calculateCourierCharge = useCallback((pages: number) => {
    return deliveryType === "pickup" ? 0 : (pages <= 400 ? 80 : 150);
  }, [deliveryType]);

  const handleFileChange = async (newFile: File | null, uploadedUrl: string) => {
    if (!newFile) return;
    setFile(newFile);
    setFileUrl(uploadedUrl);
    // In a real application, you would parse the PDF to get page count
    const demoPageCount = Math.floor(Math.random() * 500) + 1;
    setPageCount(demoPageCount);
    
    toast({
      title: "File uploaded successfully",
      description: `Document has ${demoPageCount} pages`,
    });
  };

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
    const courierCharge = calculateCourierCharge(pageCount);
    return printingCost + courierCharge;
  }, [selectedGsm, selectedType, selectedSides, pageCount, copies, calculateCourierCharge]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <Calculator className="w-6 h-6" />
        Calculate Printing Cost
      </h2>
      
      <div className="space-y-6">
        <PrintOptions
          selectedGsm={selectedGsm}
          setSelectedGsm={setSelectedGsm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedSides={selectedSides}
          setSelectedSides={setSelectedSides}
        />

        <PriceList selectedGsm={selectedGsm} />
        <CopiesInput copies={copies} setCopies={setCopies} />
        <DeliveryOptions deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
        <FileUpload onFileChange={handleFileChange} />
        
        <OrderSummary
          pageCount={pageCount}
          calculateCourierCharge={calculateCourierCharge}
          calculateTotal={calculateTotal}
        />
        
        <OrderActions
          pageCount={pageCount}
          onWhatsAppRedirect={handleWhatsAppRedirect}
          onProceedToPayment={handleProceedToPayment}
        />
      </div>
    </div>
  );
};