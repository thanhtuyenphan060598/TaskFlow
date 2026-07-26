import type { LabelHTMLAttributes, ReactNode } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  className?: string;
};

export function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label className={`text-sm font-medium text-text ${className}`} {...props}>
      {children}
    </label>
  );
}
