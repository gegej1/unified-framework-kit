# App Spec Template (Longterm Project Profile)

Use this file to record the project's stable profile, constraints, and command contract inside longterm.
It is a project-fact artifact and a project-specific instantiation of project rules.
It is not a second master rule source, and it should not replace feature delivery artifacts or session execution methods.
Fill every section before Session 1 ends.

## 0) Usage boundary
- This file captures relatively stable project facts, scope, constraints, and command expectations.
- Use it to instantiate project-specific rules and constraints, not to redefine upstream governance.
- Do not store dynamic session status here; use `feature_list.json` and `claude-progress.txt` for ongoing state.
- Feature delivery artifacts still belong to `spec规范`.
- Runtime execution methods still belong to `superpower skill`.

## 1) Project metadata
- Project name:
- Workspace name:
- Existing repo path (if migrating):
- Primary owner:
- Last updated (YYYY-MM-DD):

## 2) Product goal
Describe the product and business value in 3-6 sentences.

## 3) In-scope user workflows
List concrete, testable workflows.
1. Workflow 1
2. Workflow 2
3. Workflow 3

## 4) Out of scope
- Explicitly excluded behavior 1
- Explicitly excluded behavior 2

## 5) Technical baseline
- Runtime:
- Framework:
- Package manager:
- Data store:
- External APIs/services:
- Required environment variables:
- Allowed ports:

## 6) Existing-project migration constraints
If this workspace is attached to an existing codebase, define project-specific non-negotiables here.
These fields are project-level instances of rules and constraints, not a second rules authority.
- Stable modules that must not break:
- APIs/contracts that must remain backward compatible:
- Files/directories that cannot be touched:
- Required coding conventions:
- Required review/testing gates:

## 7) Commands contract
Keep these commands synchronized with `init.sh`.
- Install:
- Start app/service:
- Test:
- Lint:
- Build:
- E2E or smoke:

## 8) Quality and non-functional requirements
- Performance:
- Security:
- Accessibility:
- Observability:
- Reliability:

## 9) Definition of done
- [ ] All in-scope workflows have matching entries in `feature_list.json`.
- [ ] Each workflow is verifiable end-to-end through real user flow.
- [ ] Migration constraints are respected (if applicable).
- [ ] `init.sh` can prepare the environment in a repeatable way.
- [ ] Session handoff is clear from `claude-progress.txt`.
- [ ] `passes: true` is only used when acceptance evidence or equivalent verification records are traceable from feature delivery artifacts or longterm records.
