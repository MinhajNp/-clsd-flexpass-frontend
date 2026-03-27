import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { clsx } from "clsx";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
}

const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div
        className={clsx(
          "flex items-center rounded-xl border bg-gray-50 px-3.5 transition-all duration-200",
          "focus-within:ring-2 focus-within:ring-flex-primary/40 focus-within:border-flex-primary",
          error
            ? "border-red-400 focus-within:ring-red-200 focus-within:border-red-400"
            : "border-gray-200"
        )}
      >
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="w-full bg-transparent py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-0.5" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
