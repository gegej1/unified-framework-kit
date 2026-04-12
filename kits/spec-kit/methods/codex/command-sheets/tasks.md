# Turn the plan into execution-ready tasks

## Purpose

Break an agreed plan into a task list that is specific enough for execution handoff and verification tracking.

## Typical inputs

- `spec.md`
- `plan.md`
- project-local rules
- repository-specific file layout and constraints

## Typical outputs

- `tasks.md`
- clear task boundaries
- sequencing or dependency notes
- verification hooks tied back to acceptance criteria

## When to use

Use this when `spec.md` and `plan.md` are stable enough that the work can be decomposed without re-deciding the feature on every task.

## Recommended operator flow

1. Map each task to a concrete part of the plan.
2. Keep tasks small enough to review and verify.
3. Preserve traceability from task output back to feature acceptance.
4. Mark where evidence will likely come from, without declaring completion early.

## Failure fallback

If tasks remain too vague:

- tighten the plan first
- split large tasks into smaller bounded units
- avoid handing execution an ambiguous task list that will force re-planning midstream

## Boundary reminder

- `tasks.md` is a handoff artifact for execution, not an execution method.
- The execution layer decides how to run the work.
- Durable write-back still belongs to project memory after evidence exists.
