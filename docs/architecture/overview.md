# Architecture Overview

The Unified Framework organizes reusable project operations into a single upstream rules layer, three minimum-kernel layers, and one optional overlay.

## Layer map

- **Project Rules Layer**: project-local `AGENTS.md`, constitutions, and repo rules
- **Project Memory Layer**: `longterm`
- **Feature Delivery Layer**: `spec规范`
- **Execution Layer**: `superpower`, represented here only through an execution bridge contract
- **Optional Orchestration Overlay**: `AgentTeam`

## Minimum kernel

The minimum kernel is the combination of:

1. project rules
2. project memory
3. feature delivery
4. execution behavior

`AgentTeam` remains optional. It may help orchestrate multi-agent work, but it does not become part of the minimum kernel and does not enter the initial top-level public surface.

## Responsibility split

- `longterm` owns project facts, long-term state, and the durable project-memory handshake
- `spec规范` turns a chosen feature into `spec -> plan -> tasks`
- `superpower` governs runtime execution methods and verification discipline
- project-local rules define what is allowed in a concrete repository

## Standard path

The standard path remains:

`Project Rules -> longterm -> spec规范 -> superpower -> acceptance evidence -> write back to longterm`

This path matters because it prevents two common failures:

- duplicating project truth in multiple places
- letting execution behavior override project facts or feature definitions

## Public mirror note

This repository is a productized mirror of the architecture, not the authoring truth source. It should stay readable for external users while remaining semantically aligned with the upstream `codeSPEC` definitions.

## Read next

- `docs/reference/source-of-truth-and-sync.md`
- `docs/reference/authority-split.md`
- `docs/reference/layer-contracts.md`
