import { describe, expect, it } from 'vitest';
import { join, resolve } from 'node:path';

import {
  InvalidTopologyInputError,
  assembleBoundaryControlledContext,
  assembleRestoreInputBundle,
  assembleRoleScopedSlice,
  assembleStrictStarTopologyBoundary,
  assembleUnifiedEnvelope,
  computeRoutingPosture,
  createRequiredReadPlan,
  deriveSerialOnlyFoundation,
  evaluatePromotionReadiness,
  resolveCanonicalSurfaceLayout
} from '../../src/index';
import { prepareFixtureWorkspace, readText } from '../block-b/test-helpers';

const allCoreRoles = ['dispatcher', 'implementation', 'review', 'verification'] as const;

type CoreRole = (typeof allCoreRoles)[number];

async function prepareApprovedContexts(roles: readonly CoreRole[]) {
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
      packetMarker: 'I4A-block-d-topology-serialization-foundation'
    });
    const envelope = assembleUnifiedEnvelope(slice, computeRoutingPosture(targetRole));

    return assembleBoundaryControlledContext({ envelope, restoreInput });
  });

  return { workspace, contexts };
}

function createStrictStarClaims(roles: readonly CoreRole[]) {
  return roles.map((targetRole) => ({
    claimKind: 'strict-star-link' as const,
    fromRole: 'dispatcher' as const,
    toRole: targetRole
  }));
}

describe('Block D topology / ownership / serialization foundation', () => {
  it('assembles a deterministic strict-star topology boundary with dispatcher as the sole hub', async () => {
    const { contexts } = await prepareApprovedContexts(allCoreRoles);
    const boundary = assembleStrictStarTopologyBoundary({
      contexts,
      topologyClaims: createStrictStarClaims(allCoreRoles)
    });

    expect(boundary).toEqual({
      topologyKind: 'strict-star-topology-boundary',
      hubRole: 'dispatcher',
      roles: ['dispatcher', 'implementation', 'review', 'verification'],
      topologyClaims: [
        { claimKind: 'strict-star-link', fromRole: 'dispatcher', toRole: 'dispatcher' },
        { claimKind: 'strict-star-link', fromRole: 'dispatcher', toRole: 'implementation' },
        { claimKind: 'strict-star-link', fromRole: 'dispatcher', toRole: 'review' },
        { claimKind: 'strict-star-link', fromRole: 'dispatcher', toRole: 'verification' }
      ],
      ownershipMap: {
        dispatcher: { role: 'dispatcher', activeFeatureId: 'F-201', taskId: 'T-201' },
        implementation: { role: 'implementation', activeFeatureId: 'F-201', taskId: 'T-201' },
        review: { role: 'review', activeFeatureId: 'F-201', taskId: 'T-201' },
        verification: { role: 'verification', activeFeatureId: 'F-201', taskId: 'T-201' }
      },
      directNonDispatcherLinkage: false,
      nonAuthoritative: true,
      durableTouched: false
    });
  });

  it('rejects direct non-dispatcher linkage fail-closed', async () => {
    const { contexts } = await prepareApprovedContexts(['implementation', 'review']);

    expect(() =>
      assembleStrictStarTopologyBoundary({
        contexts,
        topologyClaims: [
          { claimKind: 'strict-star-link', fromRole: 'dispatcher', toRole: 'implementation' },
          { claimKind: 'strict-star-link', fromRole: 'implementation', toRole: 'review' }
        ] as any
      })
    ).toThrowError(InvalidTopologyInputError);
  });

  it('rejects duplicate or conflicting ownership claims fail-closed', async () => {
    const { contexts } = await prepareApprovedContexts(['implementation', 'review']);

    expect(() =>
      assembleStrictStarTopologyBoundary({
        contexts: [
          ...contexts,
          {
            ...contexts[0],
            taskId: 'T-999'
          }
        ] as any,
        topologyClaims: createStrictStarClaims(['implementation', 'review'])
      })
    ).toThrowError(InvalidTopologyInputError);
  });

  it('rejects malformed or incomplete topology inputs fail-closed', async () => {
    const { contexts } = await prepareApprovedContexts(['dispatcher']);

    expect(() =>
      assembleStrictStarTopologyBoundary({
        contexts: [
          {
            ...contexts[0],
            requiredContext: []
          }
        ] as any,
        topologyClaims: createStrictStarClaims(['dispatcher'])
      })
    ).toThrowError(InvalidTopologyInputError);

    expect(() =>
      assembleStrictStarTopologyBoundary({
        contexts,
        topologyClaims: [
          {
            claimKind: 'strict-star-link',
            fromRole: 'dispatcher'
          }
        ] as any
      })
    ).toThrowError(InvalidTopologyInputError);
  });

  it('rejects unsupported or out-of-scope roles fail-closed', async () => {
    const { contexts } = await prepareApprovedContexts(['dispatcher']);

    expect(() =>
      assembleStrictStarTopologyBoundary({
        contexts: [
          {
            ...contexts[0],
            targetRole: 'design'
          }
        ] as any,
        topologyClaims: [{ claimKind: 'strict-star-link', fromRole: 'dispatcher', toRole: 'design' }] as any
      })
    ).toThrowError(InvalidTopologyInputError);
  });

  it('derives a deterministic serial-only foundation without computing parallel eligibility or retreat-to-serial', async () => {
    const { contexts } = await prepareApprovedContexts(allCoreRoles);
    const boundary = assembleStrictStarTopologyBoundary({
      contexts,
      topologyClaims: createStrictStarClaims(allCoreRoles)
    });

    expect(deriveSerialOnlyFoundation(boundary)).toEqual({
      serializationKind: 'serial-only-foundation',
      hubRole: 'dispatcher',
      roleOrder: ['dispatcher', 'implementation', 'review', 'verification'],
      serialOnly: true,
      parallelEligibilityComputed: false,
      dispatcherRetreatToSerialComputed: false,
      nonAuthoritative: true,
      durableTouched: false
    });
  });

  it('does not touch durable surfaces while assembling topology and serialization foundation', async () => {
    const { workspace, contexts } = await prepareApprovedContexts(allCoreRoles);
    const verdictPath = join(workspace, 'durable', 'verdicts.md');
    const evidencePath = join(workspace, 'durable', 'evidence.md');
    const beforeVerdict = await readText(verdictPath);
    const beforeEvidence = await readText(evidencePath);

    const boundary = assembleStrictStarTopologyBoundary({
      contexts,
      topologyClaims: createStrictStarClaims(allCoreRoles)
    });
    const foundation = deriveSerialOnlyFoundation(boundary);

    expect(boundary.durableTouched).toBe(false);
    expect(foundation.durableTouched).toBe(false);
    expect(await readText(verdictPath)).toBe(beforeVerdict);
    expect(await readText(evidencePath)).toBe(beforeEvidence);
  });
});
