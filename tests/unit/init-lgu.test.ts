import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { cityConfig } from '../fixtures/lgu-city';

// Most runs in this file pass --root to a temp folder. Two tests run a copy of the
// script with no --root (the refusal, and --yes). Those copies live in temp folders
// too, so the repository's own config is never a write target here.
const repo = fileURLToPath(new URL('../..', import.meta.url));
const scriptPath = join(repo, 'scripts', 'init-lgu.mjs');
const fixturePath = join(repo, 'tests', 'fixtures', 'init-answers-city.json');
// The files the script would write if it ran against the repository itself.
const guardedFiles = ['src/config/lgu.ts', 'wrangler.jsonc', 'package.json'];
// The Worker name line in wrangler.jsonc, matched the way the script matches it.
const firstNameLine = /"name":\s*"[^"]*"/;
const created: string[] = [];

// Text with the characters that are hard to put into a generated string literal.
const HOSTILE =
  'double " quote, single \' quote, backtick ` here, template ${1+1} here, comment */ end, new\nline, dollar $& here';

interface Office {
  name: string;
  short: string;
  services: number;
}

interface AnswerEdits {
  name: string;
  province: string;
  toolName: string;
  charter: { title: string; offices: number; services: number };
  offices: Office[];
}

function tempDir(): string {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), 'init-lgu-')));
  created.push(dir);
  return dir;
}

/** A temp folder with copies of the files the script edits, and the repo's prettier options. */
function makeRoot(): string {
  const root = tempDir();
  copyFileSync(join(repo, 'wrangler.jsonc'), join(root, 'wrangler.jsonc'));
  copyFileSync(join(repo, 'package.json'), join(root, 'package.json'));
  mkdirSync(join(root, 'src', 'config'), { recursive: true });
  const prettierOptions = JSON.parse(readFileSync(join(repo, '.prettierrc'), 'utf8'));
  delete prettierOptions.plugins;
  delete prettierOptions.overrides;
  writeFileSync(join(root, '.prettierrc'), JSON.stringify(prettierOptions));
  return root;
}

/**
 * A temp folder laid out like the repository (scripts/, the three files the script
 * edits, an empty src/config/). Run with no --root, the script's root is this folder.
 */
function makeScriptCopy(): string {
  const dir = tempDir();
  mkdirSync(join(dir, 'scripts'));
  mkdirSync(join(dir, 'src', 'config'), { recursive: true });
  copyFileSync(scriptPath, join(dir, 'scripts', 'init-lgu.mjs'));
  for (const file of ['wrangler.jsonc', 'package.json', '.prettierrc']) {
    copyFileSync(join(repo, file), join(dir, file));
  }
  return dir;
}

/** Every file under `dir` with its text, keyed by path relative to `dir`. */
function snapshot(dir: string): Map<string, string> {
  const files = new Map<string, string>();
  const walk = (current: string) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) walk(path);
      else files.set(relative(dir, path), readFileSync(path, 'utf8'));
    }
  };
  walk(dir);
  return files;
}

/** The repository's own guarded files, as text. Must be unchanged after every test. */
function readRepoFiles(): string[] {
  return guardedFiles.map((file) => readFileSync(join(repo, file), 'utf8'));
}

/** The fixture answers, with one edit applied, written to a temp file. */
function answersFile(edit: (answers: AnswerEdits) => void): string {
  const answers = JSON.parse(readFileSync(fixturePath, 'utf8')) as AnswerEdits;
  edit(answers);
  const file = join(tempDir(), 'answers.json');
  writeFileSync(file, JSON.stringify(answers));
  return file;
}

function run(answers: string, root: string) {
  return spawnSync(process.execPath, [scriptPath, '--answers', answers, '--root', root], {
    encoding: 'utf8',
  });
}

/** Runs the copy's own script, with no --root. */
function runCopy(copy: string, args: string[]) {
  return spawnSync(process.execPath, [join(copy, 'scripts', 'init-lgu.mjs'), ...args], {
    encoding: 'utf8',
    cwd: copy,
  });
}

/** Runs the script with no --answers, feeding `input` on stdin. Always with --root. */
function runInteractive(root: string, input: string) {
  return spawnSync(process.execPath, [scriptPath, '--root', root], {
    encoding: 'utf8',
    input,
  });
}

interface FixtureAnswers {
  name: string;
  type: string;
  province: string;
  brand: string;
  toolName: string;
  siteUrl: string;
  repoUrl: string;
  officialSiteUrl: string;
  charter: {
    title: string;
    edition: string;
    year: number;
    url: string;
    services: number;
    offices: number;
  };
  census: {
    population: number;
    source: string;
    year: number;
    referenceDate: { en: string; fil: string };
    barangays: number;
  };
  offices: Office[];
}

/**
 * The city fixture's answers, one per line, in the order `askInteractively` asks them,
 * then the confirmation line (or none, when `confirmation` is null).
 */
function interactiveInput(confirmation: string | null): string {
  const a = JSON.parse(readFileSync(fixturePath, 'utf8')) as FixtureAnswers;
  const lines = [
    a.name,
    a.type,
    a.province,
    a.brand,
    a.toolName,
    a.siteUrl,
    a.repoUrl,
    a.officialSiteUrl,
    a.charter.title,
    a.charter.edition,
    String(a.charter.year),
    a.charter.url,
    String(a.charter.services),
    String(a.charter.offices),
    String(a.census.population),
    a.census.source,
    String(a.census.year),
    a.census.referenceDate.en,
    a.census.referenceDate.fil,
    String(a.census.barangays),
  ];
  for (const office of a.offices) {
    lines.push(office.name, office.short, String(office.services));
  }
  // A blank office name ends the list.
  lines.push('');
  if (confirmation !== null) lines.push(confirmation);
  return lines.map((line) => `${line}\n`).join('');
}

function expectNothingWritten(root: string) {
  expect(existsSync(join(root, 'src', 'config', 'lgu.ts'))).toBe(false);
  expect(readFileSync(join(root, 'wrangler.jsonc'), 'utf8')).toBe(
    readFileSync(join(repo, 'wrangler.jsonc'), 'utf8'),
  );
  expect(readFileSync(join(root, 'package.json'), 'utf8')).toBe(
    readFileSync(join(repo, 'package.json'), 'utf8'),
  );
}

afterAll(() => {
  for (const dir of created) rmSync(dir, { recursive: true, force: true });
});

describe('pnpm init:lgu', () => {
  it('writes the LGU config, the Worker name, and the package name', () => {
    const root = makeRoot();
    const result = run(fixturePath, root);
    expect(result.status, result.stderr).toBe(0);

    const config = readFileSync(join(root, 'src', 'config', 'lgu.ts'), 'utf8');
    expect(config).toContain("import type { LguConfig } from '../lib/lgu';");
    expect(config).toContain('export const lgu: LguConfig = {');
    expect(config).toContain("name: 'Sample',");
    expect(config).toContain("type: 'city',");
    expect(config).toContain("province: 'Sample Province',");
    expect(config).toContain("brand: 'BetterSample',");
    expect(config).toContain("siteUrl: 'https://bettersample.example.org',");
    expect(config).toContain('year: 2025,');
    expect(config).toContain("referenceDate: { en: 'May 1, 2020', fil: 'Mayo 1, 2020' },");

    const wrangler = readFileSync(join(root, 'wrangler.jsonc'), 'utf8');
    const originalWrangler = readFileSync(join(repo, 'wrangler.jsonc'), 'utf8');
    expect(wrangler).toContain('"name": "bettersample"');
    expect(wrangler).toContain('"previews": {}');
    expect(wrangler).toContain('// Future backend');
    expect(wrangler).toBe(originalWrangler.replace(firstNameLine, '"name": "bettersample"'));

    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    const originalPkg = JSON.parse(readFileSync(join(repo, 'package.json'), 'utf8'));
    expect(pkg.name).toBe('bettersample');
    expect(pkg.scripts).toEqual(originalPkg.scripts);
    expect({ ...pkg, name: originalPkg.name }).toEqual(originalPkg);
  });

  it('writes a config whose offices match the fixture', async () => {
    const root = makeRoot();
    expect(run(fixturePath, root).status).toBe(0);
    const loaded = await import(join(root, 'src', 'config', 'lgu.ts'));
    expect(JSON.stringify(loaded.lgu.offices)).toBe(JSON.stringify(cityConfig.offices));
    expect(loaded.lgu).toEqual(cityConfig);
  });

  it('exits 1 and writes nothing when the office count does not match the Charter', () => {
    const root = makeRoot();
    const answers = answersFile((a) => {
      a.charter.offices = 5;
    });
    const result = run(answers, root);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('charter.offices');
    expect(existsSync(join(root, 'src', 'config', 'lgu.ts'))).toBe(false);
  });

  it('exits 1 and writes nothing when the tool name is not a valid Worker name', () => {
    const root = makeRoot();
    const answers = answersFile((a) => {
      a.toolName = 'Bad Name';
    });
    const result = run(answers, root);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('toolName');
    expect(existsSync(join(root, 'src', 'config', 'lgu.ts'))).toBe(false);
    expect(readFileSync(join(root, 'wrangler.jsonc'), 'utf8')).toBe(
      readFileSync(join(repo, 'wrangler.jsonc'), 'utf8'),
    );
  });

  it('prints every problem, not only the first', () => {
    const root = makeRoot();
    const answers = answersFile((a) => {
      a.charter.offices = 5;
      a.toolName = 'Bad Name';
    });
    const result = run(answers, root);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('charter.offices');
    expect(result.stderr).toContain('toolName');
  });

  it('refuses --answers with no --root and no --yes, and writes nothing', () => {
    const copy = makeScriptCopy();
    const repoBefore = readRepoFiles();
    const before = snapshot(copy);
    const result = runCopy(copy, ['--answers', fixturePath]);
    expect(result.status, result.stdout).toBe(2);
    expect(result.stderr).toContain('Refusing to run');
    expect(result.stderr).toContain(join(copy, 'src', 'config', 'lgu.ts'));
    expect(result.stderr).toContain(join(copy, 'wrangler.jsonc'));
    expect(result.stderr).toContain(join(copy, 'package.json'));
    expect(snapshot(copy)).toEqual(before);
    expect(readRepoFiles()).toEqual(repoBefore);
  });

  it('with --yes and no --root, runs and writes only inside the copy', async () => {
    const copy = makeScriptCopy();
    const repoBefore = readRepoFiles();
    const before = snapshot(copy);
    const result = runCopy(copy, ['--answers', fixturePath, '--yes']);
    expect(result.status, result.stderr).toBe(0);

    // The copy may start with Palo's names (a fresh template) or with the LGU's names
    // (a copy that already ran init:lgu). Either way only these three files may change.
    const allowed = ['package.json', join('src', 'config', 'lgu.ts'), 'wrangler.jsonc'];
    const after = snapshot(copy);
    const changed = [...after.keys()].filter((path) => before.get(path) !== after.get(path));
    expect(changed).toContain(join('src', 'config', 'lgu.ts'));
    for (const path of changed) expect(allowed).toContain(path);
    expect([...before.keys()].filter((path) => !after.has(path))).toEqual([]);

    // The final contents, not the diff: the Worker and package name are the LGU's.
    const repoWrangler = readFileSync(join(repo, 'wrangler.jsonc'), 'utf8');
    const wrangler = readFileSync(join(copy, 'wrangler.jsonc'), 'utf8');
    expect(wrangler).toContain('"name": "bettersample"');
    expect(wrangler).toBe(repoWrangler.replace(firstNameLine, '"name": "bettersample"'));
    const pkg = JSON.parse(readFileSync(join(copy, 'package.json'), 'utf8'));
    const originalPkg = JSON.parse(readFileSync(join(repo, 'package.json'), 'utf8'));
    expect(pkg.name).toBe('bettersample');
    expect({ ...pkg, name: originalPkg.name }).toEqual(originalPkg);

    const loaded = await import(join(copy, 'src', 'config', 'lgu.ts'));
    expect(loaded.lgu).toEqual(cityConfig);
    expect(readRepoFiles()).toEqual(repoBefore);
  });

  it('round-trips hostile text into the generated config unchanged', async () => {
    const root = makeRoot();
    const answers = answersFile((a) => {
      a.name = HOSTILE;
      a.province = HOSTILE;
      a.charter.title = HOSTILE;
      a.offices[0]!.name = HOSTILE;
    });
    const result = run(answers, root);
    expect(result.status, result.stderr).toBe(0);

    const loaded = await import(join(root, 'src', 'config', 'lgu.ts'));
    expect(loaded.lgu.name).toBe(HOSTILE);
    expect(loaded.lgu.province).toBe(HOSTILE);
    expect(loaded.lgu.charter.title).toBe(HOSTILE);
    expect(loaded.lgu.offices[0].name).toBe(HOSTILE);
    expect(loaded.lgu.siteUrl).toBe(cityConfig.siteUrl);
  });

  it('exits 1 and writes nothing when two offices share a short key', () => {
    const root = makeRoot();
    const answers = answersFile((a) => {
      a.offices[1]!.short = a.offices[0]!.short;
    });
    const result = run(answers, root);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('more than one office');
    expectNothingWritten(root);
  });

  it('exits 1 and writes nothing when the office services do not add up to the Charter', () => {
    const root = makeRoot();
    const answers = answersFile((a) => {
      a.offices[0]!.services = 5;
    });
    const result = run(answers, root);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('add up to 6');
    expect(result.stderr).toContain('charter.services is 3');
    expectNothingWritten(root);
  });

  it('warns, and still writes, when no office uses a tile key', async () => {
    const root = makeRoot();
    const answers = answersFile((a) => {
      a.offices[0]!.short = 'civil';
      a.offices[1]!.short = 'finance';
    });
    const result = run(answers, root);
    expect(result.status, result.stderr).toBe(0);
    expect(result.stderr).toContain('Warning: no office uses a tile key');

    const loaded = await import(join(root, 'src', 'config', 'lgu.ts'));
    expect(loaded.lgu.offices.map((office: Office) => office.short)).toEqual(['civil', 'finance']);
  });
});

describe('pnpm init:lgu in interactive mode', () => {
  it('shows a summary and writes nothing when the answer is n', () => {
    const root = makeRoot();
    const before = snapshot(root);
    const result = runInteractive(root, interactiveInput('n'));
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('LGU: Sample (city)');
    expect(result.stdout).toContain('Site address: https://bettersample.example.org');
    expect(result.stdout).toContain('Write these files? [y/N]');
    expect(result.stdout).toContain('Nothing was written.');
    expect(snapshot(root)).toEqual(before);
  });

  it('writes the files when the answer is y', async () => {
    const root = makeRoot();
    const result = runInteractive(root, interactiveInput('y'));
    expect(result.status, result.stderr).toBe(0);

    const loaded = await import(join(root, 'src', 'config', 'lgu.ts'));
    expect(loaded.lgu).toEqual(cityConfig);
    const wrangler = readFileSync(join(root, 'wrangler.jsonc'), 'utf8');
    expect(wrangler).toContain('"name": "bettersample"');
  });

  it('treats a blank answer as no and writes nothing', () => {
    const root = makeRoot();
    const before = snapshot(root);
    const result = runInteractive(root, interactiveInput(''));
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('Nothing was written.');
    expect(snapshot(root)).toEqual(before);
  });

  it('treats an input that ends before the confirmation as no and writes nothing', () => {
    const root = makeRoot();
    const before = snapshot(root);
    const result = runInteractive(root, interactiveInput(null));
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('Nothing was written.');
    expect(snapshot(root)).toEqual(before);
  });
});
