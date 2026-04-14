import type { ResultCollectionPacket, RoleScopedSlice } from '../../contracts/block-c-dispatcher';
import { assertValidRoleScopedSlice } from './validate-packaging-input';

export function createResultCollectionPacket(slice: RoleScopedSlice): ResultCollectionPacket {
  assertValidRoleScopedSlice(slice);

  return {
    packetKind: 'non-authoritative-result-collection',
    sourceRole: 'dispatcher',
    targetRole: slice.targetRole,
    activeFeatureId: slice.activeFeatureId,
    taskId: slice.taskId,
    nonAuthoritative: true,
    acceptance: false,
    verificationPass: false,
    durableTruthPromotion: false
  };
}
