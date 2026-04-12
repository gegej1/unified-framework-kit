# longrun

`longrun` is the public kit surface for the Unified Framework's Project Memory Layer.

## Role

This layer keeps project facts, long-term progress, and the durable project-memory handshake across sessions.

## Boundary reminder

- `longrun` is Project Memory, not Feature Delivery
- feature definition still belongs to `spec-kit`
- runtime execution behavior still belongs to `superpower`
- compatibility scaffolds must not be mistaken for execution authority

## Structure

- `canonical/` — Wave 1 exported explanatory docs for project memory role, schema contract, and write-back handshake
- `seed/` — Wave 2 exported downstream seed material for checklist and workspace templates
- `methods/` — reserved for later method-only export; this wave creates the directory and placeholder only

## Start here

- `canonical/README.md`
- `seed/README.md`
- `CHECKLIST.md` — compatibility shim kept at kit root while pointing to `seed/CHECKLIST.md`

## Durable status rule

Durable feature completion such as `passes: true` must stay traceable to acceptance evidence or equivalent verification evidence.

## Typical responsibilities

- project profile and bearings
- long-term feature list and status
- session continuity and progress notes
- evidence-backed write-back after completion

## Wave 2 note

Wave 2 adds the downstream seed export.

It does **not** yet export:

- the formal method-only payload
- operational helper payload from the internal authoring environment
