# Layer Contracts

This document summarizes the operating contracts between the Unified Framework layers.

## Layer summary

### Project Rules Layer

- Defines what a concrete project allows
- Owns local constraints, quality bars, and governance boundaries
- Must be read before other layers are applied in a real project

### Project Memory Layer

- Owns project facts, long-term progress, and durable state
- Provides the feature-selection and write-back handshake
- Does not replace feature delivery or runtime execution behavior

### Feature Delivery Layer

- Turns a chosen feature into `spec.md`, `plan.md`, and `tasks.md`
- Defines scope, boundaries, plan, and acceptance criteria for the current feature
- Does not own the full project backlog or long-term pass state

### Execution Layer

- Consumes project rules, project facts, and feature artifacts
- Selects runtime work mode and verification behavior
- Does not become a second facts layer or a second spec system

### Optional Orchestration Overlay

- May coordinate multi-agent ownership and sequencing when explicitly enabled
- Must consume the existing authority surfaces rather than replace them
- Must not behave like a default prerequisite for the minimum kernel

## Read/write discipline

- Cross-layer reading is allowed when it preserves the authority order
- Durable writes must stay with the layer that owns the truth being updated
- `passes: true` or equivalent durable completion state must remain traceable to acceptance evidence or equivalent verification evidence

## Standard operating flow

`Project Rules -> Project Memory -> Feature Delivery -> Execution -> acceptance evidence -> Project Memory write-back`

## Public mirror note

This repository documents these contracts for public adoption. It does not replace the upstream authoring truth for the contracts themselves.

## Public kit packaging note

In Batch 2 Wave 1, the public kit structure becomes explicit:

- `canonical/` for explanatory layer contracts and adoption-facing kit docs
- `seed/` for future reusable starter material
- `methods/` for future method-only, tool-specific helper material

For this wave:

- `canonical/` is exported
- `seed/` and `methods/` exist only as skeleton directories with placeholder README files
- neither placeholder directory changes the authority model described above
