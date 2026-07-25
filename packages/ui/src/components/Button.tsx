import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}
