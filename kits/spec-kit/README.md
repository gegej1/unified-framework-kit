# spec-kit

`spec-kit` is the public shell for the Unified Framework's Feature Delivery Layer.

## Role

The kit exists to turn a chosen feature into a delivery path such as:

`spec.md -> plan.md -> tasks.md -> implementation`

## What this kit owns

- current-feature scope
- current-feature acceptance criteria
- current-feature planning and task breakdown

## What this kit does not own

- project-wide facts or long-term status
- the runtime execution method
- repo-wide governance in this public repository

## Authority note

- The current semantic truth for this layer remains upstream in `codeSPEC`
- In this repository, root `AGENTS.md` is the only repo-governance authority
- Kit-local files are downstream seed and explanatory surface only

## Batch 1 scope

Batch 1 intentionally exports a minimal public shell. It does not yet include the full hidden tooling payload of the internal authoring workspace.

## Use with the rest of the framework

Use `spec-kit` with:

- project-local rules
- project memory from `longterm`
- runtime execution behavior through the execution bridge

Do not use it as a substitute for project memory or execution authority.
