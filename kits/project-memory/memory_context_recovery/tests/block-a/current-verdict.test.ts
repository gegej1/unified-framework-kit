import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';

import {
  assembleRestoreInputBundle,
  createRequiredReadPlan,
  parseCurrentVerdictStatus,
  resolveCanonicalSurfaceLayout
} from '../../src/index';

async function bundleFor(name: string) {
  const fixtureRoot = resolve(`tests/fixtures/block-a/${name}`);
  const plan = createRequiredReadPlan(resolveCanonicalSurfaceLayout(fixtureRoot));
  return assembleRestoreInputBundle(plan);
}

describe('Block A current verdict parsing', () => {
  it('parses APPROVED as the current verdict', async () => {
    const status = parseCurrentVerdictStatus(await bundleFor('approved'));

    expect(status).toMatchObject({
      exists: true,
      verdict: 'APPROVED',
      blockingHint: 'none'
    });
  });

  it('parses APPROVED_WITH_CONDITIONS as a conditional stop verdict', async () => {
    const status = parseCurrentVerdictStatus(await bundleFor('conditional-verdict'));

    expect(status).toMatchObject({
      exists: true,
      verdict: 'APPROVED_WITH_CONDITIONS',
      blockingHint: 'conditional-stop'
    });
  });

  it('parses REJECTED as a rejected verdict', async () => {
    const status = parseCurrentVerdictStatus(await bundleFor('rejected-verdict'));

    expect(status).toMatchObject({
      exists: true,
      verdict: 'REJECTED',
      blockingHint: 'rejected'
    });
  });

  it('reports verdict absence without faking approval', async () => {
    const status = parseCurrentVerdictStatus(await bundleFor('missing-verdict'));

    expect(status).toMatchObject({
      exists: false,
      verdict: 'ABSENT',
      blockingHint: 'missing-verdict'
    });
  });
});
