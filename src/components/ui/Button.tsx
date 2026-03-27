import { MoveRight } from "lucide-react";
import { clsx } from "clsx";

interface ButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  label: string;
  loading?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  showArrow?: boolean;
}

const Button = ({
  id,
  type = "submit",
  label,
  loading = false,
  onClick,
  fullWidth = true,
  showArrow = true,
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      disabled={loading}
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center gap-2 rounded-xl py-3.5 px-6",
        "bg-flex-primary text-white font-semibold text-sm",
        "transition-all duration-200",
        "hover:bg-[#26504A] active:scale-[0.98]",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100",
        fullWidth ? "w-full" : ""
      )}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Please wait…</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          {showArrow && <MoveRight className="h-4 w-4" />}
        </>
      )}
    </button>
  );
};

export default Button;
