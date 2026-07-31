import type { ReactNode } from "react";
import { SidebarNav } from "./sidebar-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-full">
      <aside className="w-56 border-r border-border bg-surface p-4">
        <SidebarNav />
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="border-b border-border px-6 py-4">
          <span className="text-sm text-text">TaskFlow</span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
