import type { DispatcherRetreatToSerialInput, DispatcherRetreatToSerialResult } from '../../contracts/block-d-parallel';
import { InvalidParallelEligibilityInputError } from '../../contracts/block-d-parallel';
import { assertValidParallelEligibilityResult, assertValidSerialFoundation } from './validate-parallel-foundations';

export function deriveDispatcherRetreatToSerial(
  input: DispatcherRetreatToSerialInput
): DispatcherRetreatToSerialResult {
  if (!isRecord(input)) {
    throw new InvalidParallelEligibilityInputError('Dispatcher retreat-to-serial requires approved serial and eligibility artifacts');
  }

  assertValidSerialFoundation(
    input.serialFoundation,
    {
      topologyKind: 'strict-star-topology-boundary',
      hubRole: 'dispatcher',
      roles: input.serialFoundation.roleOrder,
      topologyClaims: input.serialFoundation.roleOrder.map((role) => ({
        claimKind: 'strict-star-link' as const,
        fromRole: 'dispatcher' as const,
        toRole: role
      })),
      ownershipMap: Object.fromEntries(
        input.serialFoundation.roleOrder.map((role) => [role, { role, activeFeatureId: 'derived', taskId: 'derived' }])
      ),
      directNonDispatcherLinkage: false,
      nonAuthoritative: true,
      durableTouched: false
    }
  );
  assertValidParallelEligibilityResult(input.parallelEligibility, input.serialFoundation);

  return {
    retreatKind: 'dispatcher-retreat-to-serial',
    retreatRequired: !input.parallelEligibility.eligible,
    requestedWorkerRoles: [...input.parallelEligibility.requestedWorkerRoles],
    serialRoleOrder: [...input.serialFoundation.roleOrder],
    derivedFromSerialFoundation: true,
    executesDispatch: false,
    nonAuthoritative: true,
    durableTouched: false
  };
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}
