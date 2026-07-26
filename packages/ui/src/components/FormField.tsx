import type { ReactNode } from "react";
import { Label } from "./Label";

export type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FormField({ label, htmlFor, error, children, className = "" }: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
