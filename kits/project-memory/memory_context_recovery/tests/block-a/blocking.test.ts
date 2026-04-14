import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';

import {
  assembleRestoreInputBundle,
  createRequiredReadPlan,
  deriveBlockingDecision,
  parseCurrentVerdictStatus,
  parseRestoreAcknowledgmentStatus,
  resolveCanonicalSurfaceLayout
} from '../../src/index';

async function inputsFor(name: string) {
  const fixtureRoot = resolve(`tests/fixtures/block-a/${name}`);
  const plan = createRequiredReadPlan(resolveCanonicalSurfaceLayout(fixtureRoot));
  const bundle = await assembleRestoreInputBundle(plan);
  return {
    bundle,
    ack: parseRestoreAcknowledgmentStatus(bundle),
    verdict: parseCurrentVerdictStatus(bundle)
  };
}

describe('Block A blocking derivation', () => {
  it('does not block for approved verdict plus complete restore ack', async () => {
    const { ack, verdict } = await inputsFor('approved');
    expect(deriveBlockingDecision({ ack, verdict })).toEqual({ blocked: false, reasons: [] });
  });

  it('blocks fail-closed when restore ack is incomplete', async () => {
    const { ack, verdict } = await inputsFor('incomplete-ack');
    expect(deriveBlockingDecision({ ack, verdict })).toEqual({
      blocked: true,
      reasons: ['INCOMPLETE_RESTORE_ACK']
    });
  });

  it('blocks on conditional verdict stop', async () => {
    const { ack, verdict } = await inputsFor('conditional-verdict');
    expect(deriveBlockingDecision({ ack, verdict })).toEqual({
      blocked: true,
      reasons: ['CONDITIONAL_VERDICT_STOP']
    });
  });

  it('blocks on rejected verdict', async () => {
    const { ack, verdict } = await inputsFor('rejected-verdict');
    expect(deriveBlockingDecision({ ack, verdict })).toEqual({
      blocked: true,
      reasons: ['REJECTED_VERDICT']
    });
  });

  it('blocks fail-closed when no current verdict exists', async () => {
    const { ack, verdict } = await inputsFor('missing-verdict');
    expect(deriveBlockingDecision({ ack, verdict })).toEqual({
      blocked: true,
      reasons: ['MISSING_CURRENT_VERDICT']
    });
  });
});
