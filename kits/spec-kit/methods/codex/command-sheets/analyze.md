# Analyze a feature package before implementation

## Purpose

Review a feature package for gaps, drift, or weak evidence anchors before implementation begins.

## Typical inputs

- `spec.md`
- `plan.md`
- `tasks.md`
- project-local rules that may impose delivery constraints

## Typical outputs

- a short review of coverage gaps or inconsistencies
- missing acceptance or evidence anchors
- recommendations for where to tighten the package before execution starts

## When to use

Use this after `spec.md`, `plan.md`, and `tasks.md` exist, especially when the feature is non-trivial or will be handed to another executor.

## Recommended operator flow

1. Check whether tasks cover the accepted feature boundary.
2. Check whether acceptance criteria can later be evidenced.
3. Check terminology and scope consistency across the feature package.
4. Resolve major mismatches before execution begins.

## Failure fallback

If the package has major gaps:

- revise the affected feature artifact
- do not use analysis output as a substitute for a real fix
- delay execution until the package is coherent enough to hand off safely

## Boundary reminder

- Analysis strengthens Feature Delivery Layer quality; it does not produce durable project-memory truth.
- It also does not replace runtime execution behavior.
- Evidence is still collected during execution and written back through the Project Memory Layer.
