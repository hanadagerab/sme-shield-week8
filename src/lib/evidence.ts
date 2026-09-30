import type { FindingState, Practice } from "./types";

export function getEvidenceSummary(practices: Practice[]) {
  const summary: Record<FindingState, number> = {
    CONFIRMED: 0,
    ASSUMPTION: 0,
    COULD_NOT_CHECK: 0,
    ESCALATE: 0,
  };

  for (const practice of practices) {
    for (const finding of practice.findings) {
      summary[finding.state] += 1;
    }
  }

  return summary;
}

export function getMandatoryEscalations(practices: Practice[]) {
  return practices.flatMap((practice) =>
    practice.findings
      .filter((finding) => finding.consequential || finding.state === "ESCALATE")
      .map((finding) => ({
        practiceId: practice.id,
        practiceName: practice.fictionalName,
        finding,
      })),
  );
}

export function requiresHumanEscalation(practice: Practice) {
  return practice.findings.some(
    (finding) => finding.consequential || finding.state === "ESCALATE",
  );
}
