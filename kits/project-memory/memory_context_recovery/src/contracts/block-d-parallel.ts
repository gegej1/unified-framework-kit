import type { CoreRuntimeRole } from './block-c-dispatcher';
import type { SerialOnlyFoundationResult, TopologyBoundaryResult } from './block-d-topology';

export type ParallelEligibilityReason = 'INSUFFICIENT_PARALLEL_WORKER_SET';

export type ParallelEligibilityInput = {
  topologyBoundary: TopologyBoundaryResult;
  serialFoundation: SerialOnlyFoundationResult;
  requestedWorkerRoles: string[];
};

export type ParallelEligibilityResult = {
  eligibilityKind: 'parallel-eligibility-result';
  eligible: boolean;
  requestedWorkerRoles: CoreRuntimeRole[];
  admittedWorkerRoles: CoreRuntimeRole[];
  reasons: ParallelEligibilityReason[];
  nonAuthoritative: true;
  executesDispatch: false;
  durableTouched: false;
};

export type DispatcherRetreatToSerialInput = {
  serialFoundation: SerialOnlyFoundationResult;
  parallelEligibility: ParallelEligibilityResult;
};

export type DispatcherRetreatToSerialResult = {
  retreatKind: 'dispatcher-retreat-to-serial';
  retreatRequired: boolean;
  requestedWorkerRoles: CoreRuntimeRole[];
  serialRoleOrder: CoreRuntimeRole[];
  derivedFromSerialFoundation: true;
  executesDispatch: false;
  nonAuthoritative: true;
  durableTouched: false;
};

export class InvalidParallelEligibilityInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidParallelEligibilityInputError';
  }
}
