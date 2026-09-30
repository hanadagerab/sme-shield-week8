import PayerModel from "@/components/PayerModel";
import { practices } from "@/lib/data";
import {
  getEvidenceSummary,
  getMandatoryEscalations,
  requiresHumanEscalation,
} from "@/lib/evidence";
import type { FindingState } from "@/lib/types";

const evidenceLabels: Record<FindingState, string> = {
  CONFIRMED: "CONFIRMED",
  ASSUMPTION: "ASSUMPTION",
  COULD_NOT_CHECK: "COULD NOT CHECK",
  ESCALATE: "ESCALATE",
};

const evidenceClasses: Record<FindingState, string> = {
  CONFIRMED: "border-emerald-200 bg-emerald-50 text-emerald-800",
  ASSUMPTION: "border-amber-200 bg-amber-50 text-amber-900",
  COULD_NOT_CHECK: "border-slate-300 bg-slate-100 text-slate-700",
  ESCALATE: "border-rose-200 bg-rose-50 text-rose-800",
};

export default function Home() {
  const evidenceSummary = getEvidenceSummary(practices);
  const escalations = getMandatoryEscalations(practices);

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-12">
        <header className="mb-10 flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              SME Shield · Payer Viability Lab
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Free protection is not free delivery.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Can an existing member-support budget fund accountable cyber
              protection for 10 small practices?
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950 shadow-sm">
            <p className="font-semibold">SIMULATED PILOT DATA</p>
            <p className="mt-1 max-w-xs leading-6">
              No real PII, credentials, or breach data.
            </p>
          </div>
        </header>

        <section className="mb-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                Pilot snapshot
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                One decision surface
              </h2>
            </div>

            <p className="hidden max-w-md text-right text-sm leading-6 text-slate-500 md:block">
              The objective is not to convince the payer to buy. The objective
              is to make the pilot decision more defensible.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard
              value={String(practices.length)}
              label="Fictional practices"
            />
            <MetricCard value="4" label="Protection checks" />
            <MetricCard
              value={String(escalations.length)}
              label="Mandatory escalation"
            />
            <MetricCard
              value={String(evidenceSummary.COULD_NOT_CHECK)}
              label="Could not check"
            />
            <MetricCard
              value={String(evidenceSummary.ASSUMPTION)}
              label="Visible assumptions"
            />
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Cohort
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              10 fictional dental practices
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Each practice uses simulated evidence only. The four routine
              checks are HTTPS, security headers, SPF, and DMARC.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {practices.map((practice) => (
              <article
                key={practice.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {practice.id}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                        SIMULATED
                      </span>
                    </div>

                    <h3 className="mt-2 text-xl font-semibold text-slate-950">
                      {practice.fictionalName}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {practice.city}
                    </p>
                  </div>

                  {requiresHumanEscalation(practice) && (
                    <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-800">
                      HUMAN REVIEW
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {practice.findings.map((finding) => (
                    <span
                      key={`${practice.id}-${finding.control}`}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${evidenceClasses[finding.state]}`}
                      title={finding.evidence}
                    >
                      {finding.label}: {evidenceLabels[finding.state]}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-sm lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
              Human escalation
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Serious cases reach a qualified human regardless of price tier.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Budget is not an input to the escalation function. A
              consequential case remains consequential whether the available
              budget is high, low, or zero.
            </p>

            <div className="mt-7 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-200">
                Mandatory review
              </p>
              <p className="mt-2 font-semibold text-white">
                {escalations[0]?.practiceName}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {escalations[0]?.finding.evidence}
              </p>
              <p className="mt-4 text-sm font-semibold text-rose-200">
                Qualified human review required.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Evidence states
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Uncertainty stays visible
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <EvidenceDefinition
                state="CONFIRMED"
                text="A narrow check produced evidence supporting the exact displayed claim."
              />
              <EvidenceDefinition
                state="ASSUMPTION"
                text="The value is simulated, user-entered, or not independently verified."
              />
              <EvidenceDefinition
                state="COULD_NOT_CHECK"
                text="The service, target, or evidence was unavailable or inconclusive."
              />
              <EvidenceDefinition
                state="ESCALATE"
                text="The consequence threshold requires qualified human judgment."
              />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                No generic “safe” state
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                COULD NOT CHECK is never treated as confirmed, successful, or
                safe. The interface shows exactly what the evidence supports.
              </p>
            </div>
          </div>
        </section>

        <PayerModel />

        <footer className="mt-16 border-t border-slate-200 py-8 text-sm text-slate-500">
          SME Shield · Week 8 MONEY build · Simulated pilot only
        </footer>
      </div>
    </main>
  );
}

function MetricCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm leading-5 text-slate-500">{label}</p>
    </div>
  );
}

function EvidenceDefinition({
  state,
  text,
}: {
  state: FindingState;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <span
        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${evidenceClasses[state]}`}
      >
        {evidenceLabels[state]}
      </span>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
