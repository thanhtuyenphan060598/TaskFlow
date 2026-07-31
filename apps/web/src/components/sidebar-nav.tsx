import Link from "next/link";

export function SidebarNav() {
  return (
    <nav className="flex flex-col gap-2">
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/tasks">Tasks</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  );
}
