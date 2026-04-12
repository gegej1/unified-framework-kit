# Source of Truth and Sync

This document defines how the current internal truth source and the public mirror relate.

## Current status

- `codeSPEC` remains the semantic truth source
- `unified-framework-kit` is the public-facing curated mirror
- An explicit cutover has **not** happened

## Source-first rule

Until a future cutover is explicitly announced:

1. semantic meaning is authored in `codeSPEC`
2. public-safe wording is curated into this repository
3. the public mirror is reviewed for consistency with the source

## What gets mirrored

This public repo mirrors:

- architecture summaries
- authority and layer contracts
- public adoption guides
- public-safe kit shell documentation
- a read-only public manifest snapshot

## What does not get mirrored

This public repo does not mirror:

- internal handoff materials
- internal audit or mispatch references
- research-only working assets
- runtime skill implementations
- replay, trace, video, or personal-path artifacts

## Manifest rule

The internal authoring manifest remains upstream. The public `export-manifest.yaml` is a read-only snapshot that explains what Batch 1 exports; it is not the place to originate semantic changes.

## Batch 2 Wave 3 sync note

Batch 2 Wave 3 adds the first public method-only exports on top of the placement skeleton, canonical docs, and seed exports.

It does **not** turn the public repo into an authoring source, and it still does **not** export:

- raw prompt scaffolds
- raw hidden-directory authoring layout
- execution implementation

Release-level manifest synchronization remains a downstream public step. The semantic authoring control plane stays upstream in `codeSPEC`.

## Practical sync rule

When a change affects meaning rather than packaging:

- update the source truth first
- then update the public mirror wording and structure
- then verify that the public mirror still states the same authority model
