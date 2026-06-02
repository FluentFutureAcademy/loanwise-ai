import type { ReactNode } from "react";
import { Navbar } from "./navbar";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">{children}</main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} LumenLoan · Decisions powered by transparent AI
      </footer>
    </div>
  );
}
