import type {
  CoreRuntimeRole,
  ResultCollectionPacket,
  RoleScopedSlice,
  RoutingPosture,
  UnifiedEnvelope
} from '../../contracts/block-c-dispatcher';
import {
  InvalidPackagingInputError,
  coreRuntimeRoles
} from '../../contracts/block-c-dispatcher';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isCoreRuntimeRole(value: unknown): value is CoreRuntimeRole {
  return typeof value === 'string' && coreRuntimeRoles.includes(value as CoreRuntimeRole);
}

export function assertValidRoleScopedSlice(slice: unknown): asserts slice is RoleScopedSlice {
  if (!isRecord(slice)) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a complete role-scoped slice');
  }

  if (
    slice.packetKind !== 'role-scoped-slice' ||
    !isNonEmptyString(slice.packetMarker) ||
    slice.sourceRole !== 'dispatcher' ||
    !isCoreRuntimeRole(slice.targetRole) ||
    !isNonEmptyString(slice.activeFeatureId) ||
    !isNonEmptyString(slice.taskId) ||
    slice.nonAuthoritative !== true ||
    slice.durableTouched !== false
  ) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a complete role-scoped slice');
  }
}

export function assertValidRoutingPosture(routing: unknown): asserts routing is RoutingPosture {
  if (!isRecord(routing)) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a complete routing posture');
  }

  if (
    routing.routingKind !== 'dispatcher-routing-posture' ||
    routing.sourceRole !== 'dispatcher' ||
    !isCoreRuntimeRole(routing.targetRole) ||
    routing.dispatchOnly !== true ||
    routing.executesWork !== false ||
    routing.durableTouched !== false
  ) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a complete routing posture');
  }
}

export function assertValidUnifiedEnvelope(envelope: unknown): asserts envelope is UnifiedEnvelope {
  if (!isRecord(envelope)) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a complete unified envelope');
  }

  if (
    envelope.envelopeKind !== 'unified-dispatch-envelope' ||
    envelope.sourceRole !== 'dispatcher' ||
    !isCoreRuntimeRole(envelope.targetRole) ||
    envelope.nonAuthoritative !== true ||
    envelope.acceptance !== false ||
    envelope.verificationPass !== false ||
    envelope.durableTruthPromotion !== false
  ) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a complete unified envelope');
  }

  assertValidRoleScopedSlice(envelope.slice);
  assertValidRoutingPosture(envelope.routing);

  if (envelope.targetRole !== envelope.slice.targetRole || envelope.targetRole !== envelope.routing.targetRole) {
    throw new InvalidPackagingInputError('Unified envelope requires aligned slice and routing targets');
  }
}

export function assertValidResultCollectionPacket(
  resultCollection: unknown
): asserts resultCollection is ResultCollectionPacket {
  if (!isRecord(resultCollection)) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a complete result collection packet');
  }

  if (
    resultCollection.packetKind !== 'non-authoritative-result-collection' ||
    resultCollection.sourceRole !== 'dispatcher' ||
    !isCoreRuntimeRole(resultCollection.targetRole) ||
    !isNonEmptyString(resultCollection.activeFeatureId) ||
    !isNonEmptyString(resultCollection.taskId) ||
    resultCollection.nonAuthoritative !== true ||
    resultCollection.acceptance !== false ||
    resultCollection.verificationPass !== false ||
    resultCollection.durableTruthPromotion !== false
  ) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a complete result collection packet');
  }
}
