import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md border border-border bg-surface px-button-x py-button-y text-sm text-text outline-none focus:border-primary ${className}`}
      {...props}
    />
  );
}
