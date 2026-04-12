# Contributing

Thanks for helping improve `unified-framework-kit`.

## Before you open a PR

- Confirm which layer your change affects: Project Rules, Project Memory, Feature Delivery, Execution Bridge, or public packaging
- Confirm the change does **not** create a second authority surface
- Confirm the change belongs in the public mirror and does not expose internal-only material

## Source-first rule

Until a future cutover is explicitly announced:

1. Author semantic changes in the `codeSPEC` truth source first
2. Curate the public-facing mirror update second
3. Keep the public wording aligned with the truth source without mechanically copying internal materials

## What PRs must include

- A short note describing which layer is affected
- A short note describing why the change stays within the current authority split
- Any required companion doc updates when changing:
  - root messaging
  - manifest semantics
  - source-of-truth or sync policy
  - authority split or layer contracts

## What this repository accepts

- Clear public-facing explanations of the framework
- Public-safe kit shell documentation
- Curated mirror improvements that preserve source-first authority
- Small packaging and onboarding improvements that do not alter semantic ownership

## What this repository does not accept

- `.codex/skills/*` implementations
- Internal handoff, audit, research, mispatch, replay, or trace materials
- Changes that make examples, scripts, overlays, or docs look like new authority layers
- Changes that make `export-manifest.yaml` behave like an authoring source
- Changes that elevate `AgentTeam` into the minimum kernel or initial public top-level surface

## Review checklist

Before requesting review, check that:

- `README.md`, `AGENTS.md`, and `CONTRIBUTING.md` still agree on authority wording
- `docs/reference/source-of-truth-and-sync.md` still matches the current publishing model
- `docs/reference/authority-split.md` still matches the current layer boundaries
- No forbidden internal material entered the repository
