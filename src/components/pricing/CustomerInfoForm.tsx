import { PersonalInfoFields } from "./PersonalInfoFields";
import { AddressFields } from "./AddressFields";

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
  const handleFieldChange = (field: string, value: string) => {
    setCustomerInfo({ ...customerInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <PersonalInfoFields
        firstName={customerInfo.firstName}
        lastName={customerInfo.lastName}
        email={customerInfo.email}
        phone={customerInfo.phone}
        onChange={handleFieldChange}
      />
      <AddressFields
        street={customerInfo.street}
        city={customerInfo.city}
        state={customerInfo.state}
        pincode={customerInfo.pincode}
        onChange={handleFieldChange}
      />
    </div>
  );
};