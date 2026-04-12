# spec-kit Canonical

This page is the public canonical surface for the Unified Framework's Feature Delivery Layer.

## Why this page exists

Wave 1 exports the canonical explanation for `spec-kit` before any seed or method-only payload is published.

The goal is to make the layer visible and adoptable without turning the public repo into a second semantic truth source.

## Layer role

`spec-kit` turns a chosen feature into a delivery path built from:

- `spec.md`
- `plan.md`
- `tasks.md`

This layer defines the current feature's scope, boundaries, plan, tasks, and acceptance criteria.

## What this layer does not own

`spec-kit` does **not** own:

- project-wide facts
- long-term progress
- durable `passes: true` state
- runtime execution methods
- repo-governance authority in this public repository

## Standard flow

The standard path remains:

`Project Rules -> longrun -> spec-kit -> execution bridge -> acceptance evidence -> write back to longrun`

For non-trivial work, `spec-kit` is where the current feature becomes a bounded delivery unit.

## Boundary with project rules

Before feature artifacts are produced, project-local rules must already be known.

In a real adopting repository, those rules stay project-local. This public repo only explains the contract.

## Boundary with longrun

`spec-kit` consumes project facts from `longrun`, including the currently selected feature and its constraints.

It must not replace `longrun` as the owner of:

- project facts
- long-term status
- durable write-back

## Boundary with the execution bridge

`spec-kit` provides the bounded feature artifacts that the execution layer consumes.

The public execution layer remains represented only through `docs/architecture/execution-bridge.md`.

`spec-kit` does not become an execution engine.

## Feature binding and evidence-aware write-back

The feature selected from project memory must remain traceable to a corresponding feature artifact set.

At minimum, a handoff should let a reviewer answer:

- where the `spec.md` lives
- where the `plan.md` and `tasks.md` live
- where the acceptance evidence points

`spec-kit` defines acceptance criteria and evidence anchors for the feature, but durable completion still writes back through Project Memory rather than through this layer alone.

## Adoption-facing use

Use this canonical page when you want to understand or explain:

- why the Feature Delivery Layer exists
- what `spec -> plan -> tasks` is supposed to own
- how `spec-kit` stays downstream of project rules and project memory
- why the execution layer should stay separate from feature definition

## Wave 1 note

In this wave:

- this canonical page is exported
- `seed/` exists only as a placeholder directory
- `methods/` exists only as a placeholder directory

No seed or method-only payload is exported yet.
