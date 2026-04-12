# Authority Split

This document explains which surfaces are authoritative, which are downstream seed, and which are explanatory only.

## Repository-level authority

- Root `AGENTS.md` is the only repo-governance authority in this repository
- Root `README.md` explains the public role of the repository
- Root `CONTRIBUTING.md` explains how public changes must preserve the source-first model

## Upstream semantic authority

- `codeSPEC` remains the semantic truth source
- This public repository does not become a peer authority by existing

## Layer authority

- Project rules remain project-local in real adopting repositories
- `longterm` remains the Project Memory Layer
- `spec规范` remains the Feature Delivery Layer
- `superpower` remains the runtime execution layer, represented here only by bridge documentation

## Non-authority surfaces in this repository

The following are intentionally non-authoritative:

- `examples/README.md`
- `scripts/`
- kit-local README and checklist files
- `kits/*/canonical/` explanatory pages
- `kits/*/seed/` downstream seed surfaces for copy/adapt use
- `kits/*/methods/` skeleton or future method-only surfaces
- architecture and guide pages that summarize upstream meaning
- `export-manifest.yaml`

These surfaces may explain, package, or seed adoption, but they must not become primary sources for durable semantics.

## Optional overlay note

`AgentTeam` remains an optional orchestration overlay. In Batch 1 it is referenced in documentation only and is not exported as a top-level public directory.
