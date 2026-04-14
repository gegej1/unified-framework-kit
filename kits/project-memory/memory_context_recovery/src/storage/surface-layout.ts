import { join, resolve } from 'node:path';

import {
  optionalContextSurfaceKinds,
  requiredTruthSurfaceKinds,
  type CanonicalSurfaceLayout,
  type CanonicalSurfacePathMap
} from '../contracts/surfaces';

export function resolveCanonicalSurfaceLayout(rootDirectory: string): CanonicalSurfaceLayout {
  const resolvedRoot = resolve(rootDirectory);
  const paths: CanonicalSurfacePathMap = {
    'durable/procedures': join(resolvedRoot, 'durable', 'procedures.md'),
    'durable/facts': join(resolvedRoot, 'durable', 'facts.md'),
    'durable/verdicts': join(resolvedRoot, 'durable', 'verdicts.md'),
    'durable/evidence': join(resolvedRoot, 'durable', 'evidence.md'),
    'working/current-task': join(resolvedRoot, 'working', 'current-task.md'),
    'working/restore-gate': join(resolvedRoot, 'working', 'restore-gate.md'),
    'summaries/latest': join(resolvedRoot, 'summaries', 'latest.md')
  };

  return {
    rootDirectory: resolvedRoot,
    paths,
    requiredKinds: [...requiredTruthSurfaceKinds],
    optionalKinds: [...optionalContextSurfaceKinds]
  };
}
