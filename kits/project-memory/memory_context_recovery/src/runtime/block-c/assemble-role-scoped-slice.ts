import type { CoreRuntimeRole, DispatcherPackagingInput, RoleScopedSlice } from '../../contracts/block-c-dispatcher';
import { InvalidPackagingInputError, UnsupportedRoleError, coreRuntimeRoles } from '../../contracts/block-c-dispatcher';

export function assembleRoleScopedSlice(input: DispatcherPackagingInput): RoleScopedSlice {
  const targetRole = assertCoreRuntimeRole(input.targetRole);

  if (!input.packetMarker.trim()) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a packet marker');
  }

  if (!input.promotion.ready || input.promotion.blocked || !input.promotion.binding.singular) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires a promotion-ready and singular candidate');
  }

  const activeFeatureId = input.promotion.candidate.featureState?.activeFeatureId;
  const taskId = input.promotion.candidate.currentTask?.taskId;

  if (!activeFeatureId || !taskId) {
    throw new InvalidPackagingInputError('Dispatcher packaging requires both feature-state and current-task bindings');
  }

  return {
    packetKind: 'role-scoped-slice',
    packetMarker: input.packetMarker,
    sourceRole: 'dispatcher',
    targetRole,
    activeFeatureId,
    taskId,
    nonAuthoritative: true,
    durableTouched: false
  };
}

function assertCoreRuntimeRole(role: string): CoreRuntimeRole {
  if (coreRuntimeRoles.includes(role as CoreRuntimeRole)) {
    return role as CoreRuntimeRole;
  }

  throw new UnsupportedRoleError(role);
}
