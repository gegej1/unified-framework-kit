import type { PromotionReadinessResult } from './block-b-promotion';

export const coreRuntimeRoles = [
  'dispatcher',
  'implementation',
  'review',
  'verification'
] as const;

export type CoreRuntimeRole = (typeof coreRuntimeRoles)[number];

export type DispatcherPackagingInput = {
  targetRole: string;
  promotion: PromotionReadinessResult;
  packetMarker: string;
};

export type RoleScopedSlice = {
  packetKind: 'role-scoped-slice';
  packetMarker: string;
  sourceRole: 'dispatcher';
  targetRole: CoreRuntimeRole;
  activeFeatureId: string;
  taskId: string;
  nonAuthoritative: true;
  durableTouched: false;
};

export type RoutingPosture = {
  routingKind: 'dispatcher-routing-posture';
  sourceRole: 'dispatcher';
  targetRole: CoreRuntimeRole;
  dispatchOnly: true;
  executesWork: false;
  durableTouched: false;
};

export type UnifiedEnvelope = {
  envelopeKind: 'unified-dispatch-envelope';
  sourceRole: 'dispatcher';
  targetRole: CoreRuntimeRole;
  slice: RoleScopedSlice;
  routing: RoutingPosture;
  nonAuthoritative: true;
  acceptance: false;
  verificationPass: false;
  durableTruthPromotion: false;
};

export type ResultCollectionPacket = {
  packetKind: 'non-authoritative-result-collection';
  sourceRole: 'dispatcher';
  targetRole: CoreRuntimeRole;
  activeFeatureId: string;
  taskId: string;
  nonAuthoritative: true;
  acceptance: false;
  verificationPass: false;
  durableTruthPromotion: false;
};

export type HandoffPackage = {
  packetKind: 'non-authoritative-handoff-package';
  envelope: UnifiedEnvelope;
  resultCollection: ResultCollectionPacket;
  nonAuthoritative: true;
  acceptance: false;
  verificationPass: false;
  durableTruthPromotion: false;
};

export class UnsupportedRoleError extends Error {
  constructor(role: string) {
    super(`Unsupported runtime role for dispatcher packaging: ${role}`);
    this.name = 'UnsupportedRoleError';
  }
}

export class InvalidPackagingInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPackagingInputError';
  }
}
