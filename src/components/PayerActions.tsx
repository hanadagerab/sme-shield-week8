"use client";

import { useState } from "react";

type Props = {
  decision: "GO" | "TEST" | "NO-GO";
  budgetMXN: number;
  totalDeliveryCostMXN: number;
  costPerPracticeMXN: number;
  humanEscalationReserveMXN: number;
  budgetHeadroomMXN: number;
  unresolvedAssumptions: string[];
};

export default function PayerActions({
  decision,
  budgetMXN,
  totalDeliveryCostMXN,
  costPerPracticeMXN,
  humanEscalationReserveMXN,
  budgetHeadroomMXN,
  unresolvedAssumptions,
}: Props) {
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateSummary() {
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch("/api/payer-case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decision,
          budgetMXN,
          totalDeliveryCostMXN,
          costPerPracticeMXN,
          humanEscalationReserveMXN,
          budgetHeadroomMXN,
          unresolvedAssumptions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI-assisted summary failed.");
      }

      setSummary(data.summary);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "AI-assisted summary could not be generated.",
      );
    } finally {
      setLoading(false);
    }
  }

  function exportBoardSummary() {
    window.print();
  }

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm print:border-0 print:shadow-none">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
        Board tools
      </p>

      <h3 className="mt-2 text-2xl font-semibold text-slate-950">
        Explain the decision without changing it
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
        The AI receives structured evidence only after the deterministic payer
        decision is complete. It can explain the result, but it cannot change
        the economics, escalation rule, or decision state.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <button
          type="button"
          onClick={generateSummary}
          disabled={loading}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate payer case"}
        </button>

        <button
          type="button"
          onClick={exportBoardSummary}
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Export board summary
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-slate-300 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-900">
            AI-assisted summary unavailable
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{error}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            The deterministic payer decision above is unaffected.
          </p>
        </div>
      )}

      {summary && (
        <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-900">
              AI-ASSISTED SUMMARY
            </p>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-800">
              Narrative only
            </span>
          </div>

          <pre className="mt-5 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-800">
            {summary}
          </pre>
        </div>
      )}
    </section>
  );
}
