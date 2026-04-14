import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

import type { FeatureStateSnapshot, MemoryControlWriteResult } from '../../contracts/block-b-write';
import { InvalidWorkingStateWriteError } from '../../contracts/block-b-write';

export async function writeFeatureState(rootDirectory: string, snapshot: FeatureStateSnapshot): Promise<MemoryControlWriteResult> {
  validateFeatureStateSnapshot(snapshot);

  const path = join(resolve(rootDirectory), 'working', 'feature-state.json');
  const content = `${JSON.stringify(snapshot, null, 2)}\n`;

  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, 'utf8');

  return {
    target: 'feature-state',
    path,
    content,
    bytesWritten: Buffer.byteLength(content, 'utf8'),
    durableTouched: false
  };
}

function validateFeatureStateSnapshot(snapshot: FeatureStateSnapshot): void {
  if (!snapshot.activeFeatureId.trim()) {
    throw new InvalidWorkingStateWriteError('Feature state snapshot requires activeFeatureId');
  }

  if (!Number.isInteger(snapshot.stateVersion) || snapshot.stateVersion < 0) {
    throw new InvalidWorkingStateWriteError('Feature state snapshot requires a non-negative integer stateVersion');
  }

  if (!snapshot.updatedAt.trim()) {
    throw new InvalidWorkingStateWriteError('Feature state snapshot requires updatedAt');
  }
}
