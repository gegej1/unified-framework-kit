import type { ParallelEligibilityResult } from '../../contracts/block-d-parallel';
import type { OwnershipAssignment, SerialOnlyFoundationResult, TopologyBoundaryResult } from '../../contracts/block-d-topology';
import type { CoreRuntimeRole } from '../../contracts/block-c-dispatcher';
import { InvalidParallelEligibilityInputError } from '../../contracts/block-d-parallel';
import { coreRuntimeRoles } from '../../contracts/block-c-dispatcher';

export function assertValidTopologyBoundary(boundary: unknown): asserts boundary is TopologyBoundaryResult {
  if (
    !isRecord(boundary) ||
    boundary.topologyKind !== 'strict-star-topology-boundary' ||
    boundary.hubRole !== 'dispatcher' ||
    !Array.isArray(boundary.roles) ||
    boundary.roles.length === 0 ||
    !boundary.roles.every((role, index, arr) => isCoreRuntimeRole(role) && arr.indexOf(role) === index) ||
    !Array.isArray(boundary.topologyClaims) ||
    boundary.topologyClaims.length !== boundary.roles.length ||
    !boundary.topologyClaims.every((claim, index) =>
      isRecord(claim) &&
      claim.claimKind === 'strict-star-link' &&
      claim.fromRole === 'dispatcher' &&
      claim.toRole === boundary.roles[index]
    ) ||
    !isRecord(boundary.ownershipMap) ||
    !boundary.roles.every((role) => isValidOwnershipAssignment(boundary.ownershipMap[role], role)) ||
    boundary.directNonDispatcherLinkage !== false ||
    boundary.nonAuthoritative !== true ||
    boundary.durableTouched !== false
  ) {
    throw new InvalidParallelEligibilityInputError('Parallel eligibility requires a valid strict-star topology boundary');
  }
}

export function assertValidSerialFoundation(
  foundation: unknown,
  boundary: TopologyBoundaryResult
): asserts foundation is SerialOnlyFoundationResult {
  if (
    !isRecord(foundation) ||
    foundation.serializationKind !== 'serial-only-foundation' ||
    foundation.hubRole !== 'dispatcher' ||
    !Array.isArray(foundation.roleOrder) ||
    foundation.roleOrder.length !== boundary.roles.length ||
    !foundation.roleOrder.every((role, index) => role === boundary.roles[index]) ||
    foundation.serialOnly !== true ||
    foundation.parallelEligibilityComputed !== false ||
    foundation.dispatcherRetreatToSerialComputed !== false ||
    foundation.nonAuthoritative !== true ||
    foundation.durableTouched !== false
  ) {
    throw new InvalidParallelEligibilityInputError('Parallel eligibility requires a valid serial-only foundation');
  }
}

export function assertValidParallelEligibilityResult(
  result: unknown,
  foundation: SerialOnlyFoundationResult
): asserts result is ParallelEligibilityResult {
  if (
    !isRecord(result) ||
    result.eligibilityKind !== 'parallel-eligibility-result' ||
    typeof result.eligible !== 'boolean' ||
    !Array.isArray(result.requestedWorkerRoles) ||
    !result.requestedWorkerRoles.every((role) => isCoreRuntimeRole(role)) ||
    !Array.isArray(result.admittedWorkerRoles) ||
    !result.admittedWorkerRoles.every((role) => isCoreRuntimeRole(role)) ||
    !Array.isArray(result.reasons) ||
    result.nonAuthoritative !== true ||
    result.executesDispatch !== false ||
    result.durableTouched !== false
  ) {
    throw new InvalidParallelEligibilityInputError('Dispatcher retreat-to-serial requires a valid parallel eligibility result');
  }

  if (!result.requestedWorkerRoles.every((role, index) => foundation.roleOrder.includes(role) && result.requestedWorkerRoles.indexOf(role) === index)) {
    throw new InvalidParallelEligibilityInputError('Dispatcher retreat-to-serial requires requested roles admitted by the serial foundation');
  }
}

function isValidOwnershipAssignment(
  assignment: unknown,
  role: CoreRuntimeRole
): assignment is OwnershipAssignment {
  return (
    isRecord(assignment) &&
    assignment.role === role &&
    typeof assignment.activeFeatureId === 'string' &&
    assignment.activeFeatureId.trim().length > 0 &&
    typeof assignment.taskId === 'string' &&
    assignment.taskId.trim().length > 0
  );
}

function isCoreRuntimeRole(value: unknown): value is CoreRuntimeRole {
  return typeof value === 'string' && coreRuntimeRoles.includes(value as CoreRuntimeRole);
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}
