import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PickupDateTimeProps {
  pickupDate: string;
  pickupTime: string;
  onPickupDateChange: (date: string) => void;
  onPickupTimeChange: (time: string) => void;
}

export const PickupDateTime = ({
  pickupDate,
  pickupTime,
  onPickupDateChange,
  onPickupTimeChange,
}: PickupDateTimeProps) => {
  // Get tomorrow's date as the minimum allowed date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="space-y-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            In-Store Pickup Details
          </CardTitle>
          <CardDescription>
            Please select your preferred pickup date and time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupDate">Pickup Date</Label>
              <Input
                id="pickupDate"
                type="date"
                min={minDate}
                value={pickupDate}
                onChange={(e) => onPickupDateChange(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickupTime">Pickup Time</Label>
              <Input
                id="pickupTime"
                type="time"
                min="09:00"
                max="18:00"
                value={pickupTime}
                onChange={(e) => onPickupTimeChange(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500">
                Shop hours: 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p className="font-medium">Shop Location:</p>
            <a
              href="https://maps.app.goo.gl/zcJghSxp2SFukxt87"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View on Google Maps
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};