# longrun Working Method

This page explains the public working method for `longrun` as the Unified Framework's Project Memory Layer.

## Why this page exists

The canonical docs explain what Project Memory owns.

This page explains how a team can operate that layer in day-to-day work without turning `longrun` into Feature Delivery or Execution authority.

## What this method is for

Use this method to keep project-memory facts durable across sessions, such as:

- current project bearings
- the active feature list and its dependency state
- handoff context
- evidence-aware write-back targets

## What this method is not for

This method does **not**:

- define `spec.md`, `plan.md`, or `tasks.md`
- replace the execution bridge
- grant `passes: true` by operator assertion alone
- replace project-local rules

## Recommended working rhythm

1. Re-open the durable project-memory surfaces first.
2. Confirm the active feature and any known blockers.
3. Hand the selected feature to `spec-kit` when feature definition or refinement is required.
4. Let the execution layer carry the runtime work method.
5. Write durable updates back to project memory only after evidence exists.

## Collaboration boundary

### With spec-kit

`longrun` supplies the selected feature context, project bearings, and durable state.

`spec-kit` turns that selected feature into `spec.md`, `plan.md`, and `tasks.md`.

### With the execution bridge

The execution layer reads the current bounded feature package and produces implementation plus verification behavior.

`longrun` does not tell the execution layer how to work; it only preserves the durable context and write-back location.

## Evidence rule

Durable completion such as `passes: true` still requires acceptance evidence or equivalent verification evidence.

This method may help teams keep the evidence path visible, but it does not own the final project-memory truth by itself.

## Fallback

If you do not use these method docs or helpers:

- read `../canonical/README.md`
- copy or adapt the starter material in `../seed/`
- maintain the same evidence-aware project-memory handshake manually

The fallback loses convenience, not layer clarity.
