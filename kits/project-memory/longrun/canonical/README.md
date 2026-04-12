# longrun Canonical

This page is the public canonical surface for the Unified Framework's Project Memory Layer.

## Why this page exists

Wave 1 exports the canonical explanation for `longrun` before the future seed and method-only payload are published.

The goal is to make Project Memory visible and adoptable without turning the public repo into a second semantic truth source.

## Layer role

`longrun` keeps the durable project-memory handshake across sessions.

Its job is to preserve project facts such as:

- project bearings
- long-term feature state
- progress context
- evidence-aware write-back targets

## What this layer does not own

`longrun` does **not** own:

- feature-local delivery artifacts
- runtime execution methods
- repo-governance authority in this public repository

Feature definition stays with `spec-kit`, and runtime execution behavior stays with `superpower` through the public execution bridge.

## Project-memory handshake

The Project Memory Layer provides the durable context that lets a session resume from facts rather than guesswork.

That typically includes:

- the active project bearings
- the current feature state
- known constraints and progress
- the durable place where completion status is written back

## Feature schema contract

At minimum, a durable feature record should preserve:

- a stable identifier
- priority
- description
- summary steps
- completion state

Stronger handoff quality comes from also keeping acceptance and evidence hints.

## passes / evidence handshake

Durable completion such as `passes: true` must remain traceable to acceptance evidence or equivalent verification evidence.

This matters because the public docs may explain the handshake, but they do not replace the upstream authority for writing long-term project facts.

## Boundary with spec-kit

`longrun` provides the selected feature context and durable state that `spec-kit` consumes.

It must not become the main home for:

- `spec.md`
- `plan.md`
- `tasks.md`

## Boundary with the execution bridge

`longrun` can be read by the execution layer, but it must not drift into execution behavior.

Project Memory stays about durable facts and write-back, not about runtime work mode.

## Adoption-facing use

Use this canonical page when you want to understand or explain:

- what Project Memory is responsible for
- why durable project state should stay separate from feature definition
- how `passes` remains tied to evidence
- why write-back belongs to durable project memory rather than to the execution layer alone

## Wave 1 note

In this wave:

- this canonical page is exported
- `seed/` exists only as a placeholder directory
- `methods/` exists only as a placeholder directory
- `CHECKLIST.md` remains at kit root as a compatibility shim

No seed or method-only payload is exported yet.
