import { describe, expect, it } from 'vitest';
import { join, resolve } from 'node:path';

import {
  InvalidFreshnessInputError,
  InvalidReviewerInputError,
  assembleBoundaryControlledContext,
  assembleRestoreInputBundle,
  assembleReviewerIndependentPackage,
  assembleRoleScopedSlice,
  assembleUnifiedEnvelope,
  computeRoutingPosture,
  createRequiredReadPlan,
  deriveReackRequirement,
  evaluatePromotionReadiness,
  evaluateStaleSlice,
  resolveCanonicalSurfaceLayout
} from '../../src/index';
import { prepareFixtureWorkspace, readText } from '../block-b/test-helpers';

async function prepareApprovedContext(targetRole: 'dispatcher' | 'implementation' | 'review' | 'verification') {
  const workspace = await prepareFixtureWorkspace('coherent-state');
  const readiness = await evaluatePromotionReadiness(workspace);
  const restoreRoot = resolve('tests/fixtures/block-a/complete');
  const restoreInput = await assembleRestoreInputBundle(
    createRequiredReadPlan(resolveCanonicalSurfaceLayout(restoreRoot))
  );
  const slice = assembleRoleScopedSlice({
    targetRole,
    promotion: readiness,
    packetMarker: 'I5A-block-e-stale-slice-and-reviewer-independence-foundation'
  });
  const envelope = assembleUnifiedEnvelope(slice, computeRoutingPosture(targetRole));

  return {
    workspace,
    context: assembleBoundaryControlledContext({ envelope, restoreInput })
  };
}

describe('Block E stale slice / re-ack foundation', () => {
  it('evaluates freshness deterministically and keeps a current approved slice/context fresh without re-ack', async () => {
    const { context } = await prepareApprovedContext('review');
    const stale = evaluateStaleSlice({ admittedContext: context, currentContext: context });
    const reack = deriveReackRequirement(stale);

    expect(stale).toEqual({
      freshnessKind: 'stale-slice-evaluation',
      stale: false,
      reasons: [],
      nonAuthoritative: true,
      durableTouched: false
    });

    expect(reack).toEqual({
      reackKind: 'reack-requirement',
      required: false,
      reasons: [],
      nonAuthoritative: true,
      durableTouched: false
    });
  });

  it('treats mismatched packet marker as stale and requires re-ack fail-closed', async () => {
    const { context } = await prepareApprovedContext('review');
    const stale = evaluateStaleSlice({
      admittedContext: {
        ...context,
        packetMarker: 'I3B-block-c-context-assembly'
      },
      currentContext: context
    });

    expect(stale).toEqual({
      freshnessKind: 'stale-slice-evaluation',
      stale: true,
      reasons: ['PACKET_MARKER_MISMATCH'],
      nonAuthoritative: true,
      durableTouched: false
    });

    expect(deriveReackRequirement(stale)).toEqual({
      reackKind: 'reack-requirement',
      required: true,
      reasons: ['PACKET_MARKER_MISMATCH'],
      nonAuthoritative: true,
      durableTouched: false
    });
  });

  it('treats mismatched feature/task binding as stale and requires re-ack fail-closed', async () => {
    const { context } = await prepareApprovedContext('review');

    const stale = evaluateStaleSlice({
      admittedContext: {
        ...context,
        taskId: 'T-999'
      },
      currentContext: context
    });

    expect(stale).toEqual({
      freshnessKind: 'stale-slice-evaluation',
      stale: true,
      reasons: ['FEATURE_TASK_BINDING_MISMATCH'],
      nonAuthoritative: true,
      durableTouched: false
    });

    expect(deriveReackRequirement(stale)).toEqual({
      reackKind: 'reack-requirement',
      required: true,
      reasons: ['FEATURE_TASK_BINDING_MISMATCH'],
      nonAuthoritative: true,
      durableTouched: false
    });
  });

  it('rejects malformed or incomplete freshness inputs fail-closed', async () => {
    const { context } = await prepareApprovedContext('review');

    expect(() =>
      evaluateStaleSlice({
        admittedContext: {
          ...context,
          packetMarker: ''
        } as any,
        currentContext: context
      })
    ).toThrowError(InvalidFreshnessInputError);
  });
});

describe('Block E reviewer independence foundation', () => {
  it('assembles a deterministic clean reviewer-independent input package positively', async () => {
    const { context } = await prepareApprovedContext('review');
    const stale = evaluateStaleSlice({ admittedContext: context, currentContext: context });
    const reack = deriveReackRequirement(stale);

    expect(
      assembleReviewerIndependentPackage({
        reviewerContext: context,
        freshness: stale,
        reackRequirement: reack
      })
    ).toEqual({
      packageKind: 'reviewer-independent-input-package',
      reviewerRole: 'review',
      packetMarker: 'I5A-block-e-stale-slice-and-reviewer-independence-foundation',
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
      excludedInputs: [
        'implementation-intent',
        'dispatcher-framing',
        'stale-slice',
        'summary-narrative',
        'overlay-artifacts',
        'closeout-artifacts'
      ],
      verifierBoundaryImplemented: false,
      nonAuthoritative: true,
      executesReview: false,
      durableTouched: false
    });
  });

  it('rejects implementation intent contamination', async () => {
    const { context } = await prepareApprovedContext('review');
    const stale = evaluateStaleSlice({ admittedContext: context, currentContext: context });
    const reack = deriveReackRequirement(stale);

    expect(() =>
      assembleReviewerIndependentPackage({
        reviewerContext: context,
        freshness: stale,
        reackRequirement: reack,
        implementationIntent: 'please approve quickly'
      })
    ).toThrowError(InvalidReviewerInputError);
  });

  it('rejects dispatcher framing contamination', async () => {
    const { context } = await prepareApprovedContext('review');
    const stale = evaluateStaleSlice({ admittedContext: context, currentContext: context });
    const reack = deriveReackRequirement(stale);

    expect(() =>
      assembleReviewerIndependentPackage({
        reviewerContext: context,
        freshness: stale,
        reackRequirement: reack,
        dispatcherFraming: 'dispatcher says this is safe'
      })
    ).toThrowError(InvalidReviewerInputError);
  });

  it('rejects stale slice contamination', async () => {
    const { context } = await prepareApprovedContext('review');
    const stale = evaluateStaleSlice({
      admittedContext: {
        ...context,
        packetMarker: 'stale-packet'
      },
      currentContext: context
    });
    const reack = deriveReackRequirement(stale);

    expect(() =>
      assembleReviewerIndependentPackage({
        reviewerContext: context,
        freshness: stale,
        reackRequirement: reack
      })
    ).toThrowError(InvalidReviewerInputError);
  });

  it('rejects summary / overlay / closeout contamination', async () => {
    const { context } = await prepareApprovedContext('review');
    const stale = evaluateStaleSlice({ admittedContext: context, currentContext: context });
    const reack = deriveReackRequirement(stale);

    expect(() =>
      assembleReviewerIndependentPackage({
        reviewerContext: context,
        freshness: stale,
        reackRequirement: reack,
        summaryNarrative: 'summary says all good'
      })
    ).toThrowError(InvalidReviewerInputError);

    expect(() =>
      assembleReviewerIndependentPackage({
        reviewerContext: context,
        freshness: stale,
        reackRequirement: reack,
        overlayArtifacts: ['overlay']
      })
    ).toThrowError(InvalidReviewerInputError);

    expect(() =>
      assembleReviewerIndependentPackage({
        reviewerContext: context,
        freshness: stale,
        reackRequirement: reack,
        closeoutArtifacts: ['closeout']
      })
    ).toThrowError(InvalidReviewerInputError);
  });

  it('rejects unsupported or out-of-scope roles fail-closed and does not implement verifier boundary yet', async () => {
    const { context } = await prepareApprovedContext('verification');
    const stale = evaluateStaleSlice({ admittedContext: context, currentContext: context });
    const reack = deriveReackRequirement(stale);

    expect(() =>
      assembleReviewerIndependentPackage({
        reviewerContext: context,
        freshness: stale,
        reackRequirement: reack
      })
    ).toThrowError(InvalidReviewerInputError);
  });

  it('does not touch durable surfaces while evaluating freshness or assembling reviewer-independent input', async () => {
    const { workspace, context } = await prepareApprovedContext('review');
    const verdictPath = join(workspace, 'durable', 'verdicts.md');
    const evidencePath = join(workspace, 'durable', 'evidence.md');
    const beforeVerdict = await readText(verdictPath);
    const beforeEvidence = await readText(evidencePath);

    const stale = evaluateStaleSlice({ admittedContext: context, currentContext: context });
    const reack = deriveReackRequirement(stale);
    const reviewerPackage = assembleReviewerIndependentPackage({
      reviewerContext: context,
      freshness: stale,
      reackRequirement: reack
    });

    expect(reviewerPackage.verifierBoundaryImplemented).toBe(false);
    expect(await readText(verdictPath)).toBe(beforeVerdict);
    expect(await readText(evidencePath)).toBe(beforeEvidence);
  });
});
