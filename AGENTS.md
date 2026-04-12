# Agent Guidelines

This file is the **only repo-governance authority** for `unified-framework-kit`.

## Repository role

- This repository is a **public-facing curated mirror**, not the semantic truth source
- The current semantic truth source remains `codeSPEC`
- Until an explicit cutover is announced, semantic changes remain **authoring-source first** and are mirrored here second

## Authority boundaries

- Do not create a second authority surface for project facts, feature delivery, or execution behavior
- Root `AGENTS.md` governs this repository; kit-local files are downstream seed or explanatory material only
- `examples/`, `scripts/`, and documentation directories must not be treated as authority layers
- `export-manifest.yaml` is a read-only public snapshot, not the authoring manifest

## Required constraints

- Do not copy `.codex/skills/*` implementations into this repository
- Do not re-implement the execution layer inside this repository; keep `superpower` visible only through an execution bridge contract
- Do not introduce `overlays/agent-team/` into the initial public top-level surface
- Do not import internal handoff, audit, research, mispatch, replay, trace, video, or absolute-path materials
- Do not let examples, scripts, or overlays become authority by implication or wording

## Evidence and completion

- Any statement implying a durable pass or completion state must stay tied to acceptance evidence or equivalent verification evidence
- `passes: true` is not granted by documentation tone, examples, or agent self-assertion
- Public docs may explain the handshake, but they do not replace the upstream authority for writing long-term project facts

## Editing rules

- Keep public wording productized and externally readable
- Preserve the current layer split:
  - `longterm` = Project Memory Layer
  - `spec规范` = Feature Delivery Layer
  - `superpower` = runtime execution methods and execution behavior
- When changing manifest semantics, authority wording, or root messaging, update the corresponding reference docs in the same change
- Prefer additive clarification over broad rewrites that blur authority boundaries
