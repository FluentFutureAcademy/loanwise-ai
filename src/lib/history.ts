import type { FormData, ScoreResult } from "./scoring";

export type HistoryRecord = {
  id: string;
  date: number;
  data: FormData;
  result: ScoreResult;
};

const KEY = "lumenloan_history";

export function loadHistory(): HistoryRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveHistory(rec: HistoryRecord) {
  const list = loadHistory();
  list.unshift(rec);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
  window.dispatchEvent(new Event("lumenloan:history"));
}

export function deleteHistory(id: string) {
  const list = loadHistory().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("lumenloan:history"));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("lumenloan:history"));
}

const PREFILL_KEY = "lumenloan_prefill";
export function setPrefill(data: Partial<FormData>) {
  sessionStorage.setItem(PREFILL_KEY, JSON.stringify(data));
}
export function consumePrefill(): Partial<FormData> | null {
  const v = sessionStorage.getItem(PREFILL_KEY);
  if (!v) return null;
  sessionStorage.removeItem(PREFILL_KEY);
  try { return JSON.parse(v); } catch { return null; }
}

export function fmtPKR(n: number) {
  return "₨ " + Math.round(n).toLocaleString("en-PK");
}

export function calcEMI(principal: number, annualRate: number, months: number) {
  if (months <= 0 || principal <= 0) return 0;
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}
