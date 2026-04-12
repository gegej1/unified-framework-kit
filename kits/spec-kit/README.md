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
- `seed/` — reserved for later seed export; this wave creates the directory and placeholder only
- `methods/` — reserved for later method-only export; this wave creates the directory and placeholder only

## Start here

- `canonical/README.md`

Use that canonical page to understand:

- the Feature Delivery Layer role
- the `spec -> plan -> tasks` main flow
- the boundary with project rules, `longrun`, and the execution bridge
- how feature binding and evidence-aware write-back fit into the larger framework

## Wave 1 note

Wave 1 exports the structure and canonical docs first.

It does **not** yet export:

- seed payload
- method-only payload
- hidden internal authoring layout or raw tool-specific scaffolds
