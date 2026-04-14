import type { ReackRequirementResult, StaleSliceEvaluationResult } from '../../contracts/block-e-validity';
import { InvalidFreshnessInputError } from '../../contracts/block-e-validity';

export function deriveReackRequirement(
  freshness: StaleSliceEvaluationResult
): ReackRequirementResult {
  if (
    !isRecord(freshness) ||
    freshness.freshnessKind !== 'stale-slice-evaluation' ||
    typeof freshness.stale !== 'boolean' ||
    !Array.isArray(freshness.reasons) ||
    freshness.nonAuthoritative !== true ||
    freshness.durableTouched !== false
  ) {
    throw new InvalidFreshnessInputError('Re-ack derivation requires a valid stale-slice evaluation result');
  }

  return {
    reackKind: 'reack-requirement',
    required: freshness.stale,
    reasons: [...freshness.reasons],
    nonAuthoritative: true,
    durableTouched: false
  };
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}
