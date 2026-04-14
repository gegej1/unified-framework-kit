import { MissingRequiredSurfaceError, type RestoreInputBundle, type RequiredReadPlan } from '../../contracts/restore-input';
import type { RequiredTruthSurfaceKind } from '../../contracts/surfaces';
import { readSurface } from '../../storage/read-surface';

export async function assembleRestoreInputBundle(plan: RequiredReadPlan): Promise<RestoreInputBundle> {
  const readResults = [];

  for (const item of plan.orderedItems) {
    const result = await readSurface(item);
    if (item.required && !result.exists) {
      throw new MissingRequiredSurfaceError(item.kind as RequiredTruthSurfaceKind, item.path);
    }
    readResults.push(result);
  }

  return {
    layout: plan.layout,
    plan,
    requiredReads: readResults.filter((item) => item.required),
    optionalReads: readResults.filter((item) => !item.required),
    containsBusinessJudgment: false,
    currentVerdict: undefined,
    blockingDerivation: undefined,
    restoreAdmission: undefined
  };
}
