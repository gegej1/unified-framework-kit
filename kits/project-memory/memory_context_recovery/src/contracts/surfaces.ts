export const requiredTruthSurfaceKinds = [
  'durable/procedures',
  'durable/facts',
  'durable/verdicts',
  'durable/evidence',
  'working/current-task',
  'working/restore-gate'
] as const;

export const summariesLatestKind = 'summaries/latest' as const;

export const optionalContextSurfaceKinds = [summariesLatestKind] as const;

export const canonicalSurfaceKinds = [
  ...requiredTruthSurfaceKinds,
  ...optionalContextSurfaceKinds
] as const;

export type RequiredTruthSurfaceKind = (typeof requiredTruthSurfaceKinds)[number];
export type OptionalContextSurfaceKind = (typeof optionalContextSurfaceKinds)[number];
export type CanonicalSurfaceKind = (typeof canonicalSurfaceKinds)[number];

export type CanonicalSurfacePathMap = Record<CanonicalSurfaceKind, string>;

export type CanonicalSurfaceLayout = {
  rootDirectory: string;
  paths: CanonicalSurfacePathMap;
  requiredKinds: readonly RequiredTruthSurfaceKind[];
  optionalKinds: readonly OptionalContextSurfaceKind[];
};

export function getCanonicalSurfaceKinds(): CanonicalSurfaceKind[] {
  return [...canonicalSurfaceKinds];
}
