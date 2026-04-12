# Existing Project Migration

This guide explains how to migrate an existing project toward the Unified Framework without a large one-shot rewrite.

## Migration principle

Define the primary surface first, then migrate by reference, cleanup, and gradual replacement. Avoid turning migration into a big-bang rewrite.

## Recommended sequence

1. Audit the current project rules, project facts, feature flow, and execution habits
2. Map current artifacts into the layer model
3. Choose the existing primary source for each concern and remove duplicates over time
4. Introduce a stable project-memory handshake for facts and durable status
5. Introduce a stable `spec -> plan -> tasks` feature path for non-trivial work
6. Keep runtime execution behavior separate from durable project truth
7. Require evidence before any durable pass/write-back change

## What to avoid

- do not migrate by copying everything into a new public surface
- do not let examples or scripts become the main contract
- do not treat orchestration as a minimum-kernel prerequisite
- do not let documentation wording outrun the actual authority model

## Public mirror note

This guide describes the migration strategy. It is not itself the semantic truth source for a live project. Real migrations must still respect the current source-first model.

## Batch 2 Wave 1 note

For this wave, use the public canonical kit docs to understand the stabilized boundaries first.

Do not assume that the public repo already contains:

- the formal seed payload
- the formal method-only payload

Those remain later-wave exports even though the directory skeleton is now visible.
