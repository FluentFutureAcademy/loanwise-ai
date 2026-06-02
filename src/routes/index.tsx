import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Wizard } from "@/components/wizard";
import { ResultScreen } from "@/components/result";
import { EligibilitySimulator } from "@/components/eligibility-simulator";
import { Faq } from "@/components/faq";
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
  const [submission, setSubmission] = useState<{ data: FormData; result: ScoreResult } | null>(null);

  const handleSubmit = (d: FormData) => setSubmission({ data: d, result: calculateScore(d) });
  const scrollToApply = () => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero onApply={scrollToApply} />
        <HowItWorks />
        <EligibilitySimulator />
        <Wizard onSubmit={handleSubmit} />
        <Faq />
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} LumenLoan · Decisions powered by transparent AI
      </footer>
      {submission && (
        <ResultScreen result={submission.result} data={submission.data} onReset={() => setSubmission(null)} />
      )}
    </div>
  );
}
