import type { RestoreInputBundle } from './restore-input';

export type RestoreDecisionReason =
  | 'MISSING_RESTORE_ACK'
  | 'INCOMPLETE_RESTORE_ACK'
  | 'INVALID_RESTORE_ACK'
  | 'REJECTED_VERDICT'
  | 'CONDITIONAL_VERDICT_STOP'
  | 'MISSING_CURRENT_VERDICT';

export type RestoreAcknowledgmentState =
  | 'ack-complete'
  | 'ack-incomplete'
  | 'ack-absent'
  | 'ack-invalid';

export type RestoreGateState = 'READY' | 'PENDING' | 'INVALID' | 'ABSENT';

export type RestoreAcknowledgmentStatus = {
  state: RestoreAcknowledgmentState;
  present: boolean;
  complete: boolean;
  gateState: RestoreGateState;
  reasons: RestoreDecisionReason[];
};

export type CurrentVerdictValue =
  | 'APPROVED'
  | 'APPROVED_WITH_CONDITIONS'
  | 'REJECTED'
  | 'ABSENT';

export type CurrentVerdictBlockingHint =
  | 'none'
  | 'conditional-stop'
  | 'rejected'
  | 'missing-verdict';

export type CurrentVerdictStatus = {
  exists: boolean;
  verdict: CurrentVerdictValue;
  blockingHint: CurrentVerdictBlockingHint;
  rawLine: string | null;
};

export type BlockingDecision = {
  blocked: boolean;
  reasons: RestoreDecisionReason[];
};

export type RestoreAdmissionDecision = {
  decision: 'admitted' | 'rejected';
  reasons: RestoreDecisionReason[];
  ack: RestoreAcknowledgmentStatus;
  verdict: CurrentVerdictStatus;
  blocking: BlockingDecision;
  summaryInfluenced: false;
  bundle: RestoreInputBundle;
};
