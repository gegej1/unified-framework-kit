import type { HandoffPackage, ResultCollectionPacket } from './block-c-dispatcher';

export type ClosureArtifactKind = 'closeout' | 'summary' | 'overlay-packaging';

export type CloseoutArtifactDescriptor = {
  artifactKind: 'closeout';
  artifactId: string;
  nonAuthoritative: true;
  acceptance: false;
  verificationPass: false;
  durableTruthPromotion: false;
  truthMutation: false;
  statusRedefinition: false;
  durableRecordReplacement: false;
};

export type SummaryArtifactDescriptor = {
  artifactKind: 'summary';
  artifactId: string;
  nonAuthoritative: true;
  acceptance: false;
  verificationPass: false;
  durableTruthPromotion: false;
  truthMutation: false;
  statusRedefinition: false;
  durableRecordReplacement: false;
  freezeOwner: false;
  truthCarrier: false;
};

export type OverlayPackagingDescriptor = {
  artifactKind: 'overlay-packaging';
  artifactId: string;
  nonAuthoritative: true;
  acceptance: false;
  verificationPass: false;
  durableTruthPromotion: false;
  truthMutation: false;
  statusRedefinition: false;
  durableRecordReplacement: false;
  authorityLayer: false;
};

export type ClosureArtifactDescriptor =
  | CloseoutArtifactDescriptor
  | SummaryArtifactDescriptor
  | OverlayPackagingDescriptor;

export type ClosureAuthorityDriftClass =
  | 'acceptance'
  | 'verification-pass'
  | 'durable-truth-promotion'
  | 'truth-mutation'
  | 'status-redefinition'
  | 'durable-record-replacement'
  | 'freeze-owner'
  | 'truth-carrier'
  | 'authority-layer';

export type ClosureNonAuthorityInput = {
  resultCollection: ResultCollectionPacket;
  handoffPackage: HandoffPackage;
  descriptors: ClosureArtifactDescriptor[];
};

export type ClosureNonAuthorityFirewallResult = {
  firewallKind: 'closeout-non-authority-firewall';
  admittedArtifactKinds: ['result-collection', 'handoff', ...ClosureArtifactKind[]];
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
  ];
  closeoutWorkflowImplemented: false;
  nonAuthoritative: true;
  executesCloseout: false;
  durableTouched: false;
};

export class InvalidCloseoutBoundaryInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCloseoutBoundaryInputError';
  }
}
