# spec-kit Codex Command Sheets

Classification: method-only

Authority: non-authoritative

Tool specificity: Codex-oriented operator guidance. Each sheet captures how to use a method safely in public without copying upstream raw prompt scaffolds.

Fallback: if you do not use these sheets, follow the `spec-kit` canonical contract manually and use the seed templates as your starter material.

Non-goals:

- exporting raw `/speckit.*` prompt text
- exposing upstream `.codex/` or `.specify/` layout
- replacing project-local rules
- replacing runtime execution behavior

## Included sheets

- `clarify.md`
- `specify.md`
- `plan.md`
- `tasks.md`
- `analyze.md`

## Omitted on purpose

This public package does not export every upstream tool-facing command.

For Wave 3, the focus stays on the core feature-delivery path and review loop. Commands that would blur into execution authority or expose raw internal scaffolds remain upstream-only.
