import type { RestoreAdmissionDecision } from '../../contracts/restore-decision';
import type { RestoreInputBundle } from '../../contracts/restore-input';
import { deriveBlockingDecision } from './derive-blocking';
import { parseCurrentVerdictStatus } from './parse-current-verdict';
import { parseRestoreAcknowledgmentStatus } from './parse-restore-ack';

export function decideRestoreAdmission(bundle: RestoreInputBundle): RestoreAdmissionDecision {
  const ack = parseRestoreAcknowledgmentStatus(bundle);
  const verdict = parseCurrentVerdictStatus(bundle);
  const blocking = deriveBlockingDecision({ ack, verdict });

  return {
    decision: blocking.blocked ? 'rejected' : 'admitted',
    reasons: blocking.reasons,
    ack,
    verdict,
    blocking,
    summaryInfluenced: false,
    bundle
  };
}
