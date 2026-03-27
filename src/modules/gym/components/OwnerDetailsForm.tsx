import Input from "../../../components/ui/Input";
import type { GymApplicationData } from "../types/gym.types";

interface FormProps {
  data: Partial<GymApplicationData>;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

const OwnerDetailsForm = ({ data, onChange, errors }: FormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div className="md:col-span-2">
        <Input
          id="ownerName"
          label="Owner / Manager Name"
          placeholder="Full Name"
          required
          value={data.ownerName || ""}
          onChange={(e) => onChange("ownerName", e.target.value)}
          error={errors?.ownerName}
        />
      </div>
      <Input
        id="ownerContact"
        label="Contact Number"
        placeholder="+1 (555) 000-0000"
        required
        value={data.ownerContact || ""}
        onChange={(e) => onChange("ownerContact", e.target.value)}
        error={errors?.ownerContact}
      />
      <Input
        id="ownerEmail"
        label="Email Address"
        placeholder="owner@email.com"
        required
        type="email"
        value={data.ownerEmail || ""}
        onChange={(e) => onChange("ownerEmail", e.target.value)}
        error={errors?.ownerEmail}
      />
    </div>
  );
};

export default OwnerDetailsForm;
