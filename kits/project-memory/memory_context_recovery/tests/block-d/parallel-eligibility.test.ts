import { describe, expect, it } from 'vitest';
import { join, resolve } from 'node:path';

import {
  InvalidParallelEligibilityInputError,
  assembleBoundaryControlledContext,
  assembleRestoreInputBundle,
  assembleRoleScopedSlice,
  assembleStrictStarTopologyBoundary,
  assembleUnifiedEnvelope,
  computeRoutingPosture,
  createRequiredReadPlan,
  deriveDispatcherRetreatToSerial,
  deriveSerialOnlyFoundation,
  evaluateParallelEligibility,
  evaluatePromotionReadiness,
  resolveCanonicalSurfaceLayout
} from '../../src/index';
import { prepareFixtureWorkspace, readText } from '../block-b/test-helpers';

const allCoreRoles = ['dispatcher', 'implementation', 'review', 'verification'] as const;
type CoreRole = (typeof allCoreRoles)[number];

async function prepareApprovedBlockDArtifacts(roles: readonly CoreRole[]) {
  const workspace = await prepareFixtureWorkspace('coherent-state');
  const readiness = await evaluatePromotionReadiness(workspace);
  const restoreRoot = resolve('tests/fixtures/block-a/complete');
  const restoreInput = await assembleRestoreInputBundle(
    createRequiredReadPlan(resolveCanonicalSurfaceLayout(restoreRoot))
  );

  const contexts = roles.map((targetRole) => {
    const slice = assembleRoleScopedSlice({
      targetRole,
      promotion: readiness,
      packetMarker: 'I4B-block-d-parallel-eligibility-retreat-to-serial'
    });
    const envelope = assembleUnifiedEnvelope(slice, computeRoutingPosture(targetRole));

    return assembleBoundaryControlledContext({ envelope, restoreInput });
  });

  const topologyBoundary = assembleStrictStarTopologyBoundary({
    contexts,
    topologyClaims: roles.map((role) => ({
      claimKind: 'strict-star-link' as const,
      fromRole: 'dispatcher' as const,
      toRole: role
    }))
  });

  const serialFoundation = deriveSerialOnlyFoundation(topologyBoundary);

  return { workspace, topologyBoundary, serialFoundation };
}

describe('Block D parallel eligibility and retreat-to-serial', () => {
  it('evaluates a structurally valid admitted non-dispatcher role set deterministically', async () => {
    const { topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts(allCoreRoles);

    expect(
      evaluateParallelEligibility({
        topologyBoundary,
        serialFoundation,
        requestedWorkerRoles: ['implementation', 'review']
      })
    ).toEqual({
      eligibilityKind: 'parallel-eligibility-result',
      eligible: true,
      requestedWorkerRoles: ['implementation', 'review'],
      admittedWorkerRoles: ['implementation', 'review'],
      reasons: [],
      nonAuthoritative: true,
      executesDispatch: false,
      durableTouched: false
    });
  });

  it('returns an explicit negative result for an insufficient worker set without importing Block E policy', async () => {
    const { topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts(allCoreRoles);

    expect(
      evaluateParallelEligibility({
        topologyBoundary,
        serialFoundation,
        requestedWorkerRoles: ['implementation']
      })
    ).toEqual({
      eligibilityKind: 'parallel-eligibility-result',
      eligible: false,
      requestedWorkerRoles: ['implementation'],
      admittedWorkerRoles: ['implementation'],
      reasons: ['INSUFFICIENT_PARALLEL_WORKER_SET'],
      nonAuthoritative: true,
      executesDispatch: false,
      durableTouched: false
    });
  });

  it('rejects dispatcher as a parallel worker role fail-closed', async () => {
    const { topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts(allCoreRoles);

    expect(() =>
      evaluateParallelEligibility({
        topologyBoundary,
        serialFoundation,
        requestedWorkerRoles: ['dispatcher', 'implementation']
      })
    ).toThrowError(InvalidParallelEligibilityInputError);
  });

  it('rejects duplicate requested roles fail-closed', async () => {
    const { topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts(allCoreRoles);

    expect(() =>
      evaluateParallelEligibility({
        topologyBoundary,
        serialFoundation,
        requestedWorkerRoles: ['review', 'review']
      })
    ).toThrowError(InvalidParallelEligibilityInputError);
  });

  it('rejects unsupported or out-of-scope roles fail-closed', async () => {
    const { topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts(allCoreRoles);

    expect(() =>
      evaluateParallelEligibility({
        topologyBoundary,
        serialFoundation,
        requestedWorkerRoles: ['design']
      } as any)
    ).toThrowError(InvalidParallelEligibilityInputError);
  });

  it('rejects non-admitted roles fail-closed', async () => {
    const { topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts([
      'dispatcher',
      'implementation'
    ]);

    expect(() =>
      evaluateParallelEligibility({
        topologyBoundary,
        serialFoundation,
        requestedWorkerRoles: ['verification']
      })
    ).toThrowError(InvalidParallelEligibilityInputError);
  });

  it('rejects malformed or incomplete topology boundary fail-closed', async () => {
    const { topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts(allCoreRoles);

    expect(() =>
      evaluateParallelEligibility({
        topologyBoundary: {
          ...topologyBoundary,
          ownershipMap: {
            ...topologyBoundary.ownershipMap,
            review: undefined
          }
        } as any,
        serialFoundation,
        requestedWorkerRoles: ['implementation', 'review']
      })
    ).toThrowError(InvalidParallelEligibilityInputError);
  });

  it('rejects malformed or incomplete serial foundation fail-closed', async () => {
    const { topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts(allCoreRoles);

    expect(() =>
      evaluateParallelEligibility({
        topologyBoundary,
        serialFoundation: {
          ...serialFoundation,
          roleOrder: ['dispatcher', 'implementation']
        } as any,
        requestedWorkerRoles: ['implementation', 'review']
      })
    ).toThrowError(InvalidParallelEligibilityInputError);
  });

  it('derives deterministic dispatcher retreat-to-serial from the approved serial foundation without executing dispatch', async () => {
    const { topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts(allCoreRoles);
    const eligibility = evaluateParallelEligibility({
      topologyBoundary,
      serialFoundation,
      requestedWorkerRoles: ['implementation']
    });

    expect(deriveDispatcherRetreatToSerial({ serialFoundation, parallelEligibility: eligibility })).toEqual({
      retreatKind: 'dispatcher-retreat-to-serial',
      retreatRequired: true,
      requestedWorkerRoles: ['implementation'],
      serialRoleOrder: ['dispatcher', 'implementation', 'review', 'verification'],
      derivedFromSerialFoundation: true,
      executesDispatch: false,
      nonAuthoritative: true,
      durableTouched: false
    });
  });

  it('does not touch durable surfaces while evaluating eligibility or deriving retreat-to-serial', async () => {
    const { workspace, topologyBoundary, serialFoundation } = await prepareApprovedBlockDArtifacts(allCoreRoles);
    const verdictPath = join(workspace, 'durable', 'verdicts.md');
    const evidencePath = join(workspace, 'durable', 'evidence.md');
    const beforeVerdict = await readText(verdictPath);
    const beforeEvidence = await readText(evidencePath);

    const eligibility = evaluateParallelEligibility({
      topologyBoundary,
      serialFoundation,
      requestedWorkerRoles: ['implementation', 'review']
    });
    const retreat = deriveDispatcherRetreatToSerial({
      serialFoundation,
      parallelEligibility: eligibility
    });

    expect(eligibility.executesDispatch).toBe(false);
    expect(retreat.executesDispatch).toBe(false);
    expect(await readText(verdictPath)).toBe(beforeVerdict);
    expect(await readText(evidencePath)).toBe(beforeEvidence);
  });
});
