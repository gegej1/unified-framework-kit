import { describe, expect, it } from 'vitest';
import { join, resolve } from 'node:path';

import {
  InvalidVerifierInputError,
  assembleBoundaryControlledContext,
  assembleRestoreInputBundle,
  assembleRoleScopedSlice,
  assembleUnifiedEnvelope,
  assembleVerifierBoundaryPackage,
  computeRoutingPosture,
  createRequiredReadPlan,
  deriveReackRequirement,
  evaluatePromotionReadiness,
  evaluateStaleSlice,
  resolveCanonicalSurfaceLayout
} from '../../src/index';
import { prepareFixtureWorkspace, readText } from '../block-b/test-helpers';

async function prepareApprovedVerifierInputs(targetRole: 'review' | 'verification') {
  const workspace = await prepareFixtureWorkspace('coherent-state');
  const readiness = await evaluatePromotionReadiness(workspace);
  const restoreRoot = resolve('tests/fixtures/block-a/complete');
  const restoreInput = await assembleRestoreInputBundle(
    createRequiredReadPlan(resolveCanonicalSurfaceLayout(restoreRoot))
  );
  const slice = assembleRoleScopedSlice({
    targetRole,
    promotion: readiness,
    packetMarker: 'I5B-block-e-verifier-boundary-foundation'
  });
  const envelope = assembleUnifiedEnvelope(slice, computeRoutingPosture(targetRole));
  const context = assembleBoundaryControlledContext({ envelope, restoreInput });
  const freshness = evaluateStaleSlice({ admittedContext: context, currentContext: context });
  const reackRequirement = deriveReackRequirement(freshness);

  return { workspace, context, freshness, reackRequirement };
}

describe('Block E verifier boundary foundation', () => {
  it('assembles a deterministic clean verifier-boundary package positively', async () => {
    const { context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('verification');

    expect(
      assembleVerifierBoundaryPackage({
        verifierContext: context,
        freshness,
        reackRequirement
      })
    ).toEqual({
      packageKind: 'verifier-boundary-package',
      verifierRole: 'verification',
      packetMarker: 'I5B-block-e-verifier-boundary-foundation',
      activeFeatureId: 'F-201',
      taskId: 'T-201',
      allowedSurfaceKinds: [
        'durable/procedures',
        'durable/facts',
        'durable/verdicts',
        'durable/evidence',
        'working/current-task',
        'working/restore-gate'
      ],
      excludedDriftClasses: [
        'implementation',
        'redesign',
        'review-authorship',
        'truth-definition',
        'summary',
        'overlay',
        'closeout'
      ],
      reviewerIndependenceMerged: false,
      closeoutBoundaryImplemented: false,
      nonAuthoritative: true,
      executesVerification: false,
      durableTouched: false
    });
  });

  it('rejects malformed or incomplete verifier inputs fail-closed', async () => {
    const { context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('verification');

    expect(() =>
      assembleVerifierBoundaryPackage({
        verifierContext: {
          ...context,
          packetMarker: ''
        } as any,
        freshness,
        reackRequirement
      })
    ).toThrowError(InvalidVerifierInputError);
  });

  it('rejects implementation contamination', async () => {
    const { context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('verification');

    expect(() =>
      assembleVerifierBoundaryPackage({
        verifierContext: context,
        freshness,
        reackRequirement,
        implementationContamination: 'verifier should implement the fix'
      })
    ).toThrowError(InvalidVerifierInputError);
  });

  it('rejects redesign contamination', async () => {
    const { context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('verification');

    expect(() =>
      assembleVerifierBoundaryPackage({
        verifierContext: context,
        freshness,
        reackRequirement,
        redesignContamination: 'verifier should redesign the API'
      })
    ).toThrowError(InvalidVerifierInputError);
  });

  it('rejects review authorship contamination', async () => {
    const { context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('verification');

    expect(() =>
      assembleVerifierBoundaryPackage({
        verifierContext: context,
        freshness,
        reackRequirement,
        reviewAuthorshipContamination: 'verifier should rewrite the review rationale'
      })
    ).toThrowError(InvalidVerifierInputError);
  });

  it('rejects truth-definition contamination', async () => {
    const { context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('verification');

    expect(() =>
      assembleVerifierBoundaryPackage({
        verifierContext: context,
        freshness,
        reackRequirement,
        truthDefinitionContamination: 'verifier should redefine durable truth'
      })
    ).toThrowError(InvalidVerifierInputError);
  });

  it('rejects summary / overlay / closeout contamination', async () => {
    const { context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('verification');

    expect(() =>
      assembleVerifierBoundaryPackage({
        verifierContext: context,
        freshness,
        reackRequirement,
        summaryNarrative: 'summary says pass'
      })
    ).toThrowError(InvalidVerifierInputError);

    expect(() =>
      assembleVerifierBoundaryPackage({
        verifierContext: context,
        freshness,
        reackRequirement,
        overlayArtifacts: ['overlay']
      })
    ).toThrowError(InvalidVerifierInputError);

    expect(() =>
      assembleVerifierBoundaryPackage({
        verifierContext: context,
        freshness,
        reackRequirement,
        closeoutArtifacts: ['closeout']
      })
    ).toThrowError(InvalidVerifierInputError);
  });

  it('rejects unsupported or out-of-scope roles fail-closed', async () => {
    const { context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('review');

    expect(() =>
      assembleVerifierBoundaryPackage({
        verifierContext: context,
        freshness,
        reackRequirement
      })
    ).toThrowError(InvalidVerifierInputError);
  });

  it('keeps verifier boundary distinct from reviewer independence and does not implement closeout non-authority', async () => {
    const { context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('verification');
    const pkg = assembleVerifierBoundaryPackage({
      verifierContext: context,
      freshness,
      reackRequirement
    });

    expect(pkg.reviewerIndependenceMerged).toBe(false);
    expect(pkg.closeoutBoundaryImplemented).toBe(false);
    expect(pkg.executesVerification).toBe(false);
  });

  it('does not touch durable surfaces while assembling verifier-boundary package', async () => {
    const { workspace, context, freshness, reackRequirement } = await prepareApprovedVerifierInputs('verification');
    const verdictPath = join(workspace, 'durable', 'verdicts.md');
    const evidencePath = join(workspace, 'durable', 'evidence.md');
    const beforeVerdict = await readText(verdictPath);
    const beforeEvidence = await readText(evidencePath);

    const pkg = assembleVerifierBoundaryPackage({
      verifierContext: context,
      freshness,
      reackRequirement
    });

    expect(pkg.durableTouched).toBe(false);
    expect(await readText(verdictPath)).toBe(beforeVerdict);
    expect(await readText(evidencePath)).toBe(beforeEvidence);
  });
});
