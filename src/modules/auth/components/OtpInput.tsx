import { KeyboardEvent, ClipboardEvent, useRef, useState, useEffect } from "react";
import { clsx } from "clsx";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

const OtpInput = ({ length = 6, value, onChange }: OtpInputProps) => {
  const [internalOtp, setInternalOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Sync external value with internal state
    if (value.length <= length) {
      const newOtp = value.split("");
      while (newOtp.length < length) newOtp.push("");
      setInternalOtp(newOtp);
    }
  }, [value, length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    
    // allow only digits
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...internalOtp];
    const newDigit = val.substring(val.length - 1); // taking the last digit if multiple were somehow typed
    newOtp[index] = newDigit;

    setInternalOtp(newOtp);
    onChange(newOtp.join(""));

    // Move to next input if filled
    if (newDigit && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default backspace behavior

      const newOtp = [...internalOtp];
      
      if (internalOtp[index]) {
        // Clear current index if it has a value
        newOtp[index] = "";
        setInternalOtp(newOtp);
        onChange(newOtp.join(""));
      } else if (index > 0 && inputRefs.current[index - 1]) {
        // If current is empty, move focus to previous and clear it
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setInternalOtp(newOtp);
        onChange(newOtp.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...internalOtp];
    for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
    }
    setInternalOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus next empty or the last one
    const focusIndex = Math.min(pastedData.length, length - 1);
    if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center w-full my-6">
      {internalOtp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={clsx(
            "w-10 h-12 sm:w-[52px] sm:h-14 text-center text-xl font-semibold text-gray-900",
            "bg-white border rounded-xl outline-none transition-all duration-200 shadow-sm",
            "focus:ring-2 focus:ring-flex-primary/40 focus:border-flex-primary",
            digit ? "border-flex-primary text-flex-primary" : "border-gray-300 hover:border-gray-400"
          )}
        />
      ))}
    </div>
  );
};

export default OtpInput;
