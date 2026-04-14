import type {
  MemoryContextRecoveryBoundary,
  MemoryContextRecoveryIdentity
} from './contracts/boundary';

export {
  getCanonicalSurfaceKinds,
  InvalidPackagingInputError,
  InvalidRuntimeContextError,
  InvalidTopologyInputError,
  InvalidParallelEligibilityInputError,
  InvalidFreshnessInputError,
  InvalidReviewerInputError,
  InvalidVerifierInputError,
  InvalidCloseoutBoundaryInputError,
  InvalidWorkingStateWriteError,
  MissingRequiredSurfaceError,
  UnsupportedRoleError,
  coreRuntimeRoles,
  summariesLatestKind
} from './contracts';
export type {
  BindingSingularityResult,
  BlockingDecision,
  CanonicalSurfaceKind,
  ClosureArtifactDescriptor,
  ClosureArtifactKind,
  ClosureAuthorityDriftClass,
  ClosureNonAuthorityFirewallResult,
  ClosureNonAuthorityInput,
  CloseoutArtifactDescriptor,
  CanonicalSurfaceLayout,
  CanonicalSurfacePathMap,
  BoundaryControlledContextAssemblyInput,
  CoreRuntimeRole,
  CurrentTaskSnapshot,
  CurrentVerdictBlockingHint,
  CurrentVerdictStatus,
  CurrentVerdictValue,
  DispatcherPackagingInput,
  DispatcherRetreatToSerialInput,
  ReackRequirementResult,
  ReviewerIndependenceInput,
  ReviewerIndependentPackage,
  ExcludedVerifierDriftClass,
  VerifierBoundaryInput,
  VerifierBoundaryPackage,
  DispatcherRetreatToSerialResult,
  ExcludedArtifactClass,
  FeatureStateSnapshot,
  OverlayPackagingDescriptor,
  HandoffPackage,
  MemoryControlWriteRequest,
  OwnershipAssignment,
  ParallelEligibilityInput,
  StaleSliceEvaluationInput,
  StaleSliceEvaluationResult,
  StaleSliceReason,
  ParallelEligibilityReason,
  ParallelEligibilityResult,
  OwnershipMap,
  MemoryControlWriteResult,
  PromotionBlockReason,
  PromotionReadinessResult,
  SerialOnlyFoundationResult,
  StrictStarTopologyAssemblyInput,
  StrictStarTopologyClaim,
  RequiredReadItem,
  RequiredReadPlan,
  RestoreAcknowledgmentState,
  RoleScopedRuntimeContext,
  RestoreAcknowledgmentStatus,
  RestoreAdmissionDecision,
  RestoreDecisionReason,
  RestoreGateState,
  RestoreInputBundle,
  ResultCollectionPacket,
  RoleScopedSlice,
  RoutingPosture,
  SummaryArtifactDescriptor,
  SurfaceReadResult,
  TopologyBoundaryResult,
  UnifiedEnvelope,
  WorkingPromotionCandidate,
  WorkingStateWriteTarget
} from './contracts';
export {
  runtimeNamespace,
  assembleBoundaryControlledContext,
  assembleStrictStarTopologyBoundary,
  assembleReviewerIndependentPackage,
  assembleVerifierBoundaryPackage,
  assembleCloseoutNonAuthorityFirewall,
  deriveDispatcherRetreatToSerial,
  deriveReackRequirement,
  applyWorkingStateWrite,
  assembleRestoreInputBundle,
  assembleRoleScopedSlice,
  assembleUnifiedEnvelope,
  computeRoutingPosture,
  createHandoffPackage,
  createRequiredReadPlan,
  createResultCollectionPacket,
  decideRestoreAdmission,
  deriveBlockingDecision,
  deriveSerialOnlyFoundation,
  evaluateParallelEligibility,
  evaluateStaleSlice,
  evaluateBindingSingularity,
  evaluatePromotionReadiness,
  getCoreRuntimeRoles,
  parseCurrentVerdictStatus,
  parseRestoreAcknowledgmentStatus
} from './runtime';
export { storageNamespace, readSurface, resolveCanonicalSurfaceLayout } from './storage';
export type {
  MemoryContextRecoveryBoundary,
  MemoryContextRecoveryIdentity
} from './contracts';

export const memoryContextRecoveryBoundary: MemoryContextRecoveryBoundary = {
  root: 'memory_context_recovery',
  blocksImplemented: true,
  businessLogicIncluded: true
};

export function getMemoryContextRecoveryIdentity(): MemoryContextRecoveryIdentity {
  return {
    id: 'memory_context_recovery',
    scope: 'isolated-subproject',
    packet: 'I6A-block-f-closeout-non-authority-foundation'
  };
}
