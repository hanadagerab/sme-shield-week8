import OpenAI from "openai";
import { NextResponse } from "next/server";

type PayerCaseRequest = {
  decision: "GO" | "TEST" | "NO-GO";
  budgetMXN: number;
  totalDeliveryCostMXN: number;
  costPerPracticeMXN: number;
  humanEscalationReserveMXN: number;
  budgetHeadroomMXN: number;
  unresolvedAssumptions: string[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PayerCaseRequest;

    if (
      !body ||
      !["GO", "TEST", "NO-GO"].includes(body.decision) ||
      !Number.isFinite(body.budgetMXN) ||
      !Number.isFinite(body.totalDeliveryCostMXN) ||
      !Number.isFinite(body.costPerPracticeMXN) ||
      !Number.isFinite(body.humanEscalationReserveMXN) ||
      !Number.isFinite(body.budgetHeadroomMXN) ||
      !Array.isArray(body.unresolvedAssumptions)
    ) {
      return NextResponse.json(
        { error: "Invalid structured payer-case input." },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "AI narrative is unavailable because the server API key is not configured.",
        },
        { status: 503 },
      );
    }

    const client = new OpenAI({ apiKey });

    const structuredEvidence = {
      decision: body.decision,
      economics: {
        existingBudgetMXN: body.budgetMXN,
        totalDeliveryCostMXN: body.totalDeliveryCostMXN,
        costPerPracticeMXN: body.costPerPracticeMXN,
        humanEscalationReserveMXN: body.humanEscalationReserveMXN,
        budgetHeadroomMXN: body.budgetHeadroomMXN,
      },
      unresolvedAssumptions: body.unresolvedAssumptions,
      fixedFacts: [
        "The cohort contains 10 fictional dental practices.",
        "All pilot data is simulated.",
        "No real PII, credentials, patient data, or breach data is used.",
        "At least one consequential case requires qualified human review.",
        "Budget does not change the mandatory human-escalation threshold.",
        "The human-escalation reserve is already included in total delivery cost.",
        "The deterministic decision was calculated before this AI call.",
      ],
      forbiddenClaims: [
        "Do not claim willingness to pay is proven.",
        "Do not claim ROI is proven.",
        "Do not claim breaches will be prevented.",
        "Do not claim financial losses will be avoided.",
        "Do not claim market demand is proven.",
        "Do not change or reinterpret the deterministic decision.",
      ],
    };

    const response = await client.responses.create({
      model: "gpt-6-luna",
      instructions: `
You are writing a concise board-style payer case for a simulated SME cybersecurity pilot.

The deterministic decision has already been made by code. Preserve it exactly.

Write in plain professional English for a non-technical member-services director.

Use exactly these headings:

DECISION
WHAT WE KNOW
WHAT IS SIMULATED
ECONOMICS
WHY THIS PAYER MIGHT CARE
WHAT WE CANNOT CLAIM
NEXT TEST

Rules:
- Never invent ROI.
- Never claim breach prevention.
- Never claim willingness to pay.
- Never claim market demand.
- Never imply the practices are "safe".
- Never override the deterministic decision.
- Keep the total response under 450 words.
      `.trim(),
      input: JSON.stringify(structuredEvidence, null, 2),
    });

    return NextResponse.json({
      summary: response.output_text,
    });
  } catch (error) {
    console.error("Payer-case generation failed:", error);

    return NextResponse.json(
      {
        error:
          "AI-assisted summary could not be generated. The deterministic decision remains valid.",
      },
      { status: 500 },
    );
  }
}
