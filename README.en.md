[中文](./README.md) | English

# unified-framework-kit

`unified-framework-kit` is the public-facing mirror and reusable kit shell for the Unified Framework, aimed at teams and maintainers who want to understand, evaluate, or adopt its minimum-kernel structure.

This repository provides a **public, readable surface for architecture, boundary docs, and adoption entry points**. It is **not** the current semantic truth source. The active semantic authoring source remains the internal `codeSPEC` workspace; until an explicit cutover is announced, semantic changes remain **source-first**: author in `codeSPEC` first, then curate the approved public-facing result here.

## What this repository is

- A public, reviewable surface for the Unified Framework
- A curated mirror of the current minimum-kernel architecture
- An external-facing entry point for architecture, reference, and adoption docs
- A public shell for future `spec-kit` and `project-memory` exports

## What problem it helps solve

This repository mainly helps teams answer a few practical questions:

- which layer owns project rules, project memory, feature delivery, and execution behavior
- how to explain the Unified Framework publicly without creating a second authority surface
- where a new or existing project should start when adopting the minimum kernel
- why `examples`, `scripts`, and summary docs must not become the primary source of truth

## Minimum kernel and boundaries

The current minimum kernel remains:

- **Project Rules Layer**: project-local `AGENTS.md`, constitutions, and repo rules
- **Project Memory Layer**: `longterm`
- **Feature Delivery Layer**: `spec规范`
- **Execution Layer**: `superpower`, represented in this repository **only through an execution bridge contract**

`AgentTeam` remains an **optional orchestration overlay**. It is not part of the minimum kernel and does not enter the current initial top-level public surface.

## Authority model

- `codeSPEC` remains the semantic truth source
- This repository remains a public-facing curated mirror, not a peer authority
- Root `AGENTS.md` remains the **only** repo-governance authority in this repository
- `examples/`, `scripts/`, kit subdirectories, and explanatory docs are not authority surfaces
- Durable completion signals such as `passes: true` must remain traceable to acceptance evidence or equivalent verification evidence

## How to start

1. Read `docs/architecture/overview.md` for the layer map
2. Read `docs/reference/source-of-truth-and-sync.md` to understand source-first publishing and mirror sync
3. Read `docs/reference/authority-split.md` and `docs/reference/layer-contracts.md` to confirm the authority boundaries
4. Pick the relevant adoption path from `docs/guides/`
5. Enter `kits/spec-kit/` and `kits/project-memory/longrun/` only when you need the public kit shells

If you are looking for formal examples, note that `examples/README.md` is still a launch-phase placeholder and not a primary contract surface.

## Current public structure

- Root public-shell docs: `README.md`, `AGENTS.md`, `CONTRIBUTING.md`
- Architecture docs: `docs/architecture/`
- Reference docs: `docs/reference/`
- Adoption guides: `docs/guides/`
- Kit structure skeletons: `kits/spec-kit/`, `kits/project-memory/longrun/`
- Batch 2 Wave 1 canonical docs:
  - `kits/spec-kit/canonical/`
  - `kits/project-memory/longrun/canonical/`
- Batch 2 Wave 2 seed exports:
  - `kits/spec-kit/seed/`
  - `kits/project-memory/longrun/seed/`
- Batch 2 Wave 3 method-only exports:
  - `kits/spec-kit/methods/`
  - `kits/project-memory/longrun/methods/`
- A read-only public manifest snapshot: `export-manifest.yaml`
- An examples placeholder entry point: `examples/README.md`

## Batch 2 Wave 3 note

The repository is now through Batch 2 Wave 3.

It now includes:

- the public placement skeleton
- `spec-kit` canonical export
- `longrun` canonical export
- `spec-kit` seed export
- `longrun` seed export
- the first `spec-kit` method-only export
- the first `longrun` method-only export
- minimal sync updates across root, reference, and guide docs

It still does **not** implement:

- the overlay launch
- formal examples
- any public copy of execution implementation
- any raw prompt scaffolds or raw `.codex/` / `.specify/` authoring layout

## What is not included

- An initial export of `overlays/agent-team/`
- Formal example projects
- `.codex/skills/*` implementations
- Internal handoff, audit, research, or mispatch materials
- Full Batch 3 migration content
- Any public copy of the runtime implementation

## Contribution note

If you want to propose **semantic** changes, keep the current source-first model:

1. author the semantic change in `codeSPEC` first
2. then curate the approved public-safe result into this repository
3. finally verify that the public mirror still states the correct authority model
