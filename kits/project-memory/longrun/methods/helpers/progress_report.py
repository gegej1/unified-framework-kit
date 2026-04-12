#!/usr/bin/env python3
import json
import sys
from collections import Counter
from pathlib import Path


def load_features(path: Path):
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("feature_list.json must be a JSON array")
    return data


def to_int(value, fallback=999999):
    try:
        return int(value)
    except (TypeError, ValueError):
        return fallback


def feature_id(item, idx):
    raw = item.get("id")
    if isinstance(raw, str) and raw.strip():
        return raw.strip()
    return f"<missing-id-{idx}>"


def dependency_list(item):
    raw = item.get("depends_on")
    if not isinstance(raw, list):
        return []
    result = []
    for dep in raw:
        if isinstance(dep, str) and dep.strip():
            result.append(dep.strip())
    return result


def feature_sort_key(item, idx):
    return (to_int(item.get("priority", 999999)), feature_id(item, idx))


def main():
    if len(sys.argv) < 2:
        print("Usage: progress_report.py <feature_list.json> [top_n]")
        sys.exit(1)

    path = Path(sys.argv[1])
    top_n = int(sys.argv[2]) if len(sys.argv) > 2 else 10

    features = load_features(path)
    ids = [feature_id(feature, idx) for idx, feature in enumerate(features)]
    known_ids = set(ids)
    passed_ids = {
        feature_id(feature, idx)
        for idx, feature in enumerate(features)
        if bool(feature.get("passes", False))
    }

    duplicate_ids = sorted(
        feature_id
        for feature_id, count in Counter(ids).items()
        if count > 1
    )

    unknown_dependencies = {}
    blocked_by_dependencies = {}
    for idx, feature in enumerate(features):
        current_id = feature_id(feature, idx)
        deps = dependency_list(feature)
        unknown = [dep for dep in deps if dep not in known_ids]
        if unknown:
            unknown_dependencies[current_id] = unknown

        unmet = [dep for dep in deps if dep not in passed_ids]
        if not bool(feature.get("passes", False)) and unmet:
            blocked_by_dependencies[current_id] = unmet

    total = len(features)
    passed = len(passed_ids)
    remaining = total - passed
    pct = (passed / total * 100.0) if total else 0.0

    by_category_total = Counter(feature.get("category", "unknown") for feature in features)
    by_category_passed = Counter(
        feature.get("category", "unknown")
        for feature in features
        if bool(feature.get("passes", False))
    )

    print(f"Feature file: {path}")
    print(f"Progress: {passed}/{total} passing ({pct:.1f}%)")
    print(f"Remaining: {remaining}")
    print(f"Blocked by dependencies: {len(blocked_by_dependencies)}")
    print()

    print("By category:")
    for category in sorted(by_category_total.keys()):
        cat_total = by_category_total[category]
        cat_passed = by_category_passed.get(category, 0)
        cat_pct = (cat_passed / cat_total * 100.0) if cat_total else 0.0
        print(f"- {category}: {cat_passed}/{cat_total} ({cat_pct:.1f}%)")

    remaining_items = sorted(
        [
            (idx, feature)
            for idx, feature in enumerate(features)
            if not bool(feature.get("passes", False))
        ],
        key=lambda pair: feature_sort_key(pair[1], pair[0]),
    )

    unblocked_items = [
        (idx, feature)
        for idx, feature in remaining_items
        if feature_id(feature, idx) not in blocked_by_dependencies
    ][:top_n]
    blocked_items = [
        (idx, feature)
        for idx, feature in remaining_items
        if feature_id(feature, idx) in blocked_by_dependencies
    ][:top_n]

    if duplicate_ids:
        print()
        print("Warnings:")
        print(f"- Duplicate feature IDs: {', '.join(duplicate_ids)}")

    if unknown_dependencies:
        print()
        print("Dependency warnings:")
        for current_id, deps in sorted(unknown_dependencies.items()):
            print(f"- {current_id} references missing IDs: {', '.join(deps)}")

    print()
    print(f"Next {len(unblocked_items)} unblocked candidates:")
    for idx, feature in unblocked_items:
        current_id = feature_id(feature, idx)
        priority = feature.get("priority", "?")
        description = feature.get("description", "")
        print(f"- {current_id} (priority {priority}): {description}")

    if blocked_items:
        print()
        print(f"Top {len(blocked_items)} blocked candidates:")
        for idx, feature in blocked_items:
            current_id = feature_id(feature, idx)
            priority = feature.get("priority", "?")
            blockers = blocked_by_dependencies.get(current_id, [])
            description = feature.get("description", "")
            print(
                f"- {current_id} (priority {priority}) blocked by [{', '.join(blockers)}]: {description}"
            )


if __name__ == "__main__":
    main()
