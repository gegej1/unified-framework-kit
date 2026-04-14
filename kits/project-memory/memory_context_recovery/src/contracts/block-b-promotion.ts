import type { CurrentTaskSnapshot, FeatureStateSnapshot } from './block-b-write';

export type PromotionBlockReason =
  | 'MISSING_FEATURE_STATE'
  | 'MISSING_CURRENT_TASK'
  | 'INVALID_FEATURE_STATE'
  | 'INVALID_CURRENT_TASK'
  | 'AMBIGUOUS_CURRENT_TASK_BINDING'
  | 'MISMATCHED_WORKING_BINDING';

export type WorkingPromotionCandidate = {
  featureState: FeatureStateSnapshot | null;
  currentTask: CurrentTaskSnapshot | null;
};

export type BindingSingularityResult = {
  singular: boolean;
  reasons: PromotionBlockReason[];
  activeFeatureId: string | null;
  taskId: string | null;
  candidate: WorkingPromotionCandidate;
};

export type PromotionReadinessResult = {
  ready: boolean;
  blocked: boolean;
  reasons: PromotionBlockReason[];
  binding: BindingSingularityResult;
  candidate: WorkingPromotionCandidate;
  durableTouched: false;
};
