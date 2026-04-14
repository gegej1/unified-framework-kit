import type { CoreRuntimeRole, RoutingPosture } from '../../contracts/block-c-dispatcher';
import { UnsupportedRoleError, coreRuntimeRoles } from '../../contracts/block-c-dispatcher';

export function computeRoutingPosture(targetRole: string): RoutingPosture {
  if (!coreRuntimeRoles.includes(targetRole as CoreRuntimeRole)) {
    throw new UnsupportedRoleError(targetRole);
  }

  return {
    routingKind: 'dispatcher-routing-posture',
    sourceRole: 'dispatcher',
    targetRole: targetRole as CoreRuntimeRole,
    dispatchOnly: true,
    executesWork: false,
    durableTouched: false
  };
}
