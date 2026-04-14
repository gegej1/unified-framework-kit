import type { MemoryControlWriteRequest, MemoryControlWriteResult } from '../../contracts/block-b-write';
import { writeCurrentTask } from '../../storage/block-b/write-current-task';
import { writeFeatureState } from '../../storage/block-b/write-feature-state';

export function applyWorkingStateWrite(request: MemoryControlWriteRequest): Promise<MemoryControlWriteResult> {
  if (request.target === 'feature-state') {
    return writeFeatureState(request.rootDirectory, request.snapshot);
  }

  return writeCurrentTask(request.rootDirectory, request.snapshot);
}
