import type { ParallelEligibilityInput, ParallelEligibilityResult } from '../../contracts/block-d-parallel';
import type { CoreRuntimeRole } from '../../contracts/block-c-dispatcher';
import { InvalidParallelEligibilityInputError } from '../../contracts/block-d-parallel';
import { coreRuntimeRoles } from '../../contracts/block-c-dispatcher';
import { assertValidSerialFoundation, assertValidTopologyBoundary } from './validate-parallel-foundations';

const allowedInputKeys = new Set(['topologyBoundary', 'serialFoundation', 'requestedWorkerRoles']);

export function evaluateParallelEligibility(
  input: ParallelEligibilityInput
): ParallelEligibilityResult {
  assertValidParallelEligibilityInput(input);

  const requestedWorkerRoles = input.requestedWorkerRoles as CoreRuntimeRole[];
  const admittedWorkerRoles = requestedWorkerRoles.filter((role) => role !== 'dispatcher');

  return {
    eligibilityKind: 'parallel-eligibility-result',
    eligible: admittedWorkerRoles.length >= 2,
    requestedWorkerRoles,
    admittedWorkerRoles,
    reasons: admittedWorkerRoles.length >= 2 ? [] : ['INSUFFICIENT_PARALLEL_WORKER_SET'],
    nonAuthoritative: true,
    executesDispatch: false,
    durableTouched: false
  };
}

function assertValidParallelEligibilityInput(
  input: ParallelEligibilityInput
): asserts input is ParallelEligibilityInput {
  if (!isRecord(input)) {
    throw new InvalidParallelEligibilityInputError('Parallel eligibility requires approved topology and serialization artifacts');
  }

  const unexpectedKeys = Object.keys(input).filter((key) => !allowedInputKeys.has(key));
  if (unexpectedKeys.length > 0) {
    throw new InvalidParallelEligibilityInputError('Parallel eligibility rejects unexpected runtime-control artifacts');
  }

  assertValidTopologyBoundary(input.topologyBoundary);
  assertValidSerialFoundation(input.serialFoundation, input.topologyBoundary);

  if (!Array.isArray(input.requestedWorkerRoles) || input.requestedWorkerRoles.length === 0) {
    throw new InvalidParallelEligibilityInputError('Parallel eligibility requires at least one requested worker role');
  }

  const seen = new Set<CoreRuntimeRole>();
  for (const role of input.requestedWorkerRoles) {
    if (!coreRuntimeRoles.includes(role as CoreRuntimeRole)) {
      throw new InvalidParallelEligibilityInputError('Parallel eligibility rejects unsupported or out-of-scope worker roles');
    }

    const typedRole = role as CoreRuntimeRole;

    if (typedRole === 'dispatcher') {
      throw new InvalidParallelEligibilityInputError('Dispatcher is not eligible as a parallel worker role');
    }

    if (seen.has(typedRole)) {
      throw new InvalidParallelEligibilityInputError('Parallel eligibility rejects duplicate requested worker roles');
    }
    seen.add(typedRole);

    if (!input.topologyBoundary.roles.includes(typedRole)) {
      throw new InvalidParallelEligibilityInputError('Parallel eligibility requires all requested worker roles to be admitted');
    }

    if (!input.topologyBoundary.ownershipMap[typedRole]) {
      throw new InvalidParallelEligibilityInputError('Parallel eligibility requires ownership coverage for every requested worker role');
    }
  }
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}
