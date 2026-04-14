import { describe, expect, it } from 'vitest';
import { join } from 'node:path';

import { applyWorkingStateWrite } from '../../src/index';
import { prepareFixtureWorkspace, readText } from './test-helpers';

describe('Block B write foundation', () => {
  it('writes feature-state.json through the single memory-control write entry', async () => {
    const workspace = await prepareFixtureWorkspace('empty-state');

    const result = await applyWorkingStateWrite({
      rootDirectory: workspace,
      target: 'feature-state',
      snapshot: {
        activeFeatureId: 'F-123',
        stateVersion: 2,
        updatedAt: '2026-04-14T00:00:00.000Z'
      }
    });

    expect(result).toMatchObject({
      target: 'feature-state',
      durableTouched: false
    });
    expect(result.path).toBe(join(workspace, 'working', 'feature-state.json'));
    expect(result.content).toBe(`{\n  "activeFeatureId": "F-123",\n  "stateVersion": 2,\n  "updatedAt": "2026-04-14T00:00:00.000Z"\n}\n`);
    expect(await readText(result.path)).toBe(result.content);
  });

  it('keeps durable verdict and evidence surfaces untouched', async () => {
    const workspace = await prepareFixtureWorkspace('existing-state');

    await applyWorkingStateWrite({
      rootDirectory: workspace,
      target: 'feature-state',
      snapshot: {
        activeFeatureId: 'F-200',
        stateVersion: 3,
        updatedAt: '2026-04-14T10:00:00.000Z'
      }
    });

    expect(await readText(join(workspace, 'durable', 'verdicts.md'))).toContain('EXISTING_DURABLE_VERDICT');
    expect(await readText(join(workspace, 'durable', 'evidence.md'))).toContain('EXISTING_DURABLE_EVIDENCE');
  });
});
