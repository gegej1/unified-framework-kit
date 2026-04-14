import type { RoleScopedSlice, RoutingPosture, UnifiedEnvelope } from '../../contracts/block-c-dispatcher';
import { InvalidPackagingInputError } from '../../contracts/block-c-dispatcher';
import { assertValidRoleScopedSlice, assertValidRoutingPosture } from './validate-packaging-input';

export function assembleUnifiedEnvelope(slice: RoleScopedSlice, routing: RoutingPosture): UnifiedEnvelope {
  assertValidRoleScopedSlice(slice);
  assertValidRoutingPosture(routing);

  if (slice.targetRole !== routing.targetRole) {
    throw new InvalidPackagingInputError('Unified envelope requires aligned slice and routing targets');
  }

  return {
    envelopeKind: 'unified-dispatch-envelope',
    sourceRole: 'dispatcher',
    targetRole: slice.targetRole,
    slice,
    routing,
    nonAuthoritative: true,
    acceptance: false,
    verificationPass: false,
    durableTruthPromotion: false
  };
}
