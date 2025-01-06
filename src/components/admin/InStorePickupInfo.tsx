import React from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

interface InStorePickupInfoProps {
  pickupDate?: string;
  pickupTime?: string;
}

export const InStorePickupInfo = ({ pickupDate, pickupTime }: InStorePickupInfoProps) => {
  if (!pickupDate || !pickupTime) return null;

  return (
    <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in">
      <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        In-Store Pickup Details
      </h4>
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          Pickup Date: {pickupDate}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Pickup Time: {pickupTime}
        </p>
        <div className="mt-3 text-xs">
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
      </div>
    </div>
  );
};