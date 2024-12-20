import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PriceList } from "./pricing/PriceList";
import { DeliveryOptions } from "./pricing/DeliveryOptions";
import { CopiesInput } from "./pricing/CopiesInput";
import { FileUpload } from "./pricing/FileUpload";
import { Calculator } from "lucide-react";

export const PricingCalculator = () => {
  const navigate = useNavigate();
  const [selectedGsm, setSelectedGsm] = useState<"70" | "100">("70");
  const [selectedType, setSelectedType] = useState<"bw" | "color">("bw");
  const [selectedSides, setSelectedSides] = useState<"single" | "double">("single");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("delivery");
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [copies, setCopies] = useState(1);
  const { toast } = useToast();

  const calculateCourierCharge = useCallback((pages: number) => {
    return deliveryType === "pickup" ? 0 : (pages <= 400 ? 80 : 150);
  }, [deliveryType]);

  const handleFileChange = (newFile: File | null) => {
    if (!newFile) return;
    setFile(newFile);
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

  const handleWhatsAppRedirect = () => {
    const total = calculateTotal();
    const customerMessage = encodeURIComponent(
      `Hi, I would like to place an order:\n` +
      `Pages: ${pageCount}\n` +
      `Copies: ${copies}\n` +
      `Paper: ${selectedGsm}gsm\n` +
      `Type: ${selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
      `Sides: ${selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
      `Delivery: ${deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n` +
      `Total Amount: ₹${total.toFixed(2)}`
    );

    // Send to customer service WhatsApp
    window.open(`https://wa.me/918777060249?text=${customerMessage}`, '_blank');

    // Send order confirmation to admin
    const adminMessage = encodeURIComponent(
      `New order received:\n` +
      `Pages: ${pageCount}\n` +
      `Copies: ${copies}\n` +
      `Paper: ${selectedGsm}gsm\n` +
      `Type: ${selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
      `Sides: ${selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
      `Delivery: ${deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n` +
      `Total Amount: ₹${total.toFixed(2)}\n` +
      `Status: Pending Payment`
    );
    window.open(`https://wa.me/918777060249?text=${adminMessage}`, '_blank');

    toast({
      title: "Order Submitted",
      description: "Your order details have been sent via WhatsApp. We'll contact you shortly.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <Calculator className="w-6 h-6" />
        Calculate Printing Cost
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Paper Weight</Label>
          <RadioGroup
            value={selectedGsm}
            onValueChange={(value: "70" | "100") => setSelectedGsm(value)}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="70" id="gsm-70" />
              <Label htmlFor="gsm-70">70 GSM</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="100" id="gsm-100" />
              <Label htmlFor="gsm-100">100 GSM</Label>
            </div>
          </RadioGroup>
        </div>

        <PriceList selectedGsm={selectedGsm} />

        <div className="space-y-2">
          <Label>Print Type</Label>
          <RadioGroup
            value={selectedType}
            onValueChange={(value: "bw" | "color") => setSelectedType(value)}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bw" id="type-bw" />
              <Label htmlFor="type-bw">Black & White</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="color" id="type-color" />
              <Label htmlFor="type-color">Color</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Printing Sides</Label>
          <RadioGroup
            value={selectedSides}
            onValueChange={(value: "single" | "double") => setSelectedSides(value)}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="sides-single" />
              <Label htmlFor="sides-single">Single Side</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="double" id="sides-double" />
              <Label htmlFor="sides-double">Both Sides</Label>
            </div>
          </RadioGroup>
        </div>

        <CopiesInput copies={copies} setCopies={setCopies} />

        <DeliveryOptions deliveryType={deliveryType} setDeliveryType={setDeliveryType} />

        <FileUpload onFileChange={handleFileChange} />

        {pageCount > 0 && (
          <div className="p-6 bg-primary/5 rounded-lg space-y-3 animate-scale-in">
            <p className="text-primary">Document Pages: {pageCount}</p>
            <p className="text-primary">Courier Charge: ₹{calculateCourierCharge(pageCount)}</p>
            <p className="text-xl font-bold text-primary">
              Total Amount: ₹{calculateTotal().toFixed(2)}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            onClick={handleWhatsAppRedirect}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white animate-scale-in flex-1"
            disabled={!pageCount}
          >
            Enquire on WhatsApp
          </Button>
          <Button
            onClick={() => navigate("/payment")}
            className="bg-primary hover:bg-primary/90 text-white animate-scale-in flex-1"
            disabled={!pageCount}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};
