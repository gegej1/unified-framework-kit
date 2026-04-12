# Agent Guidelines Seed (spec-kit)

This file is a **downstream seed** for a project's feature-delivery guidance.

## Seed status

- Copy and adapt this file inside the downstream repository that adopts `spec-kit`
- Do not treat this file as repo-governance authority inside `unified-framework-kit`
- In this public repository, root `AGENTS.md` remains the only repo-governance authority

## Intended role

Use this seed when a downstream project wants a starting point for:

- feature-local delivery guidance
- `spec -> plan -> tasks` working rules
- evidence-aware implementation discipline
- boundaries between feature delivery, project memory, and execution behavior

## Suggested positioning in a downstream repo

After copying this seed into a live project:

- adapt it to the project's actual rules, toolchain, and directory layout
- keep project-local rules above reusable kit defaults
- treat this seed as a starting point, not a finished policy surface

## Baseline boundaries

- This seed is for the Feature Delivery Layer only
- Project facts, long-term progress, and durable pass state still belong to Project Memory
- Runtime execution behavior still belongs to the Execution Layer
- Long-term multi-agent governance does not belong here

## Must-follow baseline

- Read the downstream project's local rules before generating feature artifacts
- Use this seed to produce only the current feature's `spec.md`, `plan.md`, and `tasks.md`
- Keep the current feature traceable to project-memory records and evidence
- Require reproducible validation for code changes and implementation claims
- Keep feature boundaries, acceptance criteria, and task breakdown explicit

## Must-not-overreach

- Do not turn this seed into project-wide backlog ownership
- Do not let it become the durable source for long-term status or `passes: true`
- Do not let it act as the runtime execution method
- Do not let it replace the downstream repository's own governance files

## Suggested workflow

1. Read the downstream project's local rules and current project-memory context
2. Identify the selected feature and its constraints
3. Create or update `spec.md`, `plan.md`, and `tasks.md` for the current feature
4. Make sure acceptance criteria and evidence anchors are clear
5. Hand the bounded feature artifacts to the execution layer for implementation

## Downstream adaptation note

This seed is intentionally generic. A real adopting repository should customize:

- commands
- testing strategy
- directory structure
- code style
- project-specific quality bars
