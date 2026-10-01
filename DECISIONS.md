# DECISIONS — SME Shield · Payer Viability Lab

## Session 1 — Repository setup

### Decision
SME Shield is the primary Week 8 team vacuum.

### Why
The MONEY working slice tests whether an intermediary can fund accountable SME cybersecurity delivery and mandatory human escalation using existing spending.

### Rejected alternative
Talent Bridge is parked for this week because the access hypothesis cannot be tested honestly without MSSP access.

### Build decisions
- MONEY slice tests payer / delivery viability.
- No real PII or credentials.
- No database.
- No Supabase.
- No hypothetical breach-avoidance ROI.
- LLM explains; deterministic code decides.
- Serious-case escalation is independent of payer tier.
- Free incumbents are benchmarks, not features to repackage.
- Fictional seed data only.
- Terminal-first workflow.
- Optimize for a simple architecture that works reliably on Vercel.

### Unresolved risk
We still need to validate whether the modeled delivery economics are credible enough for an intermediary payer.

### Tomorrow's first move
Scaffold the minimal Next.js + TypeScript application after the packet has been committed.

---

## Session Close — Final Week 8 Build

### What changed
- Built a single-page SME Shield · Payer Viability Lab.
- Added exactly 10 fictional dental practices.
- Added four evidence states: CONFIRMED, ASSUMPTION, COULD NOT CHECK, ESCALATE.
- Added mandatory human escalation that does not change with budget.
- Added transparent payer economics and deterministic GO / TEST / NO-GO logic.
- Added AI-assisted payer narrative after the deterministic decision.
- Added browser print / print-to-PDF export.
- Added cost provenance after persona testing.

### Mechanical test cycle
A real bug was found after Deploy 1:

Formatted budget values such as `60,000` were rejected because the input parser passed the comma-formatted string directly to JavaScript `Number()`.

Expected:
`60,000` should behave like `60000`.

Actual:
The formatted input was rejected as invalid.

Fix:
Normalize commas and whitespace before numeric validation.

Result:
`60,000` now returns TEST with MXN 10,000 headroom.
`40,000` now returns NO-GO with MXN 10,000 gap.

The fix was committed, pushed, redeployed, and verified in production.

### Persona test
Persona:
Mariana Torres, 43, Member Services Director at a fictional Mexican dental association.

Single worst confusion:
She could not tell whether the modeled cost figures were simple placeholders or estimates she was expected to defend in a board-level funding decision.

Single persona-test fix:
Added a visible Basis line beside each modeled cost assumption and a provenance note explaining that all cost inputs remain simulated planning assumptions.

Why:
The fix makes the economics explainable without pretending the assumptions are validated.

### Final product decisions
- SME Shield is the primary Week 8 team vacuum.
- MONEY slice tests payer / delivery viability.
- Talent Bridge remains parked, not dead.
- No real PII, patient data, credentials, CURP, account numbers, or e.firma secrets.
- No database.
- No Supabase.
- No hypothetical breach-avoidance ROI.
- LLM explains; deterministic code decides.
- Serious-case escalation is independent of payer tier and budget.
- COULD NOT CHECK never means safe.
- Free cyber controls are benchmarks, not the claimed source of value.
- The value hypothesis is accountable delivery, interpretation, evidence handling, human escalation, and payer decision support.
- Browser print-to-PDF is the export mechanism.
- Cost provenance is visible because the modeled assumptions are not yet validated market inputs.

### Rejected alternatives
- Building a database.
- Adding auth for fictional seed data.
- Building a broad cybersecurity scanner.
- Letting the LLM determine GO / TEST / NO-GO.
- Calculating hypothetical breach-loss avoidance.
- Building a custom PDF backend.
- Expanding the persona fix into a full redesign.

### Unresolved risks
- Real willingness to fund is still unvalidated.
- Member participation is still unknown.
- Cost inputs remain simulated and require validation with real delivery hours and vendor / specialist rates.
- The live pilot has not yet demonstrated actual usage of the human-escalation reserve.

### Tomorrow's first move
If the project continues, replace simulated cost assumptions with observed pilot data and compare modeled versus actual cost-to-serve without changing the human-escalation threshold.
