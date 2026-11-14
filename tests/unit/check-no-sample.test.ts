import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { SAMPLE_MARKER } from '../../src/lib/sample-content';

const scriptPath = fileURLToPath(new URL('../../scripts/check-no-sample.mjs', import.meta.url));
const created: string[] = [];

function makeSite(files: Record<string, string>, dirs: string[] = []): string {
  const root = mkdtempSync(join(tmpdir(), 'nosample-'));
  created.push(root);
  for (const dir of dirs) mkdirSync(join(root, dir), { recursive: true });
  for (const [name, text] of Object.entries(files)) {
    const path = join(root, name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
  }
  return root;
}

function runCheck(dir: string) {
  return spawnSync(process.execPath, [scriptPath, dir], { encoding: 'utf8' });
}

afterAll(() => {
  for (const dir of created) rmSync(dir, { recursive: true, force: true });
});

describe('check-no-sample', () => {
  it('passes a clean site', () => {
    const site = makeSite({ 'index.html': '<html><body>Hello</body></html>' });
    const result = runCheck(site);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('No sample content');
  });

  it('fails when a page contains the sample marker', () => {
    const site = makeSite({
      'index.html': `<html><meta name="${SAMPLE_MARKER}"></html>`,
    });
    const result = runCheck(site);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Sample content found');
  });

  it('fails when a sample service folder exists', () => {
    const site = makeSite({}, ['services/sample-x']);
    expect(runCheck(site).status).toBe(1);
  });

  it('fails when a sample service folder exists under the Filipino path', () => {
    const site = makeSite({}, ['fil/services/sample-x']);
    expect(runCheck(site).status).toBe(1);
  });

  it('exits 2 when the folder does not exist', () => {
    const missing = join(tmpdir(), 'nosample-does-not-exist', 'dist');
    expect(runCheck(missing).status).toBe(2);
  });

  it('checks the same marker that the sample content module exports', () => {
    const script = readFileSync(scriptPath, 'utf8');
    expect(script).toContain(SAMPLE_MARKER);
  });
});
