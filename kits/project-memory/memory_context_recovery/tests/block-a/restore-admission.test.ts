import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';

import {
  assembleRestoreInputBundle,
  createRequiredReadPlan,
  decideRestoreAdmission,
  resolveCanonicalSurfaceLayout
} from '../../src/index';

async function bundleFor(name: string) {
  const fixtureRoot = resolve(`tests/fixtures/block-a/${name}`);
  const plan = createRequiredReadPlan(resolveCanonicalSurfaceLayout(fixtureRoot));
  return assembleRestoreInputBundle(plan);
}

describe('Block A restore admission decision', () => {
  it('admits only when truth surfaces plus restore gate support it', async () => {
    const decision = decideRestoreAdmission(await bundleFor('approved'));

    expect(decision.decision).toBe('admitted');
    expect(decision.reasons).toEqual([]);
    expect(decision.summaryInfluenced).toBe(false);
  });

  it('rejects when the verdict is rejected', async () => {
    const decision = decideRestoreAdmission(await bundleFor('rejected-verdict'));

    expect(decision.decision).toBe('rejected');
    expect(decision.reasons).toEqual(['REJECTED_VERDICT']);
  });

  it('rejects when the restore ack is incomplete', async () => {
    const decision = decideRestoreAdmission(await bundleFor('incomplete-ack'));

    expect(decision.decision).toBe('rejected');
    expect(decision.reasons).toEqual(['INCOMPLETE_RESTORE_ACK']);
  });

  it('ignores summary-only narrative when deriving admission', async () => {
    const decision = decideRestoreAdmission(await bundleFor('approved'));

    expect(decision.verdict.verdict).toBe('APPROVED');
    expect(decision.decision).toBe('admitted');
  });
});
