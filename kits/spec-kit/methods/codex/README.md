# spec-kit Methods for Codex

Classification: method-only

Authority: non-authoritative

Tool specificity: Codex-oriented. These docs assume an agentic coding session, but they intentionally stay at the operator-guidance level rather than exporting raw prompt scaffolds.

Fallback: if you do not use Codex, follow the same feature-delivery contract manually with `../../canonical/README.md` and the starter files in `../../seed/`.

Non-goals:

- shipping raw `.codex/` prompt files
- exposing upstream hidden-directory authoring layout
- replacing the execution bridge
- turning tool-aware workflow guidance into repo-governance authority

## Why this subtree exists

Upstream `spec-kit` contains tool-specific authoring aids.

This public subtree makes the Codex-facing method visible in a productized way without exporting internal prompt files or hidden directory structure.

## Included here

- `quickstart.md`
- `command-sheets/`

## Boundary reminder

- `spec-kit` still owns only Feature Delivery Layer work
- `longrun` still owns project facts and durable write-back
- runtime execution behavior still belongs to `superpower` through the public execution bridge
- root `AGENTS.md` remains the only repo-governance authority in this repository
