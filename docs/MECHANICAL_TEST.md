# Mechanical Test Pass — Deploy 1

## Date
2026-09-30

## Environment
Production deployment:
https://sme-shield-week8.vercel.app

## Tests passed

- MXN 60,000 unformatted as `60000` returns TEST.
- Total modeled delivery cost remains MXN 50,000.
- MXN 40,000 returns NO-GO with a MXN 10,000 gap.
- COULD NOT CHECK remains visually distinct from CONFIRMED.
- Mandatory human escalation remains independent of budget.
- Sonrisa Lindavista continues to require qualified human review.

## Real bug found

### Input
`60,000`

### Expected
The budget field should interpret a standard thousands-separated amount as MXN 60,000 and return the same result as entering `60000`.

### Actual
The current parser uses JavaScript `Number()` directly on the input. `Number("60,000")` is invalid, so a normally formatted budget is rejected.

### Impact
A non-technical payer working with budgets may naturally enter thousands separators. Rejecting this format creates unnecessary friction in the primary user journey.

### Fix
Normalize commas and surrounding whitespace before numeric validation.

### Safety impact
None. This fix changes only budget-input parsing. It does not change:
- evidence states;
- mandatory escalation;
- delivery-cost assumptions;
- deterministic decision rules.
