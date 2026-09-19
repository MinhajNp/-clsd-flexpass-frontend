import { MoveRight } from "lucide-react";
import { clsx } from "clsx";
import Loader from "./Loader";

interface ButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  label?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
  fullWidth?: boolean;
  showArrow?: boolean;
  className?: string;
}

const Button = ({
  id,
  type = "button",
  label,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  fullWidth = false,
  showArrow = false,
  className,
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: "bg-[#2D5A53] text-white hover:bg-[#234741]",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border-2 border-[#2D5A53] text-[#2D5A53] hover:bg-[#2D5A53] hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    sm: "py-1.5 px-3 text-xs",
    md: "py-2.5 px-5 text-sm",
    lg: "py-3.5 px-8 text-base",
  };

  return (
    <button
      id={id}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      )}
    >
      {loading ? (
        <>
          <Loader size="xs" variant={variant === 'primary' ? 'white' : 'primary'} />
          <span>{label ? "Processing…" : "Please wait…"}</span>
        </>
      ) : (
        <>
          {children || <span>{label}</span>}
          {showArrow && <MoveRight className="h-4 w-4" />}
        </>
      )}
    </button>
  );
};

export default Button;
