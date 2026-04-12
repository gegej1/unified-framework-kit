# longrun

`longrun` is the public shell for the Unified Framework's Project Memory Layer.

## Role

This layer keeps project facts, long-term progress, and the durable project-memory handshake across sessions.

## Boundary notes

- `longrun` is Project Memory, not Feature Delivery
- feature definition still belongs to `spec规范`
- runtime execution behavior still belongs to `superpower`
- compatibility scaffolds must not be mistaken for execution authority

## Durable status rule

Durable feature completion such as `passes: true` must stay traceable to acceptance evidence or equivalent verification evidence.

## Typical responsibilities

- project profile and bearings
- long-term feature list and status
- session continuity and progress notes
- write-back after evidence-backed completion

## Batch 1 scope

Batch 1 exports only the public shell for this kit. It does not yet migrate every operational helper or workspace artifact from the authoring environment.

## Feature schema reminder

At minimum, a durable feature record should preserve a stable identifier, priority, description, summary steps, and completion state. Stronger handoff quality comes from also storing acceptance and evidence hints.
