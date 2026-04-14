import type {
  CanonicalSurfaceKind,
  CanonicalSurfaceLayout,
  OptionalContextSurfaceKind,
  RequiredTruthSurfaceKind
} from './surfaces';

export type RequiredReadPosition = 'required-truth' | 'optional-last-context';

export type RequiredReadItem = {
  kind: CanonicalSurfaceKind;
  path: string;
  required: boolean;
  order: number;
  position: RequiredReadPosition;
};

export type RequiredReadPlan = {
  layout: CanonicalSurfaceLayout;
  orderedItems: RequiredReadItem[];
  requiredKinds: RequiredTruthSurfaceKind[];
  optionalKinds: OptionalContextSurfaceKind[];
};

export type SurfaceReadResult = {
  kind: CanonicalSurfaceKind;
  path: string;
  required: boolean;
  exists: boolean;
  content: string | null;
  order: number;
  position: RequiredReadPosition;
  size: number | null;
};

export type RestoreInputBundle = {
  layout: CanonicalSurfaceLayout;
  plan: RequiredReadPlan;
  requiredReads: SurfaceReadResult[];
  optionalReads: SurfaceReadResult[];
  containsBusinessJudgment: false;
  currentVerdict?: undefined;
  blockingDerivation?: undefined;
  restoreAdmission?: undefined;
};

export class MissingRequiredSurfaceError extends Error {
  readonly kind: RequiredTruthSurfaceKind;
  readonly path: string;

  constructor(kind: RequiredTruthSurfaceKind, path: string) {
    super(`Missing required surface: ${kind} at ${path}`);
    this.name = 'MissingRequiredSurfaceError';
    this.kind = kind;
    this.path = path;
  }
}
