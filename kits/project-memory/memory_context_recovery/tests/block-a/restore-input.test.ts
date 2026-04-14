import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';

import {
  MissingRequiredSurfaceError,
  assembleRestoreInputBundle,
  createRequiredReadPlan,
  resolveCanonicalSurfaceLayout
} from '../../src/index';

describe('Block A restore input assembly', () => {
  it('returns raw required and optional surface reads without doing business verdict logic', async () => {
    const fixtureRoot = resolve('tests/fixtures/block-a/complete');
    const plan = createRequiredReadPlan(resolveCanonicalSurfaceLayout(fixtureRoot));

    const bundle = await assembleRestoreInputBundle(plan);

    expect(bundle.requiredReads.map((item) => item.kind)).toEqual([
      'durable/procedures',
      'durable/facts',
      'durable/verdicts',
      'durable/evidence',
      'working/current-task',
      'working/restore-gate'
    ]);
    expect(bundle.optionalReads.map((item) => item.kind)).toEqual(['summaries/latest']);
    expect(bundle.optionalReads[0]?.content).toContain('optional context only');
    expect(bundle.containsBusinessJudgment).toBe(false);
    expect(bundle.currentVerdict).toBeUndefined();
    expect(bundle.blockingDerivation).toBeUndefined();
    expect(bundle.restoreAdmission).toBeUndefined();
  });

  it('does not fail when the optional summary is missing', async () => {
    const fixtureRoot = resolve('tests/fixtures/block-a/missing-summary');
    const plan = createRequiredReadPlan(resolveCanonicalSurfaceLayout(fixtureRoot));

    const bundle = await assembleRestoreInputBundle(plan);

    expect(bundle.requiredReads).toHaveLength(6);
    expect(bundle.optionalReads).toHaveLength(1);
    expect(bundle.optionalReads[0]).toMatchObject({
      kind: 'summaries/latest',
      exists: false,
      content: null
    });
  });

  it('fails when a required truth surface is missing', async () => {
    const fixtureRoot = resolve('tests/fixtures/block-a/missing-required');
    const plan = createRequiredReadPlan(resolveCanonicalSurfaceLayout(fixtureRoot));

    await expect(assembleRestoreInputBundle(plan)).rejects.toBeInstanceOf(MissingRequiredSurfaceError);
    await expect(assembleRestoreInputBundle(plan)).rejects.toMatchObject({
      kind: 'durable/evidence'
    });
  });
});
