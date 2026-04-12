# Execution Bridge

This repository exposes `superpower` only through a thin execution bridge description.

## Why a bridge exists

`superpower` is the current Execution Layer, but its implementation does not belong inside this public repository. The bridge makes the layer visible and auditable without copying skill implementations into the repo.

## Execution authority

`superpower` owns runtime execution behavior such as:

- execution modes
- action ordering inside a session
- verification discipline
- procedural guidance when inputs are incomplete

It does **not** own:

- project facts
- feature definitions
- project-local rules
- durable completion state without evidence

## Standard contract

Before the execution layer is invoked, the preferred inputs are:

1. current user goal
2. project rules
3. current project facts from `longterm`
4. current feature artifacts from `spec规范` when the task is non-trivial

The bridge then turns those inputs into runtime behavior and verification discipline for the current session.

## Fallback behavior

If upstream inputs are missing, the execution layer should degrade by sending the workflow back to the missing layer:

- missing project facts -> return to Project Memory
- missing feature definition -> return to Feature Delivery
- missing runtime system -> keep the same authority order and execute manually against the documented contracts

## Non-goals

This repository does **not**:

- copy `.codex/skills/*`
- re-implement `superpower`
- let documentation act as a new execution engine
- let execution behavior override evidence requirements

## Kit packaging note

Wave 1 may expose `methods/` directories as part of the public kit structure, but those directories remain non-authoritative placeholders in this wave.

They do not replace the execution bridge and do not change the rule that `superpower` appears on the public surface only through bridge documentation.

## Optional overlay note

If a project later enables `AgentTeam`, it remains an optional overlay that may consume the execution bridge. It does not change the minimum-kernel authority split.
