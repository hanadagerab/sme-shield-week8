export type FindingState =
  | "CONFIRMED"
  | "ASSUMPTION"
  | "COULD_NOT_CHECK"
  | "ESCALATE";

export type ControlType =
  | "HTTPS"
  | "HEADERS"
  | "SPF"
  | "DMARC"
  | "EFIRMA_HYGIENE";

export type Finding = {
  control: ControlType;
  label: string;
  state: FindingState;
  evidence: string;
  consequential: boolean;
};

export type Practice = {
  id: string;
  fictionalName: string;
  city: string;
  dataLabel: "SIMULATED";
  findings: Finding[];
};
