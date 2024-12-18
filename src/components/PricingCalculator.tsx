import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface PricingOption {
  gsm: "70" | "100";
  type: "bw" | "color";
  sides: "single" | "double";
  pricePerPage: number;
}

const pricingOptions: PricingOption[] = [
  { gsm: "70", type: "bw", sides: "single", pricePerPage: 0.8 },
  { gsm: "70", type: "bw", sides: "double", pricePerPage: 1.0 },
  { gsm: "70", type: "color", sides: "single", pricePerPage: 2.5 },
  { gsm: "70", type: "color", sides: "double", pricePerPage: 4.5 },
  { gsm: "100", type: "bw", sides: "single", pricePerPage: 2.0 },
  { gsm: "100", type: "bw", sides: "double", pricePerPage: 3.0 },
  { gsm: "100", type: "color", sides: "single", pricePerPage: 3.0 },
  { gsm: "100", type: "color", sides: "double", pricePerPage: 5.0 },
];

export const PricingCalculator = () => {
  const navigate = useNavigate();
  const [selectedGsm, setSelectedGsm] = useState<"70" | "100">("70");
  const [selectedType, setSelectedType] = useState<"bw" | "color">("bw");
  const [selectedSides, setSelectedSides] = useState<"single" | "double">("single");
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [copies, setCopies] = useState(1);
  const { toast } = useToast();

  const calculateCourierCharge = (pages: number) => {
    return pages <= 400 ? 80 : 150;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
      // In a real application, you would parse the PDF to get page count
      // For demo purposes, we'll set a random number
      const demoPageCount = Math.floor(Math.random() * 500) + 1;
      setPageCount(demoPageCount);
      toast({
        title: "File uploaded successfully",
        description: `Document has ${demoPageCount} pages`,
      });
    } else {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
    }
  };

  const calculateTotal = useCallback(() => {
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
  }, [selectedGsm, selectedType, selectedSides, pageCount, copies]);

  const handleWhatsAppRedirect = () => {
    const total = calculateTotal();
    const message = encodeURIComponent(
      `Hi, I would like to place an order:\n` +
      `Pages: ${pageCount}\n` +
      `Copies: ${copies}\n` +
      `Paper: ${selectedGsm}gsm\n` +
      `Type: ${selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
      `Sides: ${selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
      `Total Amount: ₹${total.toFixed(2)}`
    );
    window.open(`https://wa.me/918777060249?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#1A1F2C] mb-6">Calculate Printing Cost</h2>
      
      <div className="space-y-6">
        <div>
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

        <div>
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

        <div>
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

        <div>
          <Label htmlFor="copies">Number of Copies</Label>
          <Input
            id="copies"
            type="number"
            min="1"
            value={copies}
            onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="file">Upload PDF Document</Label>
          <Input
            id="file"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mt-2"
          />
        </div>

        {pageCount > 0 && (
          <div className="p-4 bg-[#F1F1F1] rounded-lg space-y-2">
            <p className="text-[#1A1F2C]">Document Pages: {pageCount}</p>
            <p className="text-[#1A1F2C]">Courier Charge: ₹{calculateCourierCharge(pageCount)}</p>
            <p className="text-lg font-bold text-[#1A1F2C]">
              Total Amount: ₹{calculateTotal().toFixed(2)}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            onClick={handleWhatsAppRedirect}
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
            disabled={!pageCount}
          >
            Enquire on WhatsApp
          </Button>
          <Button
            onClick={() => navigate("/payment")}
            className="bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white"
            disabled={!pageCount}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};