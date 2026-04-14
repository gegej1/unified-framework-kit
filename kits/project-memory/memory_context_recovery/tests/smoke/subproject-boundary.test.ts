import { describe, expect, it } from 'vitest';

import {
  getMemoryContextRecoveryIdentity,
  memoryContextRecoveryBoundary
} from '../../src/index';

describe('memory_context_recovery startup package', () => {
  it('exports a stable subproject identity and boundary marker', () => {
    expect(getMemoryContextRecoveryIdentity()).toEqual({
      id: 'memory_context_recovery',
      scope: 'isolated-subproject',
      packet: 'I6A-block-f-closeout-non-authority-foundation'
    });

    expect(memoryContextRecoveryBoundary).toEqual({
      root: 'memory_context_recovery',
      blocksImplemented: true,
      businessLogicIncluded: true
    });
  });
});
