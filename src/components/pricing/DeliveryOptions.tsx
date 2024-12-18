import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Truck, Store } from "lucide-react";

interface DeliveryOptionsProps {
  deliveryType: "pickup" | "delivery";
  setDeliveryType: (type: "pickup" | "delivery") => void;
}

export const DeliveryOptions = ({ deliveryType, setDeliveryType }: DeliveryOptionsProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Label className="text-lg font-medium">Delivery Options</Label>
      <RadioGroup
        value={deliveryType}
        onValueChange={(value: "pickup" | "delivery") => setDeliveryType(value)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className={`flex items-center space-x-2 p-4 rounded-lg border-2 transition-all ${
          deliveryType === 'pickup' ? 'border-primary bg-primary/5' : 'border-gray-200'
        }`}>
          <RadioGroupItem value="pickup" id="pickup" />
          <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer">
            <Store className="w-5 h-5" />
            <div>
              <p className="font-medium">Store Pickup</p>
              <p className="text-sm text-gray-500">Free</p>
            </div>
          </Label>
        </div>
        <div className={`flex items-center space-x-2 p-4 rounded-lg border-2 transition-all ${
          deliveryType === 'delivery' ? 'border-primary bg-primary/5' : 'border-gray-200'
        }`}>
          <RadioGroupItem value="delivery" id="delivery" />
          <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer">
            <Truck className="w-5 h-5" />
            <div>
              <p className="font-medium">Home Delivery</p>
              <p className="text-sm text-gray-500">Starting from ₹80</p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};