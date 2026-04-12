# New Project Bootstrap

This guide explains how to adopt the Unified Framework in a new repository without confusing the layer boundaries.

## Goal

Start with the minimum kernel, keep a single authority per concern, and avoid importing more surface area than the project needs.

## Bootstrap sequence

1. Define the project's own rules layer
   - create or confirm the project-local `AGENTS.md`, constitution, and repo rules
2. Establish project memory
   - decide where `longterm`-style project facts will live
   - confirm how long-term feature status will be recorded
3. Establish feature delivery
   - adopt the `spec规范` style `spec -> plan -> tasks` path for non-trivial features
4. Establish execution behavior
   - keep runtime execution methods separate from project facts and feature definitions
5. Bind evidence to durable status
   - ensure any durable pass state is traceable to acceptance evidence or equivalent verification evidence

## Recommended reading order

1. `docs/architecture/overview.md`
2. `docs/reference/authority-split.md`
3. `docs/reference/layer-contracts.md`
4. `kits/project-memory/longrun/README.md`
5. `kits/project-memory/longrun/canonical/README.md`
6. `kits/spec-kit/README.md`
7. `kits/spec-kit/canonical/README.md`

## Batch 2 Wave 1 note

This wave publishes the kit structure and canonical docs first. It does not yet ship the formal seed payload or method-only payload for each kit.
