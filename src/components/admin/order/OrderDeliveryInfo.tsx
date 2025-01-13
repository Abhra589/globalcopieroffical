import { DeliveryAddress } from "../DeliveryAddress";
import { InStorePickupInfo } from "../InStorePickupInfo";
import { DocumentLink } from "../DocumentLink";

interface OrderDeliveryInfoProps {
  deliveryType: string;
  pickupDate?: string;
  pickupTime?: string;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  fileUrl: string;
}

export const OrderDeliveryInfo = ({
  deliveryType,
  pickupDate,
  pickupTime,
  street,
  city,
  state,
  pincode,
  fileUrl
}: OrderDeliveryInfoProps) => {
  return (
    <div className="space-y-4">
      {deliveryType === 'pickup' ? (
        <InStorePickupInfo
          pickupDate={pickupDate || ''}
          pickupTime={pickupTime || ''}
        />
      ) : (
        <DeliveryAddress
          street={street}
          city={city}
          state={state}
          pincode={pincode}
        />
      )}
      <DocumentLink fileUrl={fileUrl} />
    </div>
  );
};