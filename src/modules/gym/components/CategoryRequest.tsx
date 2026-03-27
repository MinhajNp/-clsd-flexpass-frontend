import { Info } from "lucide-react";
import type { GymCategory } from "../types/gym.types";

interface CategoryProps {
  value: GymCategory;
  onChange: (value: GymCategory) => void;
}

const CategoryRequest = ({ value, onChange }: CategoryProps) => {
  const categories: { id: GymCategory; label: string }[] = [
    { id: "BASIC", label: "Basic Gym" },
    { id: "STANDARD", label: "Standard Gym" },
    { id: "PREMIUM", label: "Premium Gym" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-8">
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name="gymCategory"
                value={cat.id}
                checked={value === cat.id}
                onChange={() => onChange(cat.id)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-flex-primary transition-all"
              />
              <span className="absolute h-2.5 w-2.5 rounded-full bg-flex-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {cat.label}
            </span>
          </label>
        ))}
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-700 font-medium leading-relaxed">
          Final category will be assigned after verification.
        </p>
      </div>
    </div>
  );
};

export default CategoryRequest;
