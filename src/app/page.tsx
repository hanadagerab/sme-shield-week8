export default function Home() {
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
            <MetricCard value="10" label="Fictional practices" />
            <MetricCard value="4" label="Protection checks" />
            <MetricCard value="1" label="Mandatory escalation" />
            <MetricCard value="MXN" label="Existing budget" />
            <MetricCard value="Modeled" label="Delivery cost" />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="mb-7">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                Decision workflow
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                What Mariana needs to review
              </h2>
            </div>

            <div className="space-y-4">
              <WorkflowRow
                number="01"
                title="Cohort"
                description="Review the 10 fictional dental practices included in the proposed pilot."
              />
              <WorkflowRow
                number="02"
                title="Protection evidence"
                description="See narrow evidence states without pretending the product knows more than it does."
              />
              <WorkflowRow
                number="03"
                title="Human escalation"
                description="Confirm that consequential cases reach qualified human review regardless of price tier."
              />
              <WorkflowRow
                number="04"
                title="Payer economics"
                description="Enter an existing annual support budget and compare it with modeled delivery cost."
              />
              <WorkflowRow
                number="05"
                title="Decision"
                description="Receive a deterministic GO, TEST, or NO-GO result before any AI-generated narrative."
              />
            </div>
          </div>

          <aside className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
              Operating principle
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Human judgment stays at the consequence boundary.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Serious cases reach a qualified human regardless of budget or
              payer tier.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-slate-300">
                This prototype will never use budget to downgrade a mandatory
                escalation.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <PlaceholderCard
            eyebrow="Evidence"
            title="Confirmed"
            text="A narrow check produced evidence supporting the exact claim."
          />
          <PlaceholderCard
            eyebrow="Evidence"
            title="Assumption"
            text="The value is simulated, entered by the user, or not independently verified."
          />
          <PlaceholderCard
            eyebrow="Evidence"
            title="Could not check"
            text="The service, target, or evidence was unavailable or inconclusive."
          />
          <PlaceholderCard
            eyebrow="Evidence"
            title="Escalate"
            text="The consequence threshold requires qualified human judgment."
          />
        </section>

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

function WorkflowRow({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
        {number}
      </div>

      <div>
        <h3 className="font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function PlaceholderCard({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
