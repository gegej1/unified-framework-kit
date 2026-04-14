import type { RestoreAcknowledgmentStatus } from '../../contracts/restore-decision';
import type { RestoreInputBundle, SurfaceReadResult } from '../../contracts/restore-input';

export function parseRestoreAcknowledgmentStatus(bundle: RestoreInputBundle): RestoreAcknowledgmentStatus {
  const gateSurface = findRequiredRead(bundle, 'working/restore-gate');
  const content = gateSurface.content ?? '';

  const ackValue = matchLineValue(content, 'Restore-Ack');
  const gateState = normalizeGateState(matchLineValue(content, 'Gate-State'));

  if (ackValue === null || ackValue === 'ABSENT') {
    return {
      state: 'ack-absent',
      present: false,
      complete: false,
      gateState,
      reasons: ['MISSING_RESTORE_ACK']
    };
  }

  if (ackValue === 'INCOMPLETE') {
    if (gateState === 'PENDING' || gateState === 'ABSENT') {
      return {
        state: 'ack-incomplete',
        present: true,
        complete: false,
        gateState,
        reasons: ['INCOMPLETE_RESTORE_ACK']
      };
    }

    return {
      state: 'ack-invalid',
      present: true,
      complete: false,
      gateState,
      reasons: ['INVALID_RESTORE_ACK']
    };
  }

  if (ackValue === 'COMPLETE') {
    if (gateState === 'READY') {
      return {
        state: 'ack-complete',
        present: true,
        complete: true,
        gateState,
        reasons: []
      };
    }

    return {
      state: 'ack-invalid',
      present: true,
      complete: false,
      gateState,
      reasons: ['INVALID_RESTORE_ACK']
    };
  }

  return {
    state: 'ack-invalid',
    present: true,
    complete: false,
    gateState,
    reasons: ['INVALID_RESTORE_ACK']
  };
}

function findRequiredRead(bundle: RestoreInputBundle, kind: SurfaceReadResult['kind']): SurfaceReadResult {
  const item = bundle.requiredReads.find((read) => read.kind === kind);
  if (!item) {
    throw new Error(`Required surface not found in bundle: ${kind}`);
  }
  return item;
}

function matchLineValue(content: string, label: string): string | null {
  const regex = new RegExp(`^${label}:\\s*(.+)$`, 'mi');
  const match = content.match(regex);
  return match ? match[1].trim().toUpperCase() : null;
}

function normalizeGateState(value: string | null): RestoreAcknowledgmentStatus['gateState'] {
  if (value === 'READY' || value === 'PENDING' || value === 'INVALID') {
    return value;
  }
  return 'ABSENT';
}
