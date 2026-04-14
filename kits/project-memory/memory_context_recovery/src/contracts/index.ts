export type {
  MemoryContextRecoveryBoundary,
  MemoryContextRecoveryIdentity
} from './boundary';
export {
  canonicalSurfaceKinds,
  getCanonicalSurfaceKinds,
  optionalContextSurfaceKinds,
  requiredTruthSurfaceKinds,
  summariesLatestKind
} from './surfaces';
export type {
  CanonicalSurfaceKind,
  CanonicalSurfaceLayout,
  CanonicalSurfacePathMap,
  OptionalContextSurfaceKind,
  RequiredTruthSurfaceKind
} from './surfaces';
export { MissingRequiredSurfaceError } from './restore-input';
export type {
  RequiredReadItem,
  RequiredReadPlan,
  RequiredReadPosition,
  RestoreInputBundle,
  SurfaceReadResult
} from './restore-input';
export type {
  BindingSingularityResult,
  PromotionBlockReason,
  PromotionReadinessResult,
  WorkingPromotionCandidate
} from './block-b-promotion';
export type {
  BlockingDecision,
  CurrentVerdictBlockingHint,
  CurrentVerdictStatus,
  CurrentVerdictValue,
  RestoreAcknowledgmentState,
  RestoreAcknowledgmentStatus,
  RestoreAdmissionDecision,
  RestoreDecisionReason,
  RestoreGateState
} from './restore-decision';
export {
  InvalidPackagingInputError,
  UnsupportedRoleError,
  coreRuntimeRoles
} from './block-c-dispatcher';
export { InvalidRuntimeContextError } from './block-c-context';
export { InvalidTopologyInputError } from './block-d-topology';
export { InvalidParallelEligibilityInputError } from './block-d-parallel';
export { InvalidFreshnessInputError, InvalidReviewerInputError } from './block-e-validity';
export { InvalidVerifierInputError } from './block-e-verifier';
export { InvalidCloseoutBoundaryInputError } from './block-f-closeout';
export { InvalidWorkingStateWriteError } from './block-b-write';
export type {
  CurrentTaskSnapshot,
  FeatureStateSnapshot,
  MemoryControlWriteRequest,
  MemoryControlWriteResult,
  WorkingStateWriteTarget
} from './block-b-write';
export type {
  CoreRuntimeRole,
  DispatcherPackagingInput,
  HandoffPackage,
  ResultCollectionPacket,
  RoleScopedSlice,
  RoutingPosture,
  UnifiedEnvelope
} from './block-c-dispatcher';
export type {
  BoundaryControlledContextAssemblyInput,
  ExcludedArtifactClass,
  RoleScopedRuntimeContext
} from './block-c-context';
export type {
  OwnershipAssignment,
  OwnershipMap,
  SerialOnlyFoundationResult,
  StrictStarTopologyAssemblyInput,
  StrictStarTopologyClaim,
  TopologyBoundaryResult
} from './block-d-topology';
export type {
  DispatcherRetreatToSerialInput,
  DispatcherRetreatToSerialResult,
  ParallelEligibilityInput,
  ParallelEligibilityReason,
  ParallelEligibilityResult
} from './block-d-parallel';
export type {
  ReackRequirementResult,
  ReviewerIndependenceInput,
  ReviewerIndependentPackage,
  StaleSliceEvaluationInput,
  StaleSliceEvaluationResult,
  StaleSliceReason
} from './block-e-validity';
export type {
  ExcludedVerifierDriftClass,
  VerifierBoundaryInput,
  VerifierBoundaryPackage
} from './block-e-verifier';
export type {
  ClosureArtifactDescriptor,
  ClosureArtifactKind,
  ClosureAuthorityDriftClass,
  ClosureNonAuthorityFirewallResult,
  ClosureNonAuthorityInput,
  CloseoutArtifactDescriptor,
  OverlayPackagingDescriptor,
  SummaryArtifactDescriptor
} from './block-f-closeout';
