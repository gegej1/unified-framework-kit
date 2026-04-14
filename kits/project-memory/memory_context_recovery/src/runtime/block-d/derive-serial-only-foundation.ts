import type { SerialOnlyFoundationResult, TopologyBoundaryResult } from '../../contracts/block-d-topology';
import { InvalidTopologyInputError } from '../../contracts/block-d-topology';
import { coreRuntimeRoles } from '../../contracts/block-c-dispatcher';

export function deriveSerialOnlyFoundation(
  boundary: TopologyBoundaryResult
): SerialOnlyFoundationResult {
  assertValidTopologyBoundary(boundary);

  return {
    serializationKind: 'serial-only-foundation',
    hubRole: 'dispatcher',
    roleOrder: [...boundary.roles],
    serialOnly: true,
    parallelEligibilityComputed: false,
    dispatcherRetreatToSerialComputed: false,
    nonAuthoritative: true,
    durableTouched: false
  };
}

function assertValidTopologyBoundary(boundary: unknown): asserts boundary is TopologyBoundaryResult {
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
    boundary.directNonDispatcherLinkage !== false ||
    boundary.nonAuthoritative !== true ||
    boundary.durableTouched !== false
  ) {
    throw new InvalidTopologyInputError('Serial-only foundation requires a valid strict-star topology boundary');
  }
}

function isCoreRuntimeRole(value: unknown): boolean {
  return typeof value === 'string' && coreRuntimeRoles.includes(value as any);
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}
