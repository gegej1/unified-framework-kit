import type { RoleScopedRuntimeContext } from '../../contracts/block-c-context';
import type { ReackRequirementResult, StaleSliceEvaluationResult } from '../../contracts/block-e-validity';
import type { VerifierBoundaryInput } from '../../contracts/block-e-verifier';
import { InvalidVerifierInputError } from '../../contracts/block-e-verifier';
import { coreRuntimeRoles } from '../../contracts/block-c-dispatcher';
import { optionalContextSurfaceKinds, requiredTruthSurfaceKinds } from '../../contracts/surfaces';

const excludedArtifactClasses = [
  'summary',
  'overlay',
  'closeout',
  'research',
  'design',
  'dynamic-role',
  'teaching-support'
] as const;

const allowedKeys = new Set([
  'verifierContext',
  'freshness',
  'reackRequirement',
  'implementationContamination',
  'redesignContamination',
  'reviewAuthorshipContamination',
  'truthDefinitionContamination',
  'summaryNarrative',
  'overlayArtifacts',
  'closeoutArtifacts'
]);

export function assertValidVerifierBoundaryInput(
  input: unknown
): asserts input is VerifierBoundaryInput {
  if (!isRecord(input)) {
    throw new InvalidVerifierInputError('Verifier boundary requires approved verifier inputs');
  }

  const unexpectedKeys = Object.keys(input).filter((key) => !allowedKeys.has(key));
  if (unexpectedKeys.length > 0) {
    throw new InvalidVerifierInputError('Verifier boundary rejects unexpected verifier-control artifacts');
  }

  assertValidRuntimeContext(input.verifierContext);
  assertValidFreshnessResult(input.freshness);
  assertValidReackRequirement(input.reackRequirement);

  if (input.verifierContext.targetRole !== 'verification') {
    throw new InvalidVerifierInputError('Verifier boundary is only defined for the verification role in I5B');
  }

  if (input.freshness.stale || input.reackRequirement.required) {
    throw new InvalidVerifierInputError('Verifier boundary rejects stale verifier inputs until re-ack is satisfied');
  }

  if (!sameReasons(input.freshness.reasons, input.reackRequirement.reasons)) {
    throw new InvalidVerifierInputError('Verifier boundary requires freshness and re-ack reasoning to remain aligned');
  }

  if (isNonEmptyString(input.implementationContamination)) {
    throw new InvalidVerifierInputError('Verifier boundary rejects implementation contamination');
  }

  if (isNonEmptyString(input.redesignContamination)) {
    throw new InvalidVerifierInputError('Verifier boundary rejects redesign contamination');
  }

  if (isNonEmptyString(input.reviewAuthorshipContamination)) {
    throw new InvalidVerifierInputError('Verifier boundary rejects review authorship contamination');
  }

  if (isNonEmptyString(input.truthDefinitionContamination)) {
    throw new InvalidVerifierInputError('Verifier boundary rejects truth-definition contamination');
  }

  if (isNonEmptyString(input.summaryNarrative)) {
    throw new InvalidVerifierInputError('Verifier boundary rejects summary contamination');
  }

  if (Array.isArray(input.overlayArtifacts) && input.overlayArtifacts.length > 0) {
    throw new InvalidVerifierInputError('Verifier boundary rejects overlay contamination');
  }

  if (Array.isArray(input.closeoutArtifacts) && input.closeoutArtifacts.length > 0) {
    throw new InvalidVerifierInputError('Verifier boundary rejects closeout contamination');
  }
}

function assertValidRuntimeContext(context: unknown): asserts context is RoleScopedRuntimeContext {
  if (
    !isRecord(context) ||
    context.contextKind !== 'boundary-controlled-runtime-context' ||
    !isNonEmptyString(context.packetMarker) ||
    context.sourceRole !== 'dispatcher' ||
    !isCoreRuntimeRole(context.targetRole) ||
    !isNonEmptyString(context.activeFeatureId) ||
    !isNonEmptyString(context.taskId) ||
    !Array.isArray(context.requiredContext) ||
    context.requiredContext.length !== requiredTruthSurfaceKinds.length ||
    !requiredTruthSurfaceKinds.every((kind, index) => context.requiredContext[index] === kind) ||
    !isRecord(context.requiredSurfaces) ||
    !requiredTruthSurfaceKinds.every((kind) => isValidRequiredSurface(context.requiredSurfaces[kind], kind)) ||
    !Array.isArray(context.excludedOptionalContext) ||
    context.excludedOptionalContext.length !== optionalContextSurfaceKinds.length ||
    context.excludedOptionalContext[0] !== optionalContextSurfaceKinds[0] ||
    !Array.isArray(context.excludedArtifactClasses) ||
    context.excludedArtifactClasses.length !== excludedArtifactClasses.length ||
    !excludedArtifactClasses.every((kind, index) => context.excludedArtifactClasses[index] === kind) ||
    context.nonAuthoritative !== true ||
    context.durableTouched !== false
  ) {
    throw new InvalidVerifierInputError('Verifier boundary requires complete approved runtime contexts');
  }
}

function assertValidFreshnessResult(result: unknown): asserts result is StaleSliceEvaluationResult {
  if (
    !isRecord(result) ||
    result.freshnessKind !== 'stale-slice-evaluation' ||
    typeof result.stale !== 'boolean' ||
    !Array.isArray(result.reasons) ||
    result.nonAuthoritative !== true ||
    result.durableTouched !== false
  ) {
    throw new InvalidVerifierInputError('Verifier boundary requires a valid stale-slice evaluation result');
  }
}

function assertValidReackRequirement(result: unknown): asserts result is ReackRequirementResult {
  if (
    !isRecord(result) ||
    result.reackKind !== 'reack-requirement' ||
    typeof result.required !== 'boolean' ||
    !Array.isArray(result.reasons) ||
    result.nonAuthoritative !== true ||
    result.durableTouched !== false
  ) {
    throw new InvalidVerifierInputError('Verifier boundary requires a valid re-ack requirement result');
  }
}

function isValidRequiredSurface(surface: unknown, kind: string): boolean {
  return (
    isRecord(surface) &&
    surface.kind === kind &&
    typeof surface.path === 'string' &&
    surface.path.trim().length > 0 &&
    surface.required === true &&
    surface.exists === true &&
    typeof surface.content === 'string' &&
    surface.position === 'required-truth' &&
    typeof surface.size === 'number'
  );
}

function sameReasons(left: unknown[], right: unknown[]) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

function isCoreRuntimeRole(value: unknown): boolean {
  return typeof value === 'string' && coreRuntimeRoles.includes(value as any);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}
