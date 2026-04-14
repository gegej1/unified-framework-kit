import type { BindingSingularityResult, PromotionBlockReason, WorkingPromotionCandidate } from '../../contracts/block-b-promotion';
import { readCurrentTaskSnapshot } from '../../storage/block-b/read-current-task';
import { readFeatureStateSnapshot } from '../../storage/block-b/read-feature-state';

export async function evaluateBindingSingularity(rootDirectory: string): Promise<BindingSingularityResult> {
  const [featureStateResult, currentTaskResult] = await Promise.all([
    readFeatureStateSnapshot(rootDirectory),
    readCurrentTaskSnapshot(rootDirectory)
  ]);

  const reasons: PromotionBlockReason[] = [];

  if (featureStateResult.reason) {
    reasons.push(featureStateResult.reason);
  }

  if (currentTaskResult.reason) {
    reasons.push(currentTaskResult.reason);
  }

  if (
    featureStateResult.snapshot &&
    currentTaskResult.snapshot &&
    featureStateResult.snapshot.activeFeatureId !== currentTaskResult.snapshot.activeFeatureId
  ) {
    reasons.push('MISMATCHED_WORKING_BINDING');
  }

  const candidate: WorkingPromotionCandidate = {
    featureState: featureStateResult.snapshot,
    currentTask: currentTaskResult.snapshot
  };

  return {
    singular: reasons.length === 0,
    reasons,
    activeFeatureId: featureStateResult.snapshot?.activeFeatureId ?? null,
    taskId: currentTaskResult.taskId,
    candidate
  };
}
