export { assembleBoundaryControlledContext } from './assemble-boundary-controlled-context';
export { assembleRoleScopedSlice } from './assemble-role-scoped-slice';
export { assembleUnifiedEnvelope } from './assemble-unified-envelope';
export { computeRoutingPosture } from './compute-routing-posture';
export { createHandoffPackage } from './create-handoff-package';
export { createResultCollectionPacket } from './create-result-collection-packet';

import { coreRuntimeRoles } from '../../contracts/block-c-dispatcher';

export function getCoreRuntimeRoles() {
  return [...coreRuntimeRoles];
}
