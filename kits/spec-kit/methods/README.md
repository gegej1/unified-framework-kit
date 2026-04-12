# spec-kit Methods

Classification: method-only

Authority: non-authoritative

Tool specificity: this surface currently publishes Codex-oriented operator guidance after public-safe and productized rewrite. It does not define a required runtime or governance model for downstream repositories.

Fallback: if this directory is unavailable, downstream teams can still use `../canonical/README.md` plus `../seed/` templates to produce `spec.md`, `plan.md`, and `tasks.md` manually.

Non-goals:

- shipping raw prompt scaffolds
- shipping raw execution implementation
- copying `.codex/skills/*`
- turning tool-specific helper material into execution authority
- turning tool-specific helper material into project rules or project memory authority

## What is included now

Wave 3 turns this directory into a real public method-only surface.

It currently includes:

- `codex/README.md` — local contract for the Codex-oriented subtree
- `codex/quickstart.md` — adoption-facing guide for using these methods in a downstream repository
- `codex/command-sheets/` — productized operator sheets for the common `spec-kit` authoring flow

## When to use this directory

Use this directory when you already understand the `spec-kit` layer contract and you want a practical, tool-aware way to drive feature delivery sessions.

Typical use cases:

- translating a chosen feature into `spec.md`, `plan.md`, and `tasks.md`
- reducing ambiguity before feature delivery starts
- reviewing a feature package for coverage gaps before implementation begins

## When not to use this directory

Do not use this directory as:

- the semantic truth source for feature meaning
- a replacement for project-local rules
- a replacement for `longrun` project-memory facts
- a replacement for the execution bridge or runtime execution behavior

If you only need the layer contract, read `../canonical/README.md`.

If you need copy/adapt starter files, use `../seed/`.
