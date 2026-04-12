# spec-kit Seed

This directory contains the public `spec-kit` seed export for Batch 2 Wave 2.

## Classification

- downstream seed
- copy/adapt
- non-authoritative

## Authority reminder

- In this public repository, root `AGENTS.md` remains the only repo-governance authority
- Nothing in this directory is a governance authority for `unified-framework-kit`
- These files are starting points for downstream repositories that adopt the Feature Delivery Layer

## Included in Wave 2

- `AGENTS.seed.md`
- `constitution.seed.md`
- `templates/spec.template.md`
- `templates/plan.template.md`
- `templates/tasks.template.md`
- `templates/checklist.template.md`
- `templates/agent-file.template.md`

## Public-safe naming rule

This directory uses public-safe names such as:

- `AGENTS.seed.md`
- `constitution.seed.md`
- `*.template.md`

It does not expose raw internal authoring paths such as `.specify/` or `.codex/` as public seed paths.

## How to use these files downstream

1. Copy the relevant seed files into the downstream repository
2. Rename or place them according to that repository's own structure
3. Adapt the wording to the downstream project's real governance, toolchain, and directory layout
4. Keep the downstream repository's local rules above reusable kit defaults

## Not included in this wave

This wave does **not** export:

- method-only payload
- raw prompt scaffolds
- helper scripts
- execution implementation

For explanatory layer meaning, continue to use `../canonical/README.md`.
