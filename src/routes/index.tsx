import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Wizard } from "@/components/wizard";
import { ResultScreen } from "@/components/result";
import { calculateScore, type FormData, type ScoreResult } from "@/lib/scoring";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LumenLoan — AI Loan Approval Predictions" },
      { name: "description", content: "Instant AI-powered loan eligibility decisions with transparent scoring and bank-level security." },
      { property: "og:title", content: "LumenLoan — AI Loan Approval Predictions" },
      { property: "og:description", content: "Instant AI-powered loan eligibility decisions with transparent scoring." },
    ],
  }),
  component: Page,
});

function Page() {
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleSubmit = (d: FormData) => setResult(calculateScore(d));
  const scrollToApply = () => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero onApply={scrollToApply} />
          <HowItWorks />
          <Wizard onSubmit={handleSubmit} />
        </main>
        <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LumenLoan · Decisions powered by transparent AI
        </footer>
        {result && <ResultScreen result={result} onReset={() => setResult(null)} />}
      </div>
    </ThemeProvider>
  );
}
