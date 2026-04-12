# longrun Methods

Classification: method-only

Authority: non-authoritative

Tool specificity: this surface now includes general working-method docs plus a small set of public-safe helpers for feature-list reporting. These helpers are optional and do not define execution behavior.

Fallback: if this directory is unavailable, downstream teams can still operate `longrun` manually by using `../canonical/README.md`, `../seed/`, and their repository's own tools.

Non-goals:

- shipping raw prompt scaffolds
- shipping raw execution implementation
- turning project-memory helper material into execution authority
- copying `.codex/skills/*`
- replacing `spec-kit` feature delivery artifacts

## What is included now

Wave 3 turns this directory into a real public method-only surface.

It currently includes:

- `working-method.md`
- `working-method.zh-CN.md`
- `helpers/README.md`
- `helpers/progress_report.py`
- `helpers/next_feature.py`

## What these methods are for

Use this directory when you want practical guidance for operating the Project Memory Layer across repeated sessions.

Typical use cases:

- reviewing feature-list progress without changing layer ownership
- selecting the next unblocked feature candidate from project memory
- aligning session continuity with evidence-aware write-back

## What these methods are not for

Do not use this directory as:

- feature delivery authority
- runtime execution authority
- repo-governance authority
- a replacement for canonical layer meaning or downstream seed templates

If you need the layer contract, read `../canonical/README.md`.

If you need starter files, use `../seed/`.
