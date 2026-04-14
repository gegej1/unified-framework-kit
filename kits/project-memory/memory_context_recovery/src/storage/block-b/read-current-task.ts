import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import type { CurrentTaskSnapshot } from '../../contracts/block-b-write';
import type { PromotionBlockReason } from '../../contracts/block-b-promotion';

type CurrentTaskReadResult = {
  snapshot: CurrentTaskSnapshot | null;
  reason: PromotionBlockReason | null;
  taskId: string | null;
  activeFeatureId: string | null;
};

export async function readCurrentTaskSnapshot(rootDirectory: string): Promise<CurrentTaskReadResult> {
  const path = join(resolve(rootDirectory), 'working', 'current-task.md');

  try {
    const raw = await readFile(path, 'utf8');
    const taskIds = collectLineValues(raw, 'Task-Id');
    const featureIds = collectLineValues(raw, 'Active-Feature-Id');
    const updatedAts = collectLineValues(raw, 'Updated-At');

    if (taskIds.length === 0 || featureIds.length === 0 || updatedAts.length === 0) {
      return {
        snapshot: null,
        reason: 'INVALID_CURRENT_TASK',
        taskId: taskIds[0] ?? null,
        activeFeatureId: featureIds[0] ?? null
      };
    }

    if (taskIds.length > 1 || featureIds.length > 1) {
      return {
        snapshot: null,
        reason: 'AMBIGUOUS_CURRENT_TASK_BINDING',
        taskId: taskIds[0] ?? null,
        activeFeatureId: featureIds[0] ?? null
      };
    }

    return {
      snapshot: {
        taskId: taskIds[0],
        activeFeatureId: featureIds[0],
        updatedAt: updatedAts[0]
      },
      reason: null,
      taskId: taskIds[0],
      activeFeatureId: featureIds[0]
    };
  } catch (error) {
    if (isMissingFileError(error)) {
      return {
        snapshot: null,
        reason: 'MISSING_CURRENT_TASK',
        taskId: null,
        activeFeatureId: null
      };
    }

    return {
      snapshot: null,
      reason: 'INVALID_CURRENT_TASK',
      taskId: null,
      activeFeatureId: null
    };
  }
}

function collectLineValues(content: string, label: string): string[] {
  const regex = new RegExp(`^${label}:\\s*(.+)$`, 'gmi');
  const values: string[] = [];
  for (const match of content.matchAll(regex)) {
    values.push(match[1].trim());
  }
  return values;
}

function isMissingFileError(error: unknown): error is { code: 'ENOENT' } {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}
