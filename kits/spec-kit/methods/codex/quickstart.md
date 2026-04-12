# Codex Quickstart for spec-kit Methods

This guide explains how to use the public `spec-kit` method-only package in a downstream repository.

## What this quickstart is for

Use it when you want a Codex-oriented session to help produce a bounded feature package made of:

- `spec.md`
- `plan.md`
- `tasks.md`

This is an operator guide, not a raw prompt export.

## Preconditions

Before using these methods, make sure the downstream repository already has:

1. a real project-local rules layer
2. a clear current feature to work on
3. access to project-memory facts from `longrun` or an equivalent surface
4. a place where the feature artifacts will live

## Recommended flow

1. Read `../../canonical/README.md` to confirm the Feature Delivery Layer contract.
2. Copy or adapt the relevant starter files from `../../seed/` if the downstream repository does not already have its own equivalent templates.
3. Use `command-sheets/clarify.md` to close the highest-impact open questions.
4. Use `command-sheets/specify.md` to shape the feature into a bounded `spec.md`.
5. Use `command-sheets/plan.md` to define the implementation approach.
6. Use `command-sheets/tasks.md` to turn the plan into an execution-ready task list.
7. Use `command-sheets/analyze.md` to check coverage and evidence readiness before implementation starts.
8. Hand the resulting feature package to the execution layer rather than treating `spec-kit` itself as the execution method.

## What these methods produce

These methods should help produce:

- a feature-local scope and acceptance definition
- a bounded plan for implementation
- a task list that is traceable to the feature package
- evidence-aware handoff inputs for the later write-back handshake

## Fallback when you do not use this package

Canonical plus seed still works without this methods subtree.

Downstream teams can:

- read `../../canonical/README.md`
- copy or adapt `../../seed/` templates
- write `spec.md`, `plan.md`, and `tasks.md` directly with their own tooling

The absence of this package weakens convenience, not the layer contract.

## What this package does not do

It does not:

- replace project-local governance
- replace project-memory facts
- decide durable completion on its own
- expose raw prompt scaffolds
- turn Codex usage into a mandatory adoption requirement
