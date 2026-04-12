# unified-framework-kit

`unified-framework-kit` is the public-facing curated mirror and reusable kit shell for the Unified Framework.

This repository is **not** the current semantic truth source. The active authoring truth remains the internal `codeSPEC` workspace. Until an explicit future cutover is announced, semantic changes stay **source-first** in `codeSPEC` and are then curated into this public mirror.

## What this repository is

- A public, reviewable shell for the Unified Framework
- A curated mirror of the current minimum-kernel architecture
- A stable place for public-facing architecture, reference, and adoption guides
- A reusable entry point for future `spec-kit` and `project-memory` kit exports

## What this repository is not

- Not a second semantic truth source
- Not a copy of `.codex/skills/*` implementations
- Not a full migration of internal materials
- Not the place where `passes: true` can be declared without evidence
- Not a top-level `AgentTeam` repo surface

## Minimum kernel

The minimum kernel remains:

- **Project Rules Layer**: project-local `AGENTS.md` / constitution / repo rules
- **Project Memory Layer**: `longterm`
- **Feature Delivery Layer**: `spec规范`
- **Execution Layer**: `superpower` via an execution bridge contract

`AgentTeam` remains an **optional orchestration overlay**. It is not part of the minimum kernel and does not enter the initial top-level public surface.

## Authority model

- `codeSPEC` remains the semantic truth source
- This repository is a curated mirror and public distribution shell
- Root `AGENTS.md` is the **only** repo-governance authority in this repository
- `examples/`, `scripts/`, and kit subdirectories are **not** authority surfaces
- Any durable completion signal such as `passes: true` must remain traceable to acceptance evidence or equivalent verification evidence

## Batch 1 contents

- Root shell documents: `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `LICENSE`, `.gitignore`
- Architecture docs: `docs/architecture/`
- Reference docs: `docs/reference/`
- Adoption guides: `docs/guides/`
- Kit shells:
  - `kits/spec-kit/`
  - `kits/project-memory/longrun/`
- Placeholder examples surface: `examples/README.md`
- Read-only public manifest snapshot: `export-manifest.yaml`

## Not included in Batch 1

- `overlays/agent-team/`
- Formal example projects
- Internal handoff, audit, research, or mispatch materials
- `.codex/skills/*` implementations
- Full Batch 2 / Batch 3 migrations

## Start here

1. Read `docs/architecture/overview.md`
2. Read `docs/reference/source-of-truth-and-sync.md`
3. Read `docs/reference/authority-split.md`
4. Read `docs/reference/layer-contracts.md`
5. Use the guides in `docs/guides/` to plan adoption

## Contribution note

If you want to propose semantic changes, preserve the current source-first model: author the meaning in the `codeSPEC` truth source, then mirror the approved public-facing result here.
