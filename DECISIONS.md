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
