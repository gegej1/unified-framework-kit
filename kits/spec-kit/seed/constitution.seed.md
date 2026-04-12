# [PROJECT_NAME] Constitution Seed

> This file is a **downstream seed** for a project's stable engineering rules.
> Copy and adapt it inside the downstream repository that adopts `spec-kit`.
>
> In `unified-framework-kit`, this file is **not** a repo-governance authority.
> Root `AGENTS.md` remains the only repo-governance authority in this public repository.

## How to use this seed

- Use this file to define stable project rules, quality bars, and workflow boundaries
- Do not use it to store project backlog, current status, recent progress, or durable completion state
- Keep current-feature content in `spec.md`, `plan.md`, and `tasks.md`
- Keep runtime execution behavior in the execution layer rather than in this constitution

## 1) Core principles (non-negotiable)

1. **Keep things simple**
   - Reduce unnecessary code, files, and documentation noise
   - Prefer clarity over cleverness

2. **Preserve modular boundaries**
   - Avoid oversized files, functions, and classes
   - Organize content by responsibility

3. **Prefer contracts before internals**
   - Define interfaces, data contracts, and expected behavior before implementation details
   - Update contract documentation when interfaces change

4. **Document before code**
   - For each non-trivial feature, define `spec.md`, `plan.md`, and `tasks.md` before implementation
   - Use those artifacts to keep scope, tasks, and acceptance criteria visible

5. **Require reproducible verification**
   - Changes should come with reproducible validation steps
   - Testing commands and checks should be recorded in durable project files, not only in chat

6. **Optimize for usability and robustness**
   - Prefer small, repeatable workflows over fragile manual sequences
   - Keep configuration and setup understandable to new contributors

7. **Stay consistent**
   - Keep naming, structure, and project conventions coherent
   - Avoid unnecessary duplicate toolchains or parallel workflows

8. **Act on evidence**
   - Avoid guessing when requirements or constraints are unclear
   - Make changes that can be explained and verified

9. **Keep rules stable and facts elsewhere**
   - This constitution defines stable rules, not dynamic project facts
   - Project facts belong in Project Memory
   - Current-feature delivery artifacts belong in `spec.md`, `plan.md`, and `tasks.md`

## 2) Project addendum (required)

Fill and adapt this section in the downstream project.

1. **Shape and scope**
   - Project form: [CLI / web / service / library / multi-surface]
   - Out-of-scope list: [what V1 will not do]
   - External boundary: [API / SDK / callback / none]

2. **Quality bar**
   - Testing strategy: [unit / integration / E2E choices]
   - Verification commands: [durable commands for main change types]
   - Compatibility rule: [versioning / migration / breaking-change notes]

3. **Security and compliance**
   - Data classification: [public / internal / customer / sensitive]
   - Logging and audit rules: [what can be recorded and for how long]
   - Dependency and network rules: [approval or supply-chain constraints]
   - Access control: [least-privilege expectations]

4. **Engineering conventions**
   - Formatting and lint rules: [required checks]
   - Repository structure: [src / tests / scripts / docs layout]
   - Subproject rule: [which child projects need their own local guidance files]

## 3) Feature-delivery workflow

1. Select the current feature using the downstream project's project-memory source
2. Define or update `spec.md` with requirements, scope, and acceptance criteria
3. Define or update `plan.md` with the technical approach
4. Define or update `tasks.md` with execution-ready work items
5. Implement with reproducible verification and evidence-aware handoff

## Governance

- In a downstream repository, this constitution should outrank ad-hoc habits or undocumented norms
- Changes should be reviewed, explained, and migrated deliberately

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
