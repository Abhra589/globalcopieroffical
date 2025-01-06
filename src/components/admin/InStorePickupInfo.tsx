import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from "@/lib/utils";

interface InStorePickupInfoProps {
  pickupDate?: string;
  pickupTime?: string;
}

export const InStorePickupInfo = ({ pickupDate, pickupTime }: InStorePickupInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!pickupDate || !pickupTime) return null;

  return (
    <div 
      className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h4 className="font-medium text-primary mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          In-Store Pickup Details
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-primary" />
        ) : (
          <ChevronDown className="w-4 h-4 text-primary" />
        )}
      </h4>
      <div 
        className={cn(
          "space-y-2 text-sm text-gray-600 overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        )}
      >
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
            onClick={(e) => e.stopPropagation()}
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};