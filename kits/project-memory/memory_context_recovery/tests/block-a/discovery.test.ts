import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';

import {
  getCanonicalSurfaceKinds,
  resolveCanonicalSurfaceLayout,
  summariesLatestKind
} from '../../src/index';

describe('Block A canonical surface discovery', () => {
  it('resolves the fixed canonical surface layout without treating research markdown as a surface', () => {
    const fixtureRoot = resolve('tests/fixtures/block-a/complete');
    const layout = resolveCanonicalSurfaceLayout(fixtureRoot);

    expect(getCanonicalSurfaceKinds()).toEqual([
      'durable/procedures',
      'durable/facts',
      'durable/verdicts',
      'durable/evidence',
      'working/current-task',
      'working/restore-gate',
      summariesLatestKind
    ]);

    expect(layout.rootDirectory).toBe(fixtureRoot);
    expect(layout.paths['durable/procedures']).toMatch(/durable\/procedures\.md$/);
    expect(layout.paths['working/restore-gate']).toMatch(/working\/restore-gate\.md$/);
    expect(layout.paths['summaries/latest']).toMatch(/summaries\/latest\.md$/);
    expect(Object.keys(layout.paths)).toHaveLength(7);
  });
});
