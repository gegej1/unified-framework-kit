import type { RequiredReadItem, RequiredReadPlan } from '../../contracts/restore-input';
import type { CanonicalSurfaceLayout, CanonicalSurfaceKind } from '../../contracts/surfaces';

const fixedReadOrder: CanonicalSurfaceKind[] = [
  'durable/procedures',
  'durable/facts',
  'durable/verdicts',
  'durable/evidence',
  'working/current-task',
  'working/restore-gate',
  'summaries/latest'
];

export function createRequiredReadPlan(layout: CanonicalSurfaceLayout): RequiredReadPlan {
  const orderedItems = fixedReadOrder.map<RequiredReadItem>((kind, index) => ({
    kind,
    path: layout.paths[kind],
    required: layout.requiredKinds.includes(kind as (typeof layout.requiredKinds)[number]),
    order: index,
    position: kind === 'summaries/latest' ? 'optional-last-context' : 'required-truth'
  }));

  return {
    layout,
    orderedItems,
    requiredKinds: [...layout.requiredKinds],
    optionalKinds: [...layout.optionalKinds]
  };
}
