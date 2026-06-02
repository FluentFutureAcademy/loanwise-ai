import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, AlertTriangle, RotateCcw } from "lucide-react";
import type { ScoreResult } from "@/lib/scoring";
import { cn } from "@/lib/utils";

function Gauge({ score, color }: { score: number; color: string }) {
  const progress = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const offset = useTransform(progress, (v) => 691.15 - (691.15 * v) / 100);

  useEffect(() => {
    const c = animate(progress, score, {
      duration: 2, ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return c.stop;
  }, [progress, score]);

  return (
    <div className="relative grid place-items-center">
      <svg width="260" height="260" viewBox="0 0 260 260" className="-rotate-90">
        <circle cx="130" cy="130" r="110" stroke="var(--border)" strokeWidth="14" fill="none" />
        <motion.circle
          cx="130" cy="130" r="110" fill="none"
          stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray="691.15"
          style={{ strokeDashoffset: offset, filter: `drop-shadow(0 0 16px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-6xl font-bold tabular-nums" style={{ color }}>{display}</div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">/ 100 Score</div>
        </div>
      </div>
    </div>
  );
}

export function ResultScreen({ result, onReset }: { result: ScoreResult; onReset: () => void }) {
  const approved = result.decision === "APPROVED";
  const conditional = result.decision === "CONDITIONAL";
  const color =
    result.score >= 70 ? "oklch(0.78 0.18 155)" :
    result.score >= 50 ? "oklch(0.85 0.16 85)" :
    "oklch(0.65 0.24 25)";

  useEffect(() => {
    if (approved || conditional) {
      const burst = () => {
        confetti({
          particleCount: 120, spread: 80, origin: { y: 0.4 },
          colors: ["#00E5FF", "#00BCD4", "#4ade80", "#ffffff"],
        });
      };
      burst();
      setTimeout(burst, 400);
    }
  }, [approved, conditional]);

  const Icon = approved ? CheckCircle2 : conditional ? AlertTriangle : XCircle;
  const headline =
    approved ? "Congratulations! Your Loan is Approved" :
    conditional ? "Approved With Conditions" :
    "Application Needs Review";

  return (
    <motion.section
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 overflow-y-auto bg-background"
    >
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mx-auto"
          >
            <motion.div
              animate={!approved && !conditional ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={cn(
                "mx-auto grid h-24 w-24 place-items-center rounded-full",
                approved && "bg-success/20 text-success",
                conditional && "bg-warning/20 text-warning",
                !approved && !conditional && "bg-destructive/20 text-destructive",
              )}
              style={{ boxShadow: `0 0 60px ${color}` }}
            >
              <Icon className="h-12 w-12" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-8 text-4xl md:text-5xl font-bold tracking-tight"
          >
            {headline}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-10 glass rounded-3xl p-8 md:p-10"
          >
            <Gauge score={result.score} color={color} />

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={{ background: `${color}25`, color }}
              >
                {result.decision}
              </span>
              <span className="rounded-full px-4 py-2 text-sm font-semibold glass">
                Risk Level: {result.risk}
              </span>
            </div>

            <div className="mt-8 text-left">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Score Breakdown
              </h3>
              <div className="space-y-2">
                {result.breakdown.map((b) => (
                  <div key={b.label} className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-2.5 text-sm">
                    <span className="text-foreground/90">{b.label}</span>
                    <span className="font-semibold text-primary tabular-nums">+{b.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <button
            onClick={onReset}
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-primary/40 px-6 py-3 text-sm font-semibold hover:bg-primary/10 transition-colors"
          >
            <RotateCcw className="h-4 w-4" /> Start a new application
          </button>
        </div>
      </div>
    </motion.section>
  );
}
