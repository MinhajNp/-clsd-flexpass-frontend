import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { clsx } from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, type = "text", error, helperText, required, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={clsx("flex flex-col gap-1.5 w-full", className)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-semibold text-gray-700 flex items-center gap-0.5"
          >
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}

        <div
          className={clsx(
            "flex items-center rounded-xl border bg-gray-50 px-4 transition-all duration-200 outline-none",
            "focus-within:ring-2 focus-within:ring-flex-primary/20 focus-within:border-flex-primary",
            error
              ? "border-red-500 focus-within:ring-red-50 focus-within:border-red-500"
              : "border-gray-200 focus-within:bg-white"
          )}
        >
          <input
            {...props}
            id={id}
            ref={ref}
            type={inputType}
            className="w-full bg-transparent py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4.5 w-4.5" />
              ) : (
                <Eye className="h-4.5 w-4.5" />
              )}
            </button>
          )}
        </div>

        {error ? (
          <p className="text-[11px] font-medium text-red-500 flex items-center gap-1.5 px-1">
            <span className="w-1 h-1 rounded-full bg-red-500" />
            {error}
          </p>
        ) : helperText ? (
          <p className="text-[11px] text-gray-500 px-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
