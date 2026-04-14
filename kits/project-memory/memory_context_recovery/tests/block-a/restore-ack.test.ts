import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';

import {
  assembleRestoreInputBundle,
  createRequiredReadPlan,
  parseRestoreAcknowledgmentStatus,
  resolveCanonicalSurfaceLayout
} from '../../src/index';

async function bundleFor(name: string) {
  const fixtureRoot = resolve(`tests/fixtures/block-a/${name}`);
  const plan = createRequiredReadPlan(resolveCanonicalSurfaceLayout(fixtureRoot));
  return assembleRestoreInputBundle(plan);
}

describe('Block A restore acknowledgment parsing', () => {
  it('parses a present and complete restore acknowledgment', async () => {
    const status = parseRestoreAcknowledgmentStatus(await bundleFor('approved'));

    expect(status).toMatchObject({
      state: 'ack-complete',
      present: true,
      complete: true,
      gateState: 'READY',
      reasons: []
    });
  });

  it('treats an incomplete acknowledgment as present but not complete', async () => {
    const status = parseRestoreAcknowledgmentStatus(await bundleFor('incomplete-ack'));

    expect(status).toMatchObject({
      state: 'ack-incomplete',
      present: true,
      complete: false,
      gateState: 'PENDING'
    });
    expect(status.reasons).toContain('INCOMPLETE_RESTORE_ACK');
  });

  it('treats an inconsistent gate state as invalid', async () => {
    const status = parseRestoreAcknowledgmentStatus(await bundleFor('invalid-ack'));

    expect(status).toMatchObject({
      state: 'ack-invalid',
      present: true,
      complete: false,
      gateState: 'PENDING'
    });
    expect(status.reasons).toContain('INVALID_RESTORE_ACK');
  });
});
