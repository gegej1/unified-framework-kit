# longrun Seed

This directory contains the public `longrun` seed export for Batch 2 Wave 2.

## Classification

- downstream seed
- copy/adapt
- non-authoritative

## Authority reminder

- In this public repository, root `AGENTS.md` remains the only repo-governance authority
- Nothing in this directory is a governance authority for `unified-framework-kit`
- These files are starting points for downstream repositories that adopt the Project Memory Layer

## Included in Wave 2

- `CHECKLIST.md`
- `templates/app_spec.template.md`
- `templates/feature_list.template.json`
- `templates/claude-progress.template.txt`
- `templates/init.template.sh`

## Public-safe naming rule

This directory uses public-safe seed paths and does not expose internal authoring layout such as hidden source directories.

## How to use these files downstream

1. Copy the relevant seed files into the downstream repository
2. Adapt them to the downstream project's actual workspace, rules, and verification paths
3. Keep Project Memory focused on durable facts, handoff state, and evidence-aware write-back
4. Keep the downstream repository's local rules above reusable kit defaults

## Relationship to the root checklist shim

- `../CHECKLIST.md` remains a compatibility shim at kit root
- `CHECKLIST.md` in this directory is the actual seed export for downstream copy/adapt use
- Future seed expansion should happen here rather than by growing the root shim

## Not included in this wave

This wave does **not** export:

- method-only payload
- prompt scaffolds
- helper scripts
- execution implementation

For explanatory layer meaning, continue to use `../canonical/README.md`.
