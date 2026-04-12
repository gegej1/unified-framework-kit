# Plan implementation from an approved spec

## Purpose

Translate an accepted `spec.md` into an implementation approach that is concrete enough to become tasks.

## Typical inputs

- a stable `spec.md`
- project-local rules and technical constraints
- current repository context
- known dependencies or migration constraints from project memory

## Typical outputs

- `plan.md`
- proposed implementation phases
- file or component touchpoints
- validation expectations that preserve the acceptance contract

## When to use

Use this after the feature scope is stable enough that implementation sequencing can be reasoned about without reopening the feature definition.

## Recommended operator flow

1. Re-read the acceptance criteria and non-goals.
2. Identify the smallest practical implementation slices.
3. Map likely files, interfaces, or user flows that must change.
4. Keep the plan aligned with the feature contract instead of drifting into execution policy.

## Failure fallback

If the plan keeps changing because the spec is still unstable:

- return to `specify`
- reduce the feature boundary
- defer execution until the plan can stay consistent across one review pass

## Boundary reminder

- `plan.md` is still a feature-delivery artifact, not project memory.
- Long-term pass state is not granted here.
- Runtime execution behavior still belongs to the execution bridge.
