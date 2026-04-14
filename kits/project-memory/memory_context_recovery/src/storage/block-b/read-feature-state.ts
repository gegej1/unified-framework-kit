import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import type { FeatureStateSnapshot } from '../../contracts/block-b-write';
import type { PromotionBlockReason } from '../../contracts/block-b-promotion';

type FeatureStateReadResult = {
  snapshot: FeatureStateSnapshot | null;
  reason: PromotionBlockReason | null;
};

export async function readFeatureStateSnapshot(rootDirectory: string): Promise<FeatureStateReadResult> {
  const path = join(resolve(rootDirectory), 'working', 'feature-state.json');

  try {
    const raw = await readFile(path, 'utf8');
    const parsed = JSON.parse(raw) as Partial<FeatureStateSnapshot>;

    if (
      typeof parsed.activeFeatureId !== 'string' ||
      !parsed.activeFeatureId.trim() ||
      !Number.isInteger(parsed.stateVersion) ||
      typeof parsed.updatedAt !== 'string' ||
      !parsed.updatedAt.trim()
    ) {
      return { snapshot: null, reason: 'INVALID_FEATURE_STATE' };
    }

    const stateVersion = parsed.stateVersion as number;

    return {
      snapshot: {
        activeFeatureId: parsed.activeFeatureId,
        stateVersion,
        updatedAt: parsed.updatedAt
      },
      reason: null
    };
  } catch (error) {
    if (isMissingFileError(error)) {
      return { snapshot: null, reason: 'MISSING_FEATURE_STATE' };
    }

    return { snapshot: null, reason: 'INVALID_FEATURE_STATE' };
  }
}

function isMissingFileError(error: unknown): error is { code: 'ENOENT' } {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}
