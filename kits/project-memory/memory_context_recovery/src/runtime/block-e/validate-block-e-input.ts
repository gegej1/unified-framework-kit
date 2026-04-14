import type {
  ReackRequirementResult,
  ReviewerIndependenceInput,
  StaleSliceEvaluationInput,
  StaleSliceEvaluationResult
} from '../../contracts/block-e-validity';
import type { RoleScopedRuntimeContext } from '../../contracts/block-c-context';
import { InvalidFreshnessInputError, InvalidReviewerInputError } from '../../contracts/block-e-validity';
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

const reviewerInputKeys = new Set([
  'reviewerContext',
  'freshness',
  'reackRequirement',
  'implementationIntent',
  'dispatcherFraming',
  'summaryNarrative',
  'overlayArtifacts',
  'closeoutArtifacts'
]);

export function assertValidStaleSliceInput(
  input: unknown
): asserts input is StaleSliceEvaluationInput {
  if (!isRecord(input)) {
    throw new InvalidFreshnessInputError('Stale-slice evaluation requires admitted and current approved runtime contexts');
  }

  assertValidRuntimeContext(input.admittedContext);
  assertValidRuntimeContext(input.currentContext);
}

export function assertValidReviewerInput(
  input: unknown
): asserts input is ReviewerIndependenceInput {
  if (!isRecord(input)) {
    throw new InvalidReviewerInputError('Reviewer independence requires approved reviewer inputs');
  }

  const unexpectedKeys = Object.keys(input).filter((key) => !reviewerInputKeys.has(key));
  if (unexpectedKeys.length > 0) {
    throw new InvalidReviewerInputError('Reviewer independence rejects unexpected reviewer-control artifacts');
  }

  assertValidRuntimeContext(input.reviewerContext);
  assertValidFreshnessResult(input.freshness);
  assertValidReackRequirement(input.reackRequirement);

  if (input.reviewerContext.targetRole !== 'review') {
    throw new InvalidReviewerInputError('Reviewer independence is only defined for the review role in I5A');
  }

  if (input.freshness.stale || input.reackRequirement.required) {
    throw new InvalidReviewerInputError('Reviewer independence rejects stale reviewer inputs until re-ack is satisfied');
  }

  if (!sameReasons(input.freshness.reasons, input.reackRequirement.reasons)) {
    throw new InvalidReviewerInputError('Reviewer independence requires freshness and re-ack reasoning to remain aligned');
  }

  if (isNonEmptyString(input.implementationIntent)) {
    throw new InvalidReviewerInputError('Reviewer independence rejects implementation intent contamination');
  }

  if (isNonEmptyString(input.dispatcherFraming)) {
    throw new InvalidReviewerInputError('Reviewer independence rejects dispatcher framing contamination');
  }

  if (isNonEmptyString(input.summaryNarrative)) {
    throw new InvalidReviewerInputError('Reviewer independence rejects summary narrative contamination');
  }

  if (Array.isArray(input.overlayArtifacts) && input.overlayArtifacts.length > 0) {
    throw new InvalidReviewerInputError('Reviewer independence rejects overlay artifact contamination');
  }

  if (Array.isArray(input.closeoutArtifacts) && input.closeoutArtifacts.length > 0) {
    throw new InvalidReviewerInputError('Reviewer independence rejects closeout artifact contamination');
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
    throw new InvalidFreshnessInputError('Stale-slice evaluation requires complete approved runtime contexts');
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
    throw new InvalidReviewerInputError('Reviewer independence requires a valid stale-slice evaluation result');
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
    throw new InvalidReviewerInputError('Reviewer independence requires a valid re-ack requirement result');
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
