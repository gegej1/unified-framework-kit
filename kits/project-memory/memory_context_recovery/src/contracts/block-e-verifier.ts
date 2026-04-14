import type { RoleScopedRuntimeContext } from './block-c-context';
import type { ReackRequirementResult, StaleSliceEvaluationResult } from './block-e-validity';
import type { RequiredTruthSurfaceKind } from './surfaces';

export type ExcludedVerifierDriftClass =
  | 'implementation'
  | 'redesign'
  | 'review-authorship'
  | 'truth-definition'
  | 'summary'
  | 'overlay'
  | 'closeout';

export type VerifierBoundaryInput = {
  verifierContext: RoleScopedRuntimeContext;
  freshness: StaleSliceEvaluationResult;
  reackRequirement: ReackRequirementResult;
  implementationContamination?: string;
  redesignContamination?: string;
  reviewAuthorshipContamination?: string;
  truthDefinitionContamination?: string;
  summaryNarrative?: string;
  overlayArtifacts?: unknown[];
  closeoutArtifacts?: unknown[];
};

export type VerifierBoundaryPackage = {
  packageKind: 'verifier-boundary-package';
  verifierRole: 'verification';
  packetMarker: string;
  activeFeatureId: string;
  taskId: string;
  allowedSurfaceKinds: RequiredTruthSurfaceKind[];
  excludedDriftClasses: [
    'implementation',
    'redesign',
    'review-authorship',
    'truth-definition',
    'summary',
    'overlay',
    'closeout'
  ];
  reviewerIndependenceMerged: false;
  closeoutBoundaryImplemented: false;
  nonAuthoritative: true;
  executesVerification: false;
  durableTouched: false;
};

export class InvalidVerifierInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidVerifierInputError';
  }
}
