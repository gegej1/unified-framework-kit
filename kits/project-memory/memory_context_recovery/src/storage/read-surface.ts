import { readFile, stat } from 'node:fs/promises';

import type { RequiredReadItem, SurfaceReadResult } from '../contracts/restore-input';

export async function readSurface(item: RequiredReadItem): Promise<SurfaceReadResult> {
  try {
    const [content, metadata] = await Promise.all([
      readFile(item.path, 'utf8'),
      stat(item.path)
    ]);

    return {
      kind: item.kind,
      path: item.path,
      required: item.required,
      exists: true,
      content,
      order: item.order,
      position: item.position,
      size: metadata.size
    };
  } catch (error) {
    if (isMissingFileError(error)) {
      return {
        kind: item.kind,
        path: item.path,
        required: item.required,
        exists: false,
        content: null,
        order: item.order,
        position: item.position,
        size: null
      };
    }

    throw error;
  }
}

function isMissingFileError(error: unknown): error is { code: 'ENOENT' } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  );
}
