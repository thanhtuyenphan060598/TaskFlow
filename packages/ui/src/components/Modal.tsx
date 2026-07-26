import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { Button } from "./Button";

export type ModalProps = {
  children: ReactNode;
  trigger: ReactNode;
  description?: string;
  title: string;
};

export function Modal({ children, trigger, description, title }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface rounded-md p-md shadow-lg">
          <Dialog.Title className="text-text font-medium">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="text-text">{description}</Dialog.Description>
          )}
          {children}
          <Dialog.Close asChild>
            <Button variant="secondary">Close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
