import type { RestoreInputBundle, SurfaceReadResult } from './restore-input';
import type { RequiredTruthSurfaceKind } from './surfaces';
import type { CoreRuntimeRole, UnifiedEnvelope } from './block-c-dispatcher';

export type BoundaryControlledContextAssemblyInput = {
  envelope: UnifiedEnvelope;
  restoreInput: RestoreInputBundle;
};

export type ExcludedArtifactClass =
  | 'summary'
  | 'overlay'
  | 'closeout'
  | 'research'
  | 'design'
  | 'dynamic-role'
  | 'teaching-support';

export type RoleScopedRuntimeContext = {
  contextKind: 'boundary-controlled-runtime-context';
  packetMarker: string;
  sourceRole: 'dispatcher';
  targetRole: CoreRuntimeRole;
  activeFeatureId: string;
  taskId: string;
  requiredContext: RequiredTruthSurfaceKind[];
  requiredSurfaces: Record<RequiredTruthSurfaceKind, SurfaceReadResult>;
  excludedOptionalContext: ['summaries/latest'];
  excludedArtifactClasses: ExcludedArtifactClass[];
  nonAuthoritative: true;
  durableTouched: false;
};

export class InvalidRuntimeContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRuntimeContextError';
  }
}
