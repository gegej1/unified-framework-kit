import type { CoreRuntimeRole } from './block-c-dispatcher';
import type { RoleScopedRuntimeContext } from './block-c-context';

export type StrictStarTopologyClaim = {
  claimKind: 'strict-star-link';
  fromRole: CoreRuntimeRole;
  toRole: CoreRuntimeRole;
};

export type StrictStarTopologyAssemblyInput = {
  contexts: RoleScopedRuntimeContext[];
  topologyClaims: StrictStarTopologyClaim[];
};

export type OwnershipAssignment = {
  role: CoreRuntimeRole;
  activeFeatureId: string;
  taskId: string;
};

export type OwnershipMap = Partial<Record<CoreRuntimeRole, OwnershipAssignment>>;

export type TopologyBoundaryResult = {
  topologyKind: 'strict-star-topology-boundary';
  hubRole: 'dispatcher';
  roles: CoreRuntimeRole[];
  topologyClaims: StrictStarTopologyClaim[];
  ownershipMap: OwnershipMap;
  directNonDispatcherLinkage: false;
  nonAuthoritative: true;
  durableTouched: false;
};

export type SerialOnlyFoundationResult = {
  serializationKind: 'serial-only-foundation';
  hubRole: 'dispatcher';
  roleOrder: CoreRuntimeRole[];
  serialOnly: true;
  parallelEligibilityComputed: false;
  dispatcherRetreatToSerialComputed: false;
  nonAuthoritative: true;
  durableTouched: false;
};

export class InvalidTopologyInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTopologyInputError';
  }
}
