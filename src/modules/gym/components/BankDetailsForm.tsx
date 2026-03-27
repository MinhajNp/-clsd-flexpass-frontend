import { Lock } from "lucide-react";
import Input from "../../../components/ui/Input";
import type { GymApplicationData } from "../types/gym.types";

interface FormProps {
  data: Partial<GymApplicationData["bankDetails"]>;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

const BankDetailsForm = ({ data, onChange, errors }: FormProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <Input
          id="accountHolder"
          label="Account Holder Name"
          placeholder="e.g. Iron Pump Fitness PVT LTD"
          required
          value={data?.accountHolder || ""}
          onChange={(e) => onChange("accountHolder", e.target.value)}
          error={errors?.accountHolder}
        />
        <Input
          id="bankName"
          label="Bank Name"
          placeholder="e.g. JPMorgan Chase"
          required
          value={data?.bankName || ""}
          onChange={(e) => onChange("bankName", e.target.value)}
          error={errors?.bankName}
        />
        <Input
          id="accountNumber"
          label="Account Number"
          placeholder="000000000000"
          required
          value={data?.accountNumber || ""}
          onChange={(e) => onChange("accountNumber", e.target.value)}
          error={errors?.accountNumber}
        />
        <Input
          id="ifscCode"
          label="IFSC Code"
          placeholder="e.g. JPMC0001234"
          required
          value={data?.ifscCode || ""}
          onChange={(e) => onChange("ifscCode", e.target.value)}
          error={errors?.ifscCode}
        />
      </div>

      <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
        <p className="text-sm text-gray-600 font-medium leading-relaxed">
          Bank details are required for gym payout processing after approval. All details are securely encrypted.
        </p>
      </div>
    </div>
  );
};

export default BankDetailsForm;
