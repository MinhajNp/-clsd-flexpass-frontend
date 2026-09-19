import Input from "../../../components/ui/Input";
import type { GymApplicationData } from "../types/gym.types";

interface FormProps {
  data: Partial<GymApplicationData>;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

const GymInfoForm = ({ data, onChange, errors }: FormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <Input
        id="gymName"
        label="Gym Name"
        placeholder="e.g. Iron Pump Fitness"
        required
        value={data.gymName || ""}
        onChange={(e) => onChange("gymName", e.target.value)}
        error={errors?.gymName}
      />
      <Input
        id="city"
        label="City"
        placeholder="e.g. Seattle"
        required
        value={data.city || ""}
        onChange={(e) => onChange("city", e.target.value)}
        error={errors?.city}
      />
      <div className="md:col-span-2">
        <Input
          id="fullAddress"
          label="Full Address"
          placeholder="Street address, area, pincode..."
          required
          value={data.fullAddress || ""}
          onChange={(e) => onChange("fullAddress", e.target.value)}
          error={errors?.fullAddress}
        />
      </div>
      <Input
        id="contactPhone"
        label="Contact Phone Number"
        placeholder="+1 (555) 000-0000"
        required
        value={data.contactPhone || ""}
        onChange={(e) => onChange("contactPhone", e.target.value)}
        error={errors?.contactPhone}
      />
      <Input
        id="officialEmail"
        label="Official Email Address"
        placeholder="contact@gym.com"
        required
        type="email"
        value={data.officialEmail || ""}
        onChange={(e) => onChange("officialEmail", e.target.value)}
        error={errors?.officialEmail}
      />
    </div>
  );
};

export default GymInfoForm;
