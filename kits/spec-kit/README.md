# spec-kit

`spec-kit` is the public kit surface for the Unified Framework's Feature Delivery Layer.

## Role

This kit turns a chosen feature into a delivery path such as:

`spec.md -> plan.md -> tasks.md -> implementation`

Its minimum job is to define the current feature's:

- scope
- boundaries
- plan
- task breakdown
- acceptance criteria

## Boundary reminder

- `spec-kit` is Feature Delivery, not Project Memory
- project-wide facts and durable status still belong to `longrun`
- runtime execution behavior still belongs to `superpower`, represented publicly only through the execution bridge
- root `AGENTS.md` remains the only repo-governance authority in this repository

## Structure

- `canonical/` — Wave 1 exported explanatory docs for the layer role, flow, boundaries, and write-back handshake
- `seed/` — Wave 2 exported downstream seed material for starter policy and template files
- `methods/` — Wave 3 exported method-only guidance for tool-aware feature-delivery sessions without exposing raw prompt scaffolds

## Start here

- `canonical/README.md`
- `seed/README.md`
- `methods/README.md` if you want optional operator guidance after you already understand the canonical contract

Use that canonical page to understand:

- the Feature Delivery Layer role
- the `spec -> plan -> tasks` main flow
- the boundary with project rules, `longrun`, and the execution bridge
- how feature binding and evidence-aware write-back fit into the larger framework

## Wave 3 note

Wave 3 adds the first formal method-only export.

It now includes:

- Codex-oriented quickstart guidance
- productized command sheets for the core `spec-kit` authoring flow

It still does **not** export:

- hidden internal authoring layout or raw tool-specific scaffolds
- runtime execution implementation
