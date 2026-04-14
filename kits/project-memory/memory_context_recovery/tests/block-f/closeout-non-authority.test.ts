import { describe, expect, it } from 'vitest';
import { join } from 'node:path';

import {
  InvalidCloseoutBoundaryInputError,
  assembleCloseoutNonAuthorityFirewall,
  assembleRoleScopedSlice,
  assembleUnifiedEnvelope,
  computeRoutingPosture,
  createHandoffPackage,
  createResultCollectionPacket,
  evaluatePromotionReadiness
} from '../../src/index';
import type { ClosureArtifactDescriptor } from '../../src/index';
import { prepareFixtureWorkspace, readText } from '../block-b/test-helpers';

async function prepareApprovedClosureArtifacts() {
  const workspace = await prepareFixtureWorkspace('coherent-state');
  const readiness = await evaluatePromotionReadiness(workspace);
  const slice = assembleRoleScopedSlice({
    targetRole: 'verification',
    promotion: readiness,
    packetMarker: 'I6A-block-f-closeout-non-authority-foundation'
  });
  const envelope = assembleUnifiedEnvelope(slice, computeRoutingPosture('verification'));
  const resultCollection = createResultCollectionPacket(slice);
  const handoffPackage = createHandoffPackage(envelope, resultCollection);

  const descriptors: ClosureArtifactDescriptor[] = [
      {
        artifactKind: 'closeout',
        artifactId: 'closeout-1',
        nonAuthoritative: true,
        acceptance: false,
        verificationPass: false,
        durableTruthPromotion: false,
        truthMutation: false,
        statusRedefinition: false,
        durableRecordReplacement: false
      },
      {
        artifactKind: 'summary',
        artifactId: 'summary-1',
        nonAuthoritative: true,
        acceptance: false,
        verificationPass: false,
        durableTruthPromotion: false,
        truthMutation: false,
        statusRedefinition: false,
        durableRecordReplacement: false,
        freezeOwner: false,
        truthCarrier: false
      },
      {
        artifactKind: 'overlay-packaging',
        artifactId: 'overlay-1',
        nonAuthoritative: true,
        acceptance: false,
        verificationPass: false,
        durableTruthPromotion: false,
        truthMutation: false,
        statusRedefinition: false,
        durableRecordReplacement: false,
        authorityLayer: false
      }
  ];

  return {
    workspace,
    resultCollection,
    handoffPackage,
    descriptors
  };
}

describe('Block F closeout non-authority foundation', () => {
  it('assembles a deterministic closeout non-authority firewall and admits clean bounded closure artifacts', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors
      })
    ).toEqual({
      firewallKind: 'closeout-non-authority-firewall',
      admittedArtifactKinds: [
        'result-collection',
        'handoff',
        'closeout',
        'summary',
        'overlay-packaging'
      ],
      excludedAuthorityDriftClasses: [
        'acceptance',
        'verification-pass',
        'durable-truth-promotion',
        'truth-mutation',
        'status-redefinition',
        'durable-record-replacement',
        'freeze-owner',
        'truth-carrier',
        'authority-layer'
      ],
      closeoutWorkflowImplemented: false,
      nonAuthoritative: true,
      executesCloseout: false,
      durableTouched: false
    });
  });

  it('rejects malformed or incomplete closure-boundary inputs fail-closed', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage
      } as any)
    ).toThrowError(InvalidCloseoutBoundaryInputError);

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors,
        unexpected: true
      } as any)
    ).toThrowError(InvalidCloseoutBoundaryInputError);
  });

  it('rejects malformed or incomplete result collection fail-closed', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection: {
          ...resultCollection,
          packetKind: 'bad-kind'
        } as any,
        handoffPackage,
        descriptors
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);
  });

  it('rejects malformed or incomplete handoff package fail-closed', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage: {
          ...handoffPackage,
          nonAuthoritative: false
        } as any,
        descriptors
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);
  });

  it('rejects closure artifacts claiming acceptance', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors: [{ ...descriptors[0], acceptance: true } as any]
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);
  });

  it('rejects closure artifacts claiming verification pass', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors: [{ ...descriptors[0], verificationPass: true } as any]
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);
  });

  it('rejects closure artifacts claiming durable truth promotion', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors: [{ ...descriptors[0], durableTruthPromotion: true } as any]
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);
  });

  it('rejects closure artifacts claiming truth mutation, status redefinition, or durable-record replacement', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors: [{ ...descriptors[0], truthMutation: true } as any]
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors: [{ ...descriptors[0], statusRedefinition: true } as any]
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors: [{ ...descriptors[0], durableRecordReplacement: true } as any]
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);
  });

  it('rejects summary claiming freeze owner or truth carrier', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors: [{ ...descriptors[1], freezeOwner: true } as any]
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors: [{ ...descriptors[1], truthCarrier: true } as any]
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);
  });

  it('rejects overlay packaging claiming authority layer', async () => {
    const { resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();

    expect(() =>
      assembleCloseoutNonAuthorityFirewall({
        resultCollection,
        handoffPackage,
        descriptors: [{ ...descriptors[2], authorityLayer: true } as any]
      })
    ).toThrowError(InvalidCloseoutBoundaryInputError);
  });

  it('does not implement actual closeout workflow and does not touch durable surfaces', async () => {
    const { workspace, resultCollection, handoffPackage, descriptors } = await prepareApprovedClosureArtifacts();
    const verdictPath = join(workspace, 'durable', 'verdicts.md');
    const evidencePath = join(workspace, 'durable', 'evidence.md');
    const beforeVerdict = await readText(verdictPath);
    const beforeEvidence = await readText(evidencePath);

    const firewall = assembleCloseoutNonAuthorityFirewall({
      resultCollection,
      handoffPackage,
      descriptors
    });

    expect(firewall.closeoutWorkflowImplemented).toBe(false);
    expect(firewall.executesCloseout).toBe(false);
    expect(await readText(verdictPath)).toBe(beforeVerdict);
    expect(await readText(evidencePath)).toBe(beforeEvidence);
  });
});
