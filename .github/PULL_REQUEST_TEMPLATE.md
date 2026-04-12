# Summary

Describe the change in 2-5 sentences.

## Affected layer

- [ ] Project Rules
- [ ] Project Memory (`longterm`)
- [ ] Feature Delivery (`spec-kit` / `spec规范`)
- [ ] Execution Bridge
- [ ] Public packaging / docs only

## Authority split

- Does this PR touch the authority split or source-of-truth wording?
  - [ ] Yes
  - [ ] No

- If yes, explain what changed and why it still preserves the current mirror model:

## Source-first check

- Does this change need to land in `codeSPEC` first?
  - [ ] Yes
  - [ ] No

- Explain why:

## Public-shell-only check

- Is this only a public-shell / packaging / wording change?
  - [ ] Yes
  - [ ] No

- Explain why:

## Scope guard checklist

- [ ] This change does not create a second authority surface.
- [ ] This change does not treat examples, scripts, templates, or overlays as authority.
- [ ] This change does not copy `.codex/skills/*` implementations.
- [ ] If root messaging or authority wording changed, the related reference docs were updated in the same change.
