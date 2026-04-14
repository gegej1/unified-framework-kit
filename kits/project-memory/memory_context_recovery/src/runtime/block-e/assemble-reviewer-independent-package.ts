import type { ReviewerIndependenceInput, ReviewerIndependentPackage } from '../../contracts/block-e-validity';
import { requiredTruthSurfaceKinds } from '../../contracts/surfaces';
import { assertValidReviewerInput } from './validate-block-e-input';

export function assembleReviewerIndependentPackage(
  input: ReviewerIndependenceInput
): ReviewerIndependentPackage {
  assertValidReviewerInput(input);

  return {
    packageKind: 'reviewer-independent-input-package',
    reviewerRole: 'review',
    packetMarker: input.reviewerContext.packetMarker,
    activeFeatureId: input.reviewerContext.activeFeatureId,
    taskId: input.reviewerContext.taskId,
    allowedSurfaceKinds: [...requiredTruthSurfaceKinds],
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
  };
}
