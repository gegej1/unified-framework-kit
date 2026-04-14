import { describe, expect, it } from 'vitest';
import { join, resolve } from 'node:path';

import {
  InvalidRuntimeContextError,
  assembleBoundaryControlledContext,
  assembleRestoreInputBundle,
  assembleRoleScopedSlice,
  assembleUnifiedEnvelope,
  computeRoutingPosture,
  createRequiredReadPlan,
  evaluatePromotionReadiness,
  resolveCanonicalSurfaceLayout
} from '../../src/index';
import { prepareFixtureWorkspace, readText } from '../block-b/test-helpers';

async function prepareApprovedInputs(targetRole: 'dispatcher' | 'implementation' | 'review' | 'verification') {
  const workspace = await prepareFixtureWorkspace('coherent-state');
  const readiness = await evaluatePromotionReadiness(workspace);
  const slice = assembleRoleScopedSlice({
    targetRole,
    promotion: readiness,
    packetMarker: 'I3B-block-c-context-assembly'
  });
  const routing = computeRoutingPosture(targetRole);
  const envelope = assembleUnifiedEnvelope(slice, routing);
  const restoreRoot = resolve('tests/fixtures/block-a/complete');
  const layout = resolveCanonicalSurfaceLayout(restoreRoot);
  const plan = createRequiredReadPlan(layout);
  const restoreInput = await assembleRestoreInputBundle(plan);

  return { workspace, envelope, restoreInput };
}

describe('Block C boundary-controlled context assembly', () => {
  it('assembles deterministic core runtime context from approved upstream artifacts only', async () => {
    const { envelope, restoreInput } = await prepareApprovedInputs('review');

    expect(assembleBoundaryControlledContext({ envelope, restoreInput })).toEqual({
      contextKind: 'boundary-controlled-runtime-context',
      packetMarker: 'I3B-block-c-context-assembly',
      sourceRole: 'dispatcher',
      targetRole: 'review',
      activeFeatureId: 'F-201',
      taskId: 'T-201',
      requiredContext: [
        'durable/procedures',
        'durable/facts',
        'durable/verdicts',
        'durable/evidence',
        'working/current-task',
        'working/restore-gate'
      ],
      requiredSurfaces: {
        'durable/procedures': envelope.slice.packetMarker ? expect.any(Object) : expect.anything(),
        'durable/facts': expect.any(Object),
        'durable/verdicts': expect.any(Object),
        'durable/evidence': expect.any(Object),
        'working/current-task': expect.any(Object),
        'working/restore-gate': expect.any(Object)
      },
      excludedOptionalContext: ['summaries/latest'],
      excludedArtifactClasses: [
        'summary',
        'overlay',
        'closeout',
        'research',
        'design',
        'dynamic-role',
        'teaching-support'
      ],
      nonAuthoritative: true,
      durableTouched: false
    });
  });

  it('rejects malformed or incomplete envelope inputs fail-closed', async () => {
    const { envelope, restoreInput } = await prepareApprovedInputs('implementation');

    expect(() =>
      assembleBoundaryControlledContext({
        envelope: {
          ...envelope,
          nonAuthoritative: false
        } as any,
        restoreInput
      })
    ).toThrowError(InvalidRuntimeContextError);
  });

  it('rejects malformed or incomplete restore bundle inputs fail-closed', async () => {
    const { envelope, restoreInput } = await prepareApprovedInputs('implementation');

    expect(() =>
      assembleBoundaryControlledContext({
        envelope,
        restoreInput: {
          ...restoreInput,
          containsBusinessJudgment: true
        } as any
      })
    ).toThrowError(InvalidRuntimeContextError);
  });

  it('rejects missing required runtime context and does not let optional summary satisfy it', async () => {
    const { envelope, restoreInput } = await prepareApprovedInputs('verification');
    const summaryRead = restoreInput.optionalReads.find((item) => item.kind === 'summaries/latest') ?? null;

    expect(() =>
      assembleBoundaryControlledContext({
        envelope,
        restoreInput: {
          ...restoreInput,
          requiredReads: restoreInput.requiredReads.filter((item) => item.kind !== 'durable/facts'),
          optionalReads: summaryRead ? [...restoreInput.optionalReads, { ...summaryRead, kind: 'summaries/latest' }] : restoreInput.optionalReads
        }
      })
    ).toThrowError(InvalidRuntimeContextError);
  });

  it('rejects unsupported or out-of-scope roles fail-closed', async () => {
    const { envelope, restoreInput } = await prepareApprovedInputs('dispatcher');

    expect(() =>
      assembleBoundaryControlledContext({
        envelope: {
          ...envelope,
          targetRole: 'design'
        } as any,
        restoreInput
      })
    ).toThrowError(InvalidRuntimeContextError);
  });

  it('rejects non-core artifacts attempting to enter the runtime context', async () => {
    const { envelope, restoreInput } = await prepareApprovedInputs('dispatcher');

    expect(() =>
      assembleBoundaryControlledContext({
        envelope,
        restoreInput,
        overlay: { enabled: true }
      } as any)
    ).toThrowError(InvalidRuntimeContextError);
  });

  it('does not touch durable surfaces while assembling context', async () => {
    const { workspace, envelope, restoreInput } = await prepareApprovedInputs('review');
    const verdictPath = join(workspace, 'durable', 'verdicts.md');
    const evidencePath = join(workspace, 'durable', 'evidence.md');
    const beforeVerdict = await readText(verdictPath);
    const beforeEvidence = await readText(evidencePath);

    const context = assembleBoundaryControlledContext({ envelope, restoreInput });

    expect(context.nonAuthoritative).toBe(true);
    expect(await readText(verdictPath)).toBe(beforeVerdict);
    expect(await readText(evidencePath)).toBe(beforeEvidence);
  });
});
