import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface CustomerInfoFormProps {
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
}

export const CustomerInfoForm = ({ customerInfo, setCustomerInfo }: CustomerInfoFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={customerInfo.firstName}
            onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={customerInfo.lastName}
            onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">WhatsApp Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            value={customerInfo.street}
            onChange={(e) => setCustomerInfo({ ...customerInfo, street: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={customerInfo.city}
              onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={customerInfo.state}
              onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Postal Code</Label>
            <Input
              id="pincode"
              value={customerInfo.pincode}
              onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};