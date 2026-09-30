"use client";

import { useMemo, useState } from "react";
import {
  calculateEconomics,
  DEFAULT_COST_ASSUMPTIONS,
} from "@/lib/economics";
import { getPayerDecision } from "@/lib/decision";

const MAX_BUDGET = 10_000_000;
const DEFAULT_BUDGET = 60_000;

function formatMXN(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PayerModel() {
  const [budgetInput, setBudgetInput] = useState(String(DEFAULT_BUDGET));

  const parsedBudget = Number(budgetInput);
  const budgetIsValid =
    budgetInput.trim() !== "" &&
    Number.isFinite(parsedBudget) &&
    parsedBudget >= 0 &&
    parsedBudget <= MAX_BUDGET;

  const economics = useMemo(
    () =>
      calculateEconomics({
        ...DEFAULT_COST_ASSUMPTIONS,
        existingAnnualBudgetMXN: budgetIsValid ? parsedBudget : 0,
      }),
    [budgetIsValid, parsedBudget],
  );

  const decision = getPayerDecision({
    economics,
    hasAccountableReviewer: true,
    requiresProhibitedSensitiveData: false,
    willingnessToFundValidated: false,
    memberParticipationValidated: false,
    materialCostInputsValidated: false,
    nextValidationStepDefined: true,
  });

  const decisionClass =
    decision.state === "NO_GO"
      ? "border-rose-200 bg-rose-50 text-rose-950"
      : decision.state === "GO"
        ? "border-emerald-200 bg-emerald-50 text-emerald-950"
        : "border-amber-200 bg-amber-50 text-amber-950";

  return (
    <section className="mt-12" id="payer-model">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
          Payer model
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          Does delivery fit an existing budget?
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Change the annual member-support budget. Delivery economics will
          recalculate immediately. The human-escalation threshold does not
          change.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <label
            htmlFor="annual-budget"
            className="text-sm font-semibold text-slate-900"
          >
            Existing annual member-support budget
          </label>

          <div className="mt-3 flex items-center rounded-2xl border border-slate-300 bg-white px-4 focus-within:border-slate-500">
            <span className="mr-2 text-slate-500">MXN</span>
            <input
              id="annual-budget"
              inputMode="numeric"
              value={budgetInput}
              onChange={(event) => setBudgetInput(event.target.value)}
              className="w-full bg-transparent py-4 text-2xl font-semibold outline-none"
              aria-describedby="budget-help"
            />
          </div>

          <p id="budget-help" className="mt-2 text-sm leading-6 text-slate-500">
            Enter a value from MXN 0 to MXN 10,000,000.
          </p>

          {!budgetIsValid && (
            <div
              role="alert"
              className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800"
            >
              Enter a valid non-negative budget no greater than MXN 10,000,000.
            </div>
          )}

          <div className="mt-7 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-950">
                Modeled cost assumptions
              </h3>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
                ASSUMPTION
              </span>
            </div>

            <dl className="mt-5 space-y-4 text-sm">
              <CostRow
                label="One-time onboarding"
                value={formatMXN(DEFAULT_COST_ASSUMPTIONS.onboardingCostMXN)}
              />
              <CostRow
                label="Routine delivery / practice"
                value={formatMXN(
                  DEFAULT_COST_ASSUMPTIONS.routineDeliveryCostPerPracticeMXN,
                )}
              />
              <CostRow
                label="Human escalation reserve"
                value={formatMXN(
                  DEFAULT_COST_ASSUMPTIONS.humanEscalationReserveMXN,
                )}
              />
              <CostRow
                label="Member communication"
                value={formatMXN(
                  DEFAULT_COST_ASSUMPTIONS.optionalCommunicationCostMXN,
                )}
              />
            </dl>

            <p className="mt-5 text-xs leading-5 text-slate-500">
              These are simulated delivery-cost inputs for the Week 8 pilot.
              They are not market quotes and do not represent proven
              willingness to pay.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard
              label="Total delivery cost"
              value={formatMXN(economics.totalDeliveryCostMXN)}
            />
            <ResultCard
              label="Cost per practice"
              value={formatMXN(economics.costPerPracticeMXN)}
            />
            <ResultCard
              label="Human escalation reserve"
              value={formatMXN(economics.humanEscalationReserveMXN)}
            />
            <ResultCard
              label={economics.budgetHeadroomMXN >= 0 ? "Budget headroom" : "Budget gap"}
              value={formatMXN(Math.abs(economics.budgetHeadroomMXN))}
            />
          </div>

          <div className={`rounded-3xl border p-7 ${decisionClass}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] opacity-70">
              Deterministic decision
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <span className="text-5xl font-semibold tracking-tight">
                {budgetIsValid ? decision.label : "—"}
              </span>

              <span className="rounded-full border border-current/20 px-3 py-1 text-xs font-semibold">
                NO LLM INVOLVED
              </span>
            </div>

            <p className="mt-5 max-w-2xl leading-7">
              {budgetIsValid
                ? decision.reason
                : "Enter a valid budget before the payer decision is evaluated."}
            </p>

            {budgetIsValid &&
              decision.state === "TEST" &&
              decision.unresolvedAssumptions.length > 0 && (
                <div className="mt-6 border-t border-current/15 pt-5">
                  <p className="text-sm font-semibold">
                    Why this remains TEST
                  </p>

                  <ul className="mt-3 space-y-2 text-sm leading-6">
                    {decision.unresolvedAssumptions.map((assumption) => (
                      <li key={assumption}>• {assumption}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Decision boundary
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Budget affects</p>
                <p className="mt-1 font-semibold text-slate-950">
                  Economic feasibility
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Budget does not affect</p>
                <p className="mt-1 font-semibold text-slate-950">
                  Mandatory human escalation
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-950">
                What TEST means
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The modeled economics fit the entered budget, but this is not
                yet evidence of willingness to fund, member participation, ROI,
                or avoided cyber losses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CostRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-slate-600">{label}</dt>
      <dd className="font-semibold text-slate-950">{value}</dd>
    </div>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}
