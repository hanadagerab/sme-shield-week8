import type { EconomicResult } from "./economics";

export type DecisionState = "GO" | "TEST" | "NO_GO";

export type DecisionInputs = {
  economics: EconomicResult;
  hasAccountableReviewer: boolean;
  requiresProhibitedSensitiveData: boolean;
  willingnessToFundValidated: boolean;
  memberParticipationValidated: boolean;
  materialCostInputsValidated: boolean;
  nextValidationStepDefined: boolean;
};

export type DecisionResult = {
  state: DecisionState;
  label: "GO" | "TEST" | "NO-GO";
  reason: string;
  unresolvedAssumptions: string[];
};

export function getPayerDecision(
  inputs: DecisionInputs,
): DecisionResult {
  if (!inputs.economics.fundedHumanEscalation) {
    return {
      state: "NO_GO",
      label: "NO-GO",
      reason:
        "Mandatory human escalation is not funded. The pilot cannot proceed by lowering the consequence threshold.",
      unresolvedAssumptions: [],
    };
  }

  if (!inputs.economics.withinExistingBudget) {
    return {
      state: "NO_GO",
      label: "NO-GO",
      reason:
        "Modeled delivery cost exceeds the entered existing budget and no alternative funding source is defined.",
      unresolvedAssumptions: [],
    };
  }

  if (!inputs.hasAccountableReviewer) {
    return {
      state: "NO_GO",
      label: "NO-GO",
      reason:
        "A consequential case exists but there is no accountable qualified reviewer.",
      unresolvedAssumptions: [],
    };
  }

  if (inputs.requiresProhibitedSensitiveData) {
    return {
      state: "NO_GO",
      label: "NO-GO",
      reason:
        "The proposed design would require prohibited sensitive-data concentration.",
      unresolvedAssumptions: [],
    };
  }

  const unresolvedAssumptions: string[] = [];

  if (!inputs.willingnessToFundValidated) {
    unresolvedAssumptions.push("Intermediary willingness to fund is unvalidated.");
  }

  if (!inputs.memberParticipationValidated) {
    unresolvedAssumptions.push("Member participation is unknown.");
  }

  if (!inputs.materialCostInputsValidated) {
    unresolvedAssumptions.push("Material delivery-cost inputs are still modeled.");
  }

  if (
    unresolvedAssumptions.length > 0 ||
    !inputs.nextValidationStepDefined
  ) {
    return {
      state: "TEST",
      label: "TEST",
      reason:
        "The economics fit, but material assumptions still require a bounded pilot before approval.",
      unresolvedAssumptions,
    };
  }

  return {
    state: "GO",
    label: "GO",
    reason:
      "Enough evidence exists to justify a limited pilot. This does not mean the business model, market demand, or cybersecurity outcome is proven.",
    unresolvedAssumptions: [],
  };
}
