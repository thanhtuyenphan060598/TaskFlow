import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const variantClasses = () => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium";
    switch (variant) {
      case "primary":
        return `${baseClasses} bg-primary text-text-on-primary hover:bg-primary-hover px-button-x py-button-y`;
      case "secondary":
        return `${baseClasses} bg-secondary text-secondary-text hover:bg-secondary-hover px-button-x py-button-y`;
      default:
        return baseClasses;
    }
  };

  return (
    <button type="button" className={`${variantClasses()} ${className}`} {...props}>
      {children}
    </button>
  );
}
