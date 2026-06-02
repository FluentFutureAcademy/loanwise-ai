import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "./theme-provider";

export function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-cyan glow-cyan">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="text-lg">Lumen<span className="text-gradient-cyan">Loan</span></span>
        </a>
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#apply" className="hover:text-foreground transition-colors">Apply</a>
          <a href="#trust" className="hover:text-foreground transition-colors">Why us</a>
        </nav>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card hover:bg-accent transition-colors"
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4 text-primary" />}
        </button>
      </div>
    </header>
  );
}
