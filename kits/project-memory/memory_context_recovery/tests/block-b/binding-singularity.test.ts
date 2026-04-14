import { describe, expect, it } from 'vitest';

import { evaluateBindingSingularity, evaluatePromotionReadiness } from '../../src/index';
import { prepareFixtureWorkspace, readText } from './test-helpers';

describe('Block B binding singularity gating', () => {
  it('accepts one coherent working-state binding candidate', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');
    const result = await evaluateBindingSingularity(workspace);

    expect(result).toMatchObject({
      singular: true,
      reasons: [],
      activeFeatureId: 'F-201',
      taskId: 'T-201'
    });
  });

  it('blocks fail-closed when feature-state is missing', async () => {
    const workspace = await prepareFixtureWorkspace('missing-feature-state');
    const result = await evaluateBindingSingularity(workspace);

    expect(result).toMatchObject({
      singular: false,
      reasons: ['MISSING_FEATURE_STATE'],
      activeFeatureId: null,
      taskId: 'T-301'
    });
  });

  it('blocks fail-closed when current-task is missing', async () => {
    const workspace = await prepareFixtureWorkspace('missing-current-task');
    const result = await evaluateBindingSingularity(workspace);

    expect(result).toMatchObject({
      singular: false,
      reasons: ['MISSING_CURRENT_TASK'],
      activeFeatureId: 'F-401',
      taskId: null
    });
  });

  it('blocks fail-closed when feature-state and current-task binding do not match', async () => {
    const workspace = await prepareFixtureWorkspace('mismatched-binding');
    const result = await evaluateBindingSingularity(workspace);

    expect(result).toMatchObject({
      singular: false,
      reasons: ['MISMATCHED_WORKING_BINDING'],
      activeFeatureId: 'F-501',
      taskId: 'T-501'
    });
  });

  it('blocks fail-closed on ambiguous binding claims', async () => {
    const workspace = await prepareFixtureWorkspace('ambiguous-binding');
    const result = await evaluateBindingSingularity(workspace);

    expect(result).toMatchObject({
      singular: false,
      reasons: ['AMBIGUOUS_CURRENT_TASK_BINDING'],
      activeFeatureId: 'F-601',
      taskId: 'T-601'
    });
  });

  it('does not mutate durable verdict or evidence while evaluating readiness', async () => {
    const workspace = await prepareFixtureWorkspace('coherent-state');

    await evaluatePromotionReadiness(workspace);

    expect(await readText(`${workspace}/durable/verdicts.md`)).toContain('DURABLE_VERDICTS_MUST_NOT_CHANGE');
    expect(await readText(`${workspace}/durable/evidence.md`)).toContain('DURABLE_EVIDENCE_MUST_NOT_CHANGE');
  });
});
