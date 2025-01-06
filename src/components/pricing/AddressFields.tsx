import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressFieldsProps {
  street: string;
  city: string;
  state: string;
  pincode: string;
  onChange: (field: string, value: string) => void;
}

export const AddressFields = ({
  street,
  city,
  state,
  pincode,
  onChange,
}: AddressFieldsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Delivery Address</h3>
      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input
          id="street"
          value={street}
          onChange={(e) => onChange('street', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => onChange('city', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={state}
            onChange={(e) => onChange('state', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">Postal Code</Label>
          <Input
            id="pincode"
            value={pincode}
            onChange={(e) => onChange('pincode', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};