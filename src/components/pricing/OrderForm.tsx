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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const calculateCourierCharge = useCallback((pages: number) => {
    return deliveryType === "pickup" ? 0 : (pages <= 400 ? 80 : 150);
  }, [deliveryType]);

  const handleFileChange = async (newFile: File | null, uploadedUrl: string, pdfPageCount: number) => {
    setFile(newFile);
    setFileUrl(uploadedUrl);
    setPageCount(pdfPageCount);
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

  const { handleWhatsAppRedirect, handleProceedToPayment } = useOrderSubmission({
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
    
    // Basic validation
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <Calculator className="w-6 h-6" />
        Calculate Printing Cost
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={customerInfo.firstName}
              onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={customerInfo.lastName}
              onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Delivery Address</h3>
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={customerInfo.street}
              onChange={(e) => setCustomerInfo({ ...customerInfo, street: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={customerInfo.city}
                onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={customerInfo.state}
                onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Postal Code</Label>
              <Input
                id="pincode"
                value={customerInfo.pincode}
                onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
              />
            </div>
          </div>
        </div>

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
        <CopiesInput copies={copies} setCopies={setCopies} />
        <DeliveryOptions deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
        
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
    </form>
  );
};