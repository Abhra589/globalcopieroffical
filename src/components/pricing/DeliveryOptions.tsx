import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DeliveryOptionsProps {
  deliveryType: "pickup" | "delivery";
  setDeliveryType: (type: "pickup" | "delivery") => void;
}

export const DeliveryOptions = ({ deliveryType, setDeliveryType }: DeliveryOptionsProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Label>Delivery Options</Label>
      <RadioGroup
        value={deliveryType}
        onValueChange={(value: "pickup" | "delivery") => setDeliveryType(value)}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pickup" id="pickup" />
          <Label htmlFor="pickup">Store Pickup (Free)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="delivery" id="delivery" />
          <Label htmlFor="delivery">Home Delivery</Label>
        </div>
      </RadioGroup>
    </div>
  );
};