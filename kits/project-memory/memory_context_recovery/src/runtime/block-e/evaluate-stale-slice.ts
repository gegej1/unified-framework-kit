import type { StaleSliceEvaluationInput, StaleSliceEvaluationResult, StaleSliceReason } from '../../contracts/block-e-validity';
import { assertValidStaleSliceInput } from './validate-block-e-input';

export function evaluateStaleSlice(input: StaleSliceEvaluationInput): StaleSliceEvaluationResult {
  assertValidStaleSliceInput(input);

  const reasons: StaleSliceReason[] = [];

  if (input.admittedContext.packetMarker !== input.currentContext.packetMarker) {
    reasons.push('PACKET_MARKER_MISMATCH');
  }

  if (input.admittedContext.targetRole !== input.currentContext.targetRole) {
    reasons.push('TARGET_ROLE_MISMATCH');
  }

  if (
    input.admittedContext.activeFeatureId !== input.currentContext.activeFeatureId ||
    input.admittedContext.taskId !== input.currentContext.taskId
  ) {
    reasons.push('FEATURE_TASK_BINDING_MISMATCH');
  }

  return {
    freshnessKind: 'stale-slice-evaluation',
    stale: reasons.length > 0,
    reasons,
    nonAuthoritative: true,
    durableTouched: false
  };
}
