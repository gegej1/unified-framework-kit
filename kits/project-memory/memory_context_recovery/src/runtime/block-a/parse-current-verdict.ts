import type { CurrentVerdictStatus } from '../../contracts/restore-decision';
import type { RestoreInputBundle, SurfaceReadResult } from '../../contracts/restore-input';

export function parseCurrentVerdictStatus(bundle: RestoreInputBundle): CurrentVerdictStatus {
  const verdictSurface = findRequiredRead(bundle, 'durable/verdicts');
  const content = verdictSurface.content ?? '';
  const rawLine = matchLine(content, 'Current-Verdict');
  const normalized = rawLine?.split(':')[1]?.trim().toUpperCase() ?? null;

  if (normalized === 'APPROVED') {
    return {
      exists: true,
      verdict: 'APPROVED',
      blockingHint: 'none',
      rawLine
    };
  }

  if (normalized === 'APPROVED_WITH_CONDITIONS') {
    return {
      exists: true,
      verdict: 'APPROVED_WITH_CONDITIONS',
      blockingHint: 'conditional-stop',
      rawLine
    };
  }

  if (normalized === 'REJECTED') {
    return {
      exists: true,
      verdict: 'REJECTED',
      blockingHint: 'rejected',
      rawLine
    };
  }

  return {
    exists: false,
    verdict: 'ABSENT',
    blockingHint: 'missing-verdict',
    rawLine: null
  };
}

function findRequiredRead(bundle: RestoreInputBundle, kind: SurfaceReadResult['kind']): SurfaceReadResult {
  const item = bundle.requiredReads.find((read) => read.kind === kind);
  if (!item) {
    throw new Error(`Required surface not found in bundle: ${kind}`);
  }
  return item;
}

function matchLine(content: string, label: string): string | null {
  const regex = new RegExp(`^${label}:\\s*(.+)$`, 'mi');
  const match = content.match(regex);
  return match ? match[0].trim() : null;
}
