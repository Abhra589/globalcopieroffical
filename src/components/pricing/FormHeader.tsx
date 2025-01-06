import { Calculator } from "lucide-react";

export const FormHeader = () => {
  return (
    <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
      <Calculator className="w-6 h-6" />
      Calculate Printing Cost
    </h2>
  );
};