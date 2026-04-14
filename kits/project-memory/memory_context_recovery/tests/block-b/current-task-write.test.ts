import { describe, expect, it } from 'vitest';
import { join } from 'node:path';

import { applyWorkingStateWrite } from '../../src/index';
import { prepareFixtureWorkspace, readText } from './test-helpers';

describe('Block B current-task write foundation', () => {
  it('writes current-task.md through the single memory-control write entry', async () => {
    const workspace = await prepareFixtureWorkspace('empty-state');

    const result = await applyWorkingStateWrite({
      rootDirectory: workspace,
      target: 'current-task',
      snapshot: {
        taskId: 'T-123',
        activeFeatureId: 'F-123',
        updatedAt: '2026-04-14T00:05:00.000Z'
      }
    });

    expect(result).toMatchObject({
      target: 'current-task',
      durableTouched: false
    });
    expect(result.path).toBe(join(workspace, 'working', 'current-task.md'));
    expect(result.content).toBe(`# Current Task\nTask-Id: T-123\nActive-Feature-Id: F-123\nUpdated-At: 2026-04-14T00:05:00.000Z\n`);
    expect(await readText(result.path)).toBe(result.content);
  });

  it('rewrites current-task deterministically when applying a new snapshot', async () => {
    const workspace = await prepareFixtureWorkspace('existing-state');

    const result = await applyWorkingStateWrite({
      rootDirectory: workspace,
      target: 'current-task',
      snapshot: {
        taskId: 'T-900',
        activeFeatureId: 'F-900',
        updatedAt: '2026-04-14T11:00:00.000Z'
      }
    });

    expect(result.content).toBe(`# Current Task\nTask-Id: T-900\nActive-Feature-Id: F-900\nUpdated-At: 2026-04-14T11:00:00.000Z\n`);
    expect(await readText(join(workspace, 'working', 'feature-state.json'))).toContain('F-OLD');
  });
});
