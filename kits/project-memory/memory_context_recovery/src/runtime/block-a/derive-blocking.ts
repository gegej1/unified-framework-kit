import type {
  BlockingDecision,
  CurrentVerdictStatus,
  RestoreAcknowledgmentStatus,
  RestoreDecisionReason
} from '../../contracts/restore-decision';

export function deriveBlockingDecision(input: {
  ack: RestoreAcknowledgmentStatus;
  verdict: CurrentVerdictStatus;
}): BlockingDecision {
  const reasons: RestoreDecisionReason[] = [];

  reasons.push(...input.ack.reasons);

  if (input.verdict.verdict === 'REJECTED') {
    reasons.push('REJECTED_VERDICT');
  } else if (input.verdict.verdict === 'APPROVED_WITH_CONDITIONS') {
    reasons.push('CONDITIONAL_VERDICT_STOP');
  } else if (input.verdict.verdict === 'ABSENT') {
    reasons.push('MISSING_CURRENT_VERDICT');
  }

  return {
    blocked: reasons.length > 0,
    reasons
  };
}
