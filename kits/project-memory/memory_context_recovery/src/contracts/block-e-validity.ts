import type { RoleScopedRuntimeContext } from './block-c-context';
import type { RequiredTruthSurfaceKind } from './surfaces';

export type StaleSliceReason =
  | 'PACKET_MARKER_MISMATCH'
  | 'TARGET_ROLE_MISMATCH'
  | 'FEATURE_TASK_BINDING_MISMATCH';

export type StaleSliceEvaluationInput = {
  admittedContext: RoleScopedRuntimeContext;
  currentContext: RoleScopedRuntimeContext;
};

export type StaleSliceEvaluationResult = {
  freshnessKind: 'stale-slice-evaluation';
  stale: boolean;
  reasons: StaleSliceReason[];
  nonAuthoritative: true;
  durableTouched: false;
};

export type ReackRequirementResult = {
  reackKind: 'reack-requirement';
  required: boolean;
  reasons: StaleSliceReason[];
  nonAuthoritative: true;
  durableTouched: false;
};

export type ReviewerIndependenceInput = {
  reviewerContext: RoleScopedRuntimeContext;
  freshness: StaleSliceEvaluationResult;
  reackRequirement: ReackRequirementResult;
  implementationIntent?: string;
  dispatcherFraming?: string;
  summaryNarrative?: string;
  overlayArtifacts?: unknown[];
  closeoutArtifacts?: unknown[];
};

export type ReviewerIndependentPackage = {
  packageKind: 'reviewer-independent-input-package';
  reviewerRole: 'review';
  packetMarker: string;
  activeFeatureId: string;
  taskId: string;
  allowedSurfaceKinds: RequiredTruthSurfaceKind[];
  excludedInputs: [
    'implementation-intent',
    'dispatcher-framing',
    'stale-slice',
    'summary-narrative',
    'overlay-artifacts',
    'closeout-artifacts'
  ];
  verifierBoundaryImplemented: false;
  nonAuthoritative: true;
  executesReview: false;
  durableTouched: false;
};

export class InvalidFreshnessInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidFreshnessInputError';
  }
}

export class InvalidReviewerInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidReviewerInputError';
  }
}
