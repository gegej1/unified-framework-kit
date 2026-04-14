import { describe, expect, it } from 'vitest';

import { evaluatePromotionReadiness } from '../../src/index';
import { prepareFixtureWorkspace } from './test-helpers';

describe('Block B promotion gating', () => {
  it('marks a coherent working-state candidate as ready for later promotion consideration', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const result = await evaluatePromotionReadiness(workspace);

    expect(result).toMatchObject({
      ready: true,
      blocked: false,
      reasons: [],
      durableTouched: false
    });
    expect(result.binding.singular).toBe(true);
  });

  it('blocks fail-closed when feature-state is missing', async () => {
    const workspace = await prepareFixtureWorkspace('missing-feature-state');
    const result = await evaluatePromotionReadiness(workspace);

    expect(result).toMatchObject({
      ready: false,
      blocked: true,
      reasons: ['MISSING_FEATURE_STATE'],
      durableTouched: false
    });
  });

  it('blocks fail-closed when current-task is missing', async () => {
    const workspace = await prepareFixtureWorkspace('missing-current-task');
    const result = await evaluatePromotionReadiness(workspace);

    expect(result).toMatchObject({
      ready: false,
      blocked: true,
      reasons: ['MISSING_CURRENT_TASK'],
      durableTouched: false
    });
  });
});
