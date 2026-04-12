# longrun Method Helpers

Classification: method-only

Authority: non-authoritative

Tool specificity: lightweight command-line helpers for repositories that keep a `feature_list.json` shaped like the public `longrun` seed.

Fallback: if these helpers do not fit your repository, keep using `../working-method.md`, `../../canonical/README.md`, and your own reporting or selection scripts.

Non-goals:

- replacing feature delivery artifacts
- replacing runtime execution behavior
- assuming hidden internal workspace layout
- requiring a specific package manager, absolute path, or local shell harness

## Included helpers

- `progress_report.py` — summarize progress, dependency blockers, and next unblocked candidates from a `feature_list.json`
- `next_feature.py` — print the highest-priority unblocked feature candidate from a `feature_list.json`

## Not exported in Wave 3

The following upstream helpers stay out of the public export for now:

- `bootstrap.sh`
- `session_start.sh`

They remain upstream-only because their current form still assumes more about local workspace setup and session harness shape than this public kit should require.
