import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary",
  size = "md",
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-100",
    secondary: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
    accent: "bg-gradient-to-r from-accent to-accent/90 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-100",
    ghost: "text-gray-700 hover:bg-surface",
    danger: "bg-gradient-to-r from-error to-error/90 text-white shadow-md hover:shadow-lg"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;