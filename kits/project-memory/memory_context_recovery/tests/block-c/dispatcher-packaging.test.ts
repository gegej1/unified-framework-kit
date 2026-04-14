import { describe, expect, it } from 'vitest';

import {
  InvalidPackagingInputError,
  UnsupportedRoleError,
  assembleRoleScopedSlice,
  assembleUnifiedEnvelope,
  computeRoutingPosture,
  evaluatePromotionReadiness,
  getCoreRuntimeRoles
} from '../../src/index';
import { prepareFixtureWorkspace } from '../block-b/test-helpers';

describe('Block C dispatcher packaging posture', () => {
  it('accepts exactly the allowed core runtime role set for this packet', async () => {
    expect(getCoreRuntimeRoles()).toEqual([
      'dispatcher',
      'implementation',
      'review',
      'verification'
    ]);

    const workspace = await prepareFixtureWorkspace('coherent-state');
    const readiness = await evaluatePromotionReadiness(workspace);

    for (const targetRole of getCoreRuntimeRoles()) {
      const slice = assembleRoleScopedSlice({
        targetRole,
        promotion: readiness,
        packetMarker: 'I3A-block-c-dispatcher-packaging'
      });

      expect(slice).toMatchObject({
        targetRole,
        sourceRole: 'dispatcher',
        nonAuthoritative: true,
        durableTouched: false
      });
    }
  });

  it('fails closed for unsupported or out-of-scope roles', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const readiness = await evaluatePromotionReadiness(workspace);

    expect(() =>
      assembleRoleScopedSlice({
        targetRole: 'design',
        promotion: readiness,
        packetMarker: 'I3A-block-c-dispatcher-packaging'
      })
    ).toThrowError(UnsupportedRoleError);
  });

  it('fails closed for blocked promotion inputs', async () => {
    const workspace = await prepareFixtureWorkspace('missing-feature-state');
    const readiness = await evaluatePromotionReadiness(workspace);

    expect(() =>
      assembleRoleScopedSlice({
        targetRole: 'implementation',
        promotion: readiness,
        packetMarker: 'I3A-block-c-dispatcher-packaging'
      })
    ).toThrowError(InvalidPackagingInputError);
  });

  it('assembles role-scoped slice and unified envelope deterministically', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const readiness = await evaluatePromotionReadiness(workspace);

    const slice = assembleRoleScopedSlice({
      targetRole: 'review',
      promotion: readiness,
      packetMarker: 'I3A-block-c-dispatcher-packaging'
    });
    const routing = computeRoutingPosture('review');
    const envelope = assembleUnifiedEnvelope(slice, routing);

    expect(slice).toEqual({
      packetKind: 'role-scoped-slice',
      packetMarker: 'I3A-block-c-dispatcher-packaging',
      sourceRole: 'dispatcher',
      targetRole: 'review',
      activeFeatureId: 'F-201',
      taskId: 'T-201',
      nonAuthoritative: true,
      durableTouched: false
    });

    expect(envelope).toEqual({
      envelopeKind: 'unified-dispatch-envelope',
      sourceRole: 'dispatcher',
      targetRole: 'review',
      slice,
      routing,
      nonAuthoritative: true,
      acceptance: false,
      verificationPass: false,
      durableTruthPromotion: false
    });
  });



  it('rejects malformed or incomplete slice inputs when building an envelope', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const readiness = await evaluatePromotionReadiness(workspace);
    const validSlice = assembleRoleScopedSlice({
      targetRole: 'review',
      promotion: readiness,
      packetMarker: 'I3A-block-c-dispatcher-packaging'
    });
    const validRouting = computeRoutingPosture('review');

    expect(() =>
      assembleUnifiedEnvelope(
        {
          ...validSlice,
          packetKind: 'bad-slice-kind'
        } as any,
        validRouting
      )
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      assembleUnifiedEnvelope(
        (({ packetMarker, ...rest }) => rest)(validSlice) as any,
        validRouting
      )
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      assembleUnifiedEnvelope(
        {
          ...validSlice,
          packetMarker: '   '
        } as any,
        validRouting
      )
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      assembleUnifiedEnvelope(
        {
          ...validSlice,
          activeFeatureId: ''
        } as any,
        validRouting
      )
    ).toThrowError(InvalidPackagingInputError);
  });

  it('rejects malformed or incomplete routing inputs when building an envelope', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const readiness = await evaluatePromotionReadiness(workspace);
    const validSlice = assembleRoleScopedSlice({
      targetRole: 'review',
      promotion: readiness,
      packetMarker: 'I3A-block-c-dispatcher-packaging'
    });

    expect(() =>
      assembleUnifiedEnvelope(
        validSlice,
        {
          routingKind: 'wrong-routing-kind',
          sourceRole: 'dispatcher',
          targetRole: 'review',
          dispatchOnly: true,
          executesWork: false,
          durableTouched: false
        } as any
      )
    ).toThrowError(InvalidPackagingInputError);

    expect(() =>
      assembleUnifiedEnvelope(
        validSlice,
        {
          routingKind: 'dispatcher-routing-posture',
          sourceRole: 'dispatcher',
          targetRole: 'review',
          dispatchOnly: false,
          executesWork: false,
          durableTouched: false
        } as any
      )
    ).toThrowError(InvalidPackagingInputError);
  });

  it('computes deterministic dispatcher-only routing posture', () => {
    expect(computeRoutingPosture('verification')).toEqual({
      routingKind: 'dispatcher-routing-posture',
      sourceRole: 'dispatcher',
      targetRole: 'verification',
      dispatchOnly: true,
      executesWork: false,
      durableTouched: false
    });
  });
});
