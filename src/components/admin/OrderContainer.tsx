import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface OrderContainerProps {
  children: ReactNode;
}

export const OrderContainer = ({ children }: OrderContainerProps) => {
  return (
    <Card className="p-6 space-y-4 animate-fade-in">
      {children}
    </Card>
  );
};