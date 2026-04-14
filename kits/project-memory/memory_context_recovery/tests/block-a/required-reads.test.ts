import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';

import { createRequiredReadPlan, resolveCanonicalSurfaceLayout } from '../../src/index';

describe('Block A required read planning', () => {
  it('produces a fixed-order plan with summary only as optional last-position context', () => {
    const fixtureRoot = resolve('tests/fixtures/block-a/complete');
    const plan = createRequiredReadPlan(resolveCanonicalSurfaceLayout(fixtureRoot));

    expect(plan.orderedItems.map((item) => item.kind)).toEqual([
      'durable/procedures',
      'durable/facts',
      'durable/verdicts',
      'durable/evidence',
      'working/current-task',
      'working/restore-gate',
      'summaries/latest'
    ]);

    expect(plan.requiredKinds).toEqual([
      'durable/procedures',
      'durable/facts',
      'durable/verdicts',
      'durable/evidence',
      'working/current-task',
      'working/restore-gate'
    ]);

    expect(plan.optionalKinds).toEqual(['summaries/latest']);
    expect(plan.orderedItems.at(-1)).toMatchObject({
      kind: 'summaries/latest',
      required: false,
      position: 'optional-last-context'
    });
  });
});
