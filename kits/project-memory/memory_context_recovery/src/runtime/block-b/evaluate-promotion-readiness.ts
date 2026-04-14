import type { PromotionReadinessResult } from '../../contracts/block-b-promotion';
import { evaluateBindingSingularity } from './evaluate-binding-singularity';

export async function evaluatePromotionReadiness(rootDirectory: string): Promise<PromotionReadinessResult> {
  const binding = await evaluateBindingSingularity(rootDirectory);

  return {
    ready: binding.singular,
    blocked: !binding.singular,
    reasons: binding.reasons,
    binding,
    candidate: binding.candidate,
    durableTouched: false
  };
}
