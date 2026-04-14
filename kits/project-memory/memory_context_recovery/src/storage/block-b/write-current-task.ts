import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

import type { CurrentTaskSnapshot, MemoryControlWriteResult } from '../../contracts/block-b-write';
import { InvalidWorkingStateWriteError } from '../../contracts/block-b-write';

export async function writeCurrentTask(rootDirectory: string, snapshot: CurrentTaskSnapshot): Promise<MemoryControlWriteResult> {
  validateCurrentTaskSnapshot(snapshot);

  const path = join(resolve(rootDirectory), 'working', 'current-task.md');
  const content = [
    '# Current Task',
    `Task-Id: ${snapshot.taskId}`,
    `Active-Feature-Id: ${snapshot.activeFeatureId}`,
    `Updated-At: ${snapshot.updatedAt}`,
    ''
  ].join('\n');

  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, 'utf8');

  return {
    target: 'current-task',
    path,
    content,
    bytesWritten: Buffer.byteLength(content, 'utf8'),
    durableTouched: false
  };
}

function validateCurrentTaskSnapshot(snapshot: CurrentTaskSnapshot): void {
  if (!snapshot.taskId.trim()) {
    throw new InvalidWorkingStateWriteError('Current task snapshot requires taskId');
  }

  if (!snapshot.activeFeatureId.trim()) {
    throw new InvalidWorkingStateWriteError('Current task snapshot requires activeFeatureId');
  }

  if (!snapshot.updatedAt.trim()) {
    throw new InvalidWorkingStateWriteError('Current task snapshot requires updatedAt');
  }
}
