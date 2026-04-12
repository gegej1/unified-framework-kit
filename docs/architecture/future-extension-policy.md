# Future Extension Policy

The Unified Framework is designed to evolve, but that evolution must preserve a single authority per concern.

## Current principle

Reserve **extension policy**, not future implementation.

That means:

- define where new systems may attach
- define how replacement vs augmentation is judged
- avoid creating empty directories or speculative implementations before they are needed

## Extension slots

Future systems should map into one of these slots:

- new memory systems -> Project Memory Layer
- new spec or planning systems -> Feature Delivery Layer
- new runtime method systems -> Execution Layer
- new orchestration systems -> Optional Orchestration Overlay

## Two extension modes

### Replacement

Use replacement only when a new system fully covers the current layer's core job, can carry the existing migration burden, and does not create a second truth source.

### Augmentation

Use augmentation when a new system improves an existing layer without taking over its authority. If removing the new system still leaves the main path intact, it is likely an augmentation rather than a replacement.

## Compatibility period rules

Short compatibility periods are allowed, but only if:

- the primary authority remains explicit
- old and new surfaces are clearly marked as primary vs secondary
- there is a defined exit condition
- the system converges back to a single primary surface

## What Batch 1 does not do

Batch 1 does **not** pre-create future implementation shells such as:

- a top-level overlay export
- speculative replacement directories
- fixed interfaces for systems that do not yet exist

This keeps the public repo clean while still documenting the decision framework for future growth.
