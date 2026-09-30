export type EconomicInputs = {
  cohortSize: number;
  existingAnnualBudgetMXN: number;
  onboardingCostMXN: number;
  routineDeliveryCostPerPracticeMXN: number;
  humanEscalationReserveMXN: number;
  optionalCommunicationCostMXN: number;
};

export type EconomicResult = EconomicInputs & {
  totalDeliveryCostMXN: number;
  costPerPracticeMXN: number;
  budgetHeadroomMXN: number;
  withinExistingBudget: boolean;
  fundedHumanEscalation: boolean;
};

export const DEFAULT_COST_ASSUMPTIONS = {
  cohortSize: 10,
  onboardingCostMXN: 12000,
  routineDeliveryCostPerPracticeMXN: 1800,
  humanEscalationReserveMXN: 15000,
  optionalCommunicationCostMXN: 5000,
} as const;

export function calculateEconomics(
  inputs: EconomicInputs,
): EconomicResult {
  const totalDeliveryCostMXN =
    inputs.onboardingCostMXN +
    inputs.routineDeliveryCostPerPracticeMXN * inputs.cohortSize +
    inputs.humanEscalationReserveMXN +
    inputs.optionalCommunicationCostMXN;

  const costPerPracticeMXN =
    inputs.cohortSize > 0 ? totalDeliveryCostMXN / inputs.cohortSize : 0;

  const budgetHeadroomMXN =
    inputs.existingAnnualBudgetMXN - totalDeliveryCostMXN;

  return {
    ...inputs,
    totalDeliveryCostMXN,
    costPerPracticeMXN,
    budgetHeadroomMXN,
    withinExistingBudget: budgetHeadroomMXN >= 0,
    fundedHumanEscalation: inputs.humanEscalationReserveMXN > 0,
  };
}
