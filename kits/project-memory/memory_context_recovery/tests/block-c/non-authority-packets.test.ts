import { describe, expect, it } from 'vitest';
import { join } from 'node:path';

import {
  InvalidPackagingInputError,
  assembleRoleScopedSlice,
  assembleUnifiedEnvelope,
  computeRoutingPosture,
  createHandoffPackage,
  createResultCollectionPacket,
  evaluatePromotionReadiness
} from '../../src/index';
import { prepareFixtureWorkspace, readText } from '../block-b/test-helpers';

describe('Block C non-authoritative packets', () => {
  it('creates an explicitly non-authoritative result collection packet', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const readiness = await evaluatePromotionReadiness(workspace);
    const slice = assembleRoleScopedSlice({
      targetRole: 'implementation',
      promotion: readiness,
      packetMarker: 'I3A-block-c-dispatcher-packaging'
    });
    const packet = createResultCollectionPacket(slice);

    expect(packet).toEqual({
      packetKind: 'non-authoritative-result-collection',
      sourceRole: 'dispatcher',
      targetRole: 'implementation',
      activeFeatureId: 'F-201',
      taskId: 'T-201',
      nonAuthoritative: true,
      acceptance: false,
      verificationPass: false,
      durableTruthPromotion: false
    });
  });

  it('creates an explicitly non-authoritative handoff package', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const readiness = await evaluatePromotionReadiness(workspace);
    const slice = assembleRoleScopedSlice({
      targetRole: 'verification',
      promotion: readiness,
      packetMarker: 'I3A-block-c-dispatcher-packaging'
    });
    const routing = computeRoutingPosture('verification');
    const envelope = assembleUnifiedEnvelope(slice, routing);
    const resultCollection = createResultCollectionPacket(slice);
    const handoff = createHandoffPackage(envelope, resultCollection);

    expect(handoff).toEqual({
      packetKind: 'non-authoritative-handoff-package',
      envelope,
      resultCollection,
      nonAuthoritative: true,
      acceptance: false,
      verificationPass: false,
      durableTruthPromotion: false
    });
  });



  it('rejects malformed or incomplete slice inputs when creating a result collection packet', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const readiness = await evaluatePromotionReadiness(workspace);
    const validSlice = assembleRoleScopedSlice({
      targetRole: 'implementation',
      promotion: readiness,
      packetMarker: 'I3A-block-c-dispatcher-packaging'
    });

    expect(() =>
      createResultCollectionPacket({
        ...validSlice,
        packetKind: 'bad-slice-kind'
      } as any)
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      createResultCollectionPacket((({ packetMarker, ...rest }) => rest)(validSlice) as any)
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      createResultCollectionPacket({
        ...validSlice,
        packetMarker: ''
      } as any)
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      createResultCollectionPacket({
        ...validSlice,
        taskId: ''
      } as any)
    ).toThrowError(InvalidPackagingInputError);
  });

  it('rejects malformed or incomplete envelope or result collection inputs when creating a handoff package', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const readiness = await evaluatePromotionReadiness(workspace);
    const slice = assembleRoleScopedSlice({
      targetRole: 'verification',
      promotion: readiness,
      packetMarker: 'I3A-block-c-dispatcher-packaging'
    });
    const routing = computeRoutingPosture('verification');
    const envelope = assembleUnifiedEnvelope(slice, routing);
    const resultCollection = createResultCollectionPacket(slice);

    expect(() =>
      createHandoffPackage(
        {
          ...envelope,
          envelopeKind: 'bad-envelope-kind'
        } as any,
        resultCollection
      )
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      createHandoffPackage(
        {
          ...envelope,
          nonAuthoritative: false
        } as any,
        resultCollection
      )
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      createHandoffPackage(
        envelope,
        {
          ...resultCollection,
          packetKind: 'bad-result-kind'
        } as any
      )
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      createHandoffPackage(
        envelope,
        {
          ...resultCollection,
          taskId: ''
        } as any
      )
    ).toThrowError(InvalidPackagingInputError);
  });

  it('does not touch durable surfaces while packaging', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const verdictPath = join(workspace, 'durable', 'verdicts.md');
    const evidencePath = join(workspace, 'durable', 'evidence.md');
    const beforeVerdict = await readText(verdictPath);
    const beforeEvidence = await readText(evidencePath);

    const readiness = await evaluatePromotionReadiness(workspace);
    const slice = assembleRoleScopedSlice({
      targetRole: 'dispatcher',
      promotion: readiness,
      packetMarker: 'I3A-block-c-dispatcher-packaging'
    });
    const routing = computeRoutingPosture('dispatcher');
    const envelope = assembleUnifiedEnvelope(slice, routing);
    createResultCollectionPacket(slice);
    createHandoffPackage(envelope, createResultCollectionPacket(slice));

    expect(await readText(verdictPath)).toBe(beforeVerdict);
    expect(await readText(evidencePath)).toBe(beforeEvidence);
  });
});
