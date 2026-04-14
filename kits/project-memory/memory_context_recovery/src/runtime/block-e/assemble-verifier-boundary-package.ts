import type { VerifierBoundaryInput, VerifierBoundaryPackage } from '../../contracts/block-e-verifier';
import { requiredTruthSurfaceKinds } from '../../contracts/surfaces';
import { assertValidVerifierBoundaryInput } from './validate-verifier-boundary-input';

export function assembleVerifierBoundaryPackage(
  input: VerifierBoundaryInput
): VerifierBoundaryPackage {
  assertValidVerifierBoundaryInput(input);

  return {
    packageKind: 'verifier-boundary-package',
    verifierRole: 'verification',
    packetMarker: input.verifierContext.packetMarker,
    activeFeatureId: input.verifierContext.activeFeatureId,
    taskId: input.verifierContext.taskId,
    allowedSurfaceKinds: [...requiredTruthSurfaceKinds],
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
  };
}
