import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoFieldsProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoFields = ({
  firstName,
  lastName,
  email,
  phone,
  onChange,
}: PersonalInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onChange('email', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">WhatsApp Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onChange('phone', e.target.value)}
          required
        />
      </div>
    </div>
  );
};