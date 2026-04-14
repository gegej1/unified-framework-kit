import { cp, mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

export async function prepareFixtureWorkspace(
  name:
    | 'empty-state'
    | 'existing-state'
    | 'coherent-state'
    | 'missing-feature-state'
    | 'missing-current-task'
    | 'mismatched-binding'
    | 'ambiguous-binding'
): Promise<string> {
  const source = resolve(`tests/fixtures/block-b/${name}`);
  const workspace = await mkdtemp(join(tmpdir(), `mcr-block-b-${name}-`));
  await cp(source, workspace, { recursive: true });
  return workspace;
}

export function readText(path: string): Promise<string> {
  return readFile(path, 'utf8');
}
