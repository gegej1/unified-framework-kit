import type { BoundaryControlledContextAssemblyInput, ExcludedArtifactClass, RoleScopedRuntimeContext } from '../../contracts/block-c-context';
import type { RestoreInputBundle, SurfaceReadResult } from '../../contracts/restore-input';
import type { RequiredTruthSurfaceKind } from '../../contracts/surfaces';
import { InvalidRuntimeContextError } from '../../contracts/block-c-context';
import { optionalContextSurfaceKinds, requiredTruthSurfaceKinds } from '../../contracts/surfaces';
import { assertValidUnifiedEnvelope } from './validate-packaging-input';

const excludedArtifactClasses: ExcludedArtifactClass[] = [
  'summary',
  'overlay',
  'closeout',
  'research',
  'design',
  'dynamic-role',
  'teaching-support'
];

const allowedInputKeys = new Set(['envelope', 'restoreInput']);

export function assembleBoundaryControlledContext(
  input: BoundaryControlledContextAssemblyInput
): RoleScopedRuntimeContext {
  assertValidContextAssemblyInput(input);

  const requiredSurfaces = Object.fromEntries(
    requiredTruthSurfaceKinds.map((kind) => [kind, getRequiredSurface(input.restoreInput, kind)])
  ) as Record<RequiredTruthSurfaceKind, SurfaceReadResult>;

  return {
    contextKind: 'boundary-controlled-runtime-context',
    packetMarker: input.envelope.slice.packetMarker,
    sourceRole: 'dispatcher',
    targetRole: input.envelope.targetRole,
    activeFeatureId: input.envelope.slice.activeFeatureId,
    taskId: input.envelope.slice.taskId,
    requiredContext: [...requiredTruthSurfaceKinds],
    requiredSurfaces,
    excludedOptionalContext: [...optionalContextSurfaceKinds],
    excludedArtifactClasses: [...excludedArtifactClasses],
    nonAuthoritative: true,
    durableTouched: false
  };
}

function assertValidContextAssemblyInput(
  input: BoundaryControlledContextAssemblyInput
): asserts input is BoundaryControlledContextAssemblyInput {
  if (!isRecord(input)) {
    throw new InvalidRuntimeContextError('Boundary-controlled context assembly requires approved upstream inputs');
  }

  const unexpectedKeys = Object.keys(input).filter((key) => !allowedInputKeys.has(key));
  if (unexpectedKeys.length > 0) {
    throw new InvalidRuntimeContextError('Boundary-controlled context assembly rejects non-core artifacts');
  }

  try {
    assertValidUnifiedEnvelope(input.envelope);
  } catch (error) {
    throw new InvalidRuntimeContextError('Boundary-controlled context assembly requires a valid unified envelope');
  }

  assertValidRestoreInputBundle(input.restoreInput);
}

function assertValidRestoreInputBundle(bundle: unknown): asserts bundle is RestoreInputBundle {
  if (!isRecord(bundle)) {
    throw new InvalidRuntimeContextError('Boundary-controlled context assembly requires a complete restore input bundle');
  }

  if (
    !isRecord(bundle.layout) ||
    !isRecord(bundle.plan) ||
    !Array.isArray(bundle.requiredReads) ||
    !Array.isArray(bundle.optionalReads) ||
    bundle.containsBusinessJudgment !== false ||
    bundle.currentVerdict !== undefined ||
    bundle.blockingDerivation !== undefined ||
    bundle.restoreAdmission !== undefined
  ) {
    throw new InvalidRuntimeContextError('Boundary-controlled context assembly requires a complete restore input bundle');
  }

  if (bundle.requiredReads.length !== requiredTruthSurfaceKinds.length) {
    throw new InvalidRuntimeContextError('Boundary-controlled context assembly requires every required truth surface');
  }

  requiredTruthSurfaceKinds.forEach((kind, index) => {
    const read = bundle.requiredReads[index];

    if (!isValidRequiredRead(read, kind, index)) {
      throw new InvalidRuntimeContextError('Boundary-controlled context assembly requires every required truth surface');
    }
  });

  if (bundle.optionalReads.length !== optionalContextSurfaceKinds.length) {
    throw new InvalidRuntimeContextError('Boundary-controlled context assembly requires the optional-last summary slot');
  }

  optionalContextSurfaceKinds.forEach((kind, index) => {
    const read = bundle.optionalReads[index];

    if (!isValidOptionalRead(read, kind, requiredTruthSurfaceKinds.length + index)) {
      throw new InvalidRuntimeContextError('Boundary-controlled context assembly requires a valid optional-last summary slot');
    }
  });
}

function getRequiredSurface(bundle: RestoreInputBundle, kind: RequiredTruthSurfaceKind): SurfaceReadResult {
  const surface = bundle.requiredReads.find((item) => item.kind === kind);

  if (!surface || !surface.exists || typeof surface.content !== 'string') {
    throw new InvalidRuntimeContextError('Boundary-controlled context assembly requires every required truth surface');
  }

  return surface;
}

function isValidRequiredRead(read: unknown, kind: RequiredTruthSurfaceKind, order: number): read is SurfaceReadResult {
  return (
    isRecord(read) &&
    read.kind === kind &&
    typeof read.path === 'string' &&
    read.path.trim().length > 0 &&
    read.required === true &&
    read.exists === true &&
    typeof read.content === 'string' &&
    read.order === order &&
    read.position === 'required-truth' &&
    typeof read.size === 'number'
  );
}

function isValidOptionalRead(read: unknown, kind: 'summaries/latest', order: number): read is SurfaceReadResult {
  return (
    isRecord(read) &&
    read.kind === kind &&
    typeof read.path === 'string' &&
    read.path.trim().length > 0 &&
    read.required === false &&
    typeof read.exists === 'boolean' &&
    (typeof read.content === 'string' || read.content === null) &&
    read.order === order &&
    read.position === 'optional-last-context' &&
    (typeof read.size === 'number' || read.size === null)
  );
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}
