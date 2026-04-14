import type {
  OwnershipMap,
  StrictStarTopologyAssemblyInput,
  StrictStarTopologyClaim,
  TopologyBoundaryResult
} from '../../contracts/block-d-topology';
import type { RoleScopedRuntimeContext } from '../../contracts/block-c-context';
import type { CoreRuntimeRole } from '../../contracts/block-c-dispatcher';
import { InvalidTopologyInputError } from '../../contracts/block-d-topology';
import { coreRuntimeRoles } from '../../contracts/block-c-dispatcher';
import { optionalContextSurfaceKinds, requiredTruthSurfaceKinds } from '../../contracts/surfaces';

const allowedInputKeys = new Set(['contexts', 'topologyClaims']);
const excludedArtifactClasses = [
  'summary',
  'overlay',
  'closeout',
  'research',
  'design',
  'dynamic-role',
  'teaching-support'
] as const;

export function assembleStrictStarTopologyBoundary(
  input: StrictStarTopologyAssemblyInput
): TopologyBoundaryResult {
  assertValidTopologyInput(input);

  const roles = coreRuntimeRoles.filter((role) =>
    input.contexts.some((context) => context.targetRole === role)
  );

  const ownershipMap = roles.reduce<OwnershipMap>((result, role) => {
    const context = input.contexts.find((item) => item.targetRole === role);
    if (!context) {
      throw new InvalidTopologyInputError('Topology boundary requires an ownership assignment for every admitted role');
    }

    result[role] = {
      role,
      activeFeatureId: context.activeFeatureId,
      taskId: context.taskId
    };
    return result;
  }, {});

  const topologyClaims = roles.map((role) => {
    const claim = input.topologyClaims.find((item) => item.toRole === role);
    if (!claim) {
      throw new InvalidTopologyInputError('Topology boundary requires one dispatcher-routed claim per admitted role');
    }
    return claim;
  });

  return {
    topologyKind: 'strict-star-topology-boundary',
    hubRole: 'dispatcher',
    roles,
    topologyClaims,
    ownershipMap,
    directNonDispatcherLinkage: false,
    nonAuthoritative: true,
    durableTouched: false
  };
}

function assertValidTopologyInput(
  input: StrictStarTopologyAssemblyInput
): asserts input is StrictStarTopologyAssemblyInput {
  if (!isRecord(input)) {
    throw new InvalidTopologyInputError('Strict-star topology assembly requires approved runtime contexts and topology claims');
  }

  const unexpectedKeys = Object.keys(input).filter((key) => !allowedInputKeys.has(key));
  if (unexpectedKeys.length > 0) {
    throw new InvalidTopologyInputError('Strict-star topology assembly rejects unexpected topology artifacts');
  }

  if (!Array.isArray(input.contexts) || input.contexts.length === 0) {
    throw new InvalidTopologyInputError('Strict-star topology assembly requires at least one approved runtime context');
  }

  if (!Array.isArray(input.topologyClaims) || input.topologyClaims.length === 0) {
    throw new InvalidTopologyInputError('Strict-star topology assembly requires explicit dispatcher-routed topology claims');
  }

  const seenRoles = new Set<CoreRuntimeRole>();
  for (const context of input.contexts) {
    assertValidRuntimeContext(context);
    if (seenRoles.has(context.targetRole)) {
      throw new InvalidTopologyInputError('Strict-star topology assembly rejects duplicate or conflicting ownership claims');
    }
    seenRoles.add(context.targetRole);
  }

  const seenTargets = new Set<CoreRuntimeRole>();
  for (const claim of input.topologyClaims) {
    assertValidTopologyClaim(claim);

    if (claim.fromRole !== 'dispatcher') {
      throw new InvalidTopologyInputError('Strict-star topology forbids direct linkage between non-dispatcher roles');
    }

    if (!seenRoles.has(claim.toRole)) {
      throw new InvalidTopologyInputError('Strict-star topology requires every claim target to match an admitted runtime role');
    }

    if (seenTargets.has(claim.toRole)) {
      throw new InvalidTopologyInputError('Strict-star topology rejects duplicate dispatcher-routed claims');
    }

    seenTargets.add(claim.toRole);
  }

  if (seenTargets.size !== seenRoles.size) {
    throw new InvalidTopologyInputError('Strict-star topology requires one dispatcher-routed claim per admitted role');
  }
}

function assertValidRuntimeContext(context: unknown): asserts context is RoleScopedRuntimeContext {
  if (!isRecord(context)) {
    throw new InvalidTopologyInputError('Strict-star topology assembly requires complete role-scoped runtime contexts');
  }

  if (
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
    throw new InvalidTopologyInputError('Strict-star topology assembly requires complete role-scoped runtime contexts');
  }
}

function assertValidTopologyClaim(claim: unknown): asserts claim is StrictStarTopologyClaim {
  if (
    !isRecord(claim) ||
    claim.claimKind !== 'strict-star-link' ||
    !isCoreRuntimeRole(claim.fromRole) ||
    !isCoreRuntimeRole(claim.toRole)
  ) {
    throw new InvalidTopologyInputError('Strict-star topology assembly requires complete dispatcher-routed claims');
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

function isCoreRuntimeRole(value: unknown): value is CoreRuntimeRole {
  return typeof value === 'string' && coreRuntimeRoles.includes(value as CoreRuntimeRole);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}
