# Clarify a feature before authoring

## Purpose

Reduce the highest-impact ambiguity before writing or revising a feature package.

## Typical inputs

- the current project rules layer
- the selected feature from project memory
- any existing `spec.md`, `plan.md`, or rough request text
- known constraints, risks, or open questions

## Typical outputs

- a short list of clarified decisions
- a tighter feature boundary
- explicit assumptions that can be carried into `spec.md`

## When to use

Use this before `specify` when the feature description is still fuzzy or when multiple interpretations would change scope, acceptance, or sequencing.

## Recommended operator flow

1. Restate the feature goal in one sentence.
2. Identify which uncertainties affect scope, acceptance, or user-visible behavior.
3. Resolve the highest-impact questions first.
4. Carry forward only the clarifications that materially shape the feature package.

## Failure fallback

If major ambiguity remains:

- record the remaining assumption explicitly in `spec.md`
- narrow the feature rather than expanding scope implicitly
- stop before planning if the uncertainty would make the plan unstable

## Boundary reminder

- Clarification supports Feature Delivery Layer work; it does not replace project-memory facts.
- Durable facts still write back through `longrun`.
- Runtime work method still belongs to the execution bridge rather than to this sheet.
