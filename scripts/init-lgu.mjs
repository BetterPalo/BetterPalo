#!/usr/bin/env node
// Sets up a copy of this template for one local government. It writes three files
// and no others:
//   src/config/lgu.ts   the LGU's identity, facts, and URLs (whole file)
//   wrangler.jsonc      the Worker name (only the "name" line changes)
//   package.json        the package name (only "name" changes)
//
//   pnpm init:lgu                                        ask the questions (writes into this repository)
//   pnpm init:lgu --answers <file.json>                  read the answers from a file
//   pnpm init:lgu --answers <file.json> --root <dir>     write into <dir> instead
//
// With --answers and no --root, the target is this repository's own config. The
// script refuses unless --yes is also given. Use --root with a copy.
//
// No fact has a default. Every problem is printed before anything is written.
// Exit codes: 0 = written, 1 = problems found (nothing written), 2 = bad command line.
// No dependencies beyond Node and the repository's own prettier.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const TYPES = ['municipality', 'city'];
const TOOL_NAME = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const TILE_KEYS = [
  'civil-registry',
  'business-permits',
  'assessor',
  'treasurer',
  'social-welfare',
  'senior-citizens',
  'health',
  'health-shop',
];
// The regex edits the first `"name": "..."` found anywhere in wrangler.jsonc, including inside a comment, so keep wrangler.jsonc's own `name` as the first such text.
const WORKER_NAME = /"name":\s*"[^"]*"/;
const USAGE = `Usage:
  pnpm init:lgu                                      ask the questions (writes into this repository)
  pnpm init:lgu --answers <file.json>                read the answers from a file (writes into this repository; needs --yes)
  pnpm init:lgu --answers <file.json> --root <dir>   write into <dir> instead (use this for a copy)`;

class UsageError extends Error {}

function parseArgs(argv) {
  const options = { answers: undefined, root: undefined, yes: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--yes') {
      options.yes = true;
    } else if (arg === '--answers' || arg === '--root') {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) {
        throw new UsageError(`${arg} needs a value.`);
      }
      if (arg === '--answers') options.answers = value;
      else options.root = value;
      i += 1;
    } else {
      throw new UsageError(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

const trimmed = (value) => (typeof value === 'string' ? value.trim() : value);
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const isText = (value) => typeof value === 'string' && value !== '';
const isCount = (value) => Number.isInteger(value) && value > 0;
const isYear = (value) => Number.isInteger(value) && value >= 1990 && value <= 2100;
const isWebAddress = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

function show(value) {
  if (value === undefined) return 'nothing';
  if (typeof value === 'number') return String(value);
  return JSON.stringify(value);
}

/**
 * Copies the answers into one set shape and trims text. Values are not checked
 * here; `validate` does that. `siteUrl` loses trailing slashes.
 */
function prepare(raw) {
  const r = isObject(raw) ? raw : {};
  const charter = isObject(r.charter) ? r.charter : {};
  const census = isObject(r.census) ? r.census : {};
  const referenceDate = isObject(census.referenceDate) ? census.referenceDate : {};
  const siteUrl = trimmed(r.siteUrl);
  return {
    name: trimmed(r.name),
    type: trimmed(r.type),
    province: trimmed(r.province),
    brand: trimmed(r.brand),
    toolName: trimmed(r.toolName),
    siteUrl: typeof siteUrl === 'string' ? siteUrl.replace(/\/+$/, '') : siteUrl,
    repoUrl: trimmed(r.repoUrl),
    officialSiteUrl: trimmed(r.officialSiteUrl),
    charter: {
      title: trimmed(charter.title),
      edition: trimmed(charter.edition),
      year: charter.year,
      url: trimmed(charter.url),
      services: charter.services,
      offices: charter.offices,
    },
    census: {
      population: census.population,
      source: trimmed(census.source),
      year: census.year,
      referenceDate: {
        en: trimmed(referenceDate.en),
        fil: trimmed(referenceDate.fil),
      },
      barangays: census.barangays,
    },
    offices: Array.isArray(r.offices)
      ? r.offices.map((office) => {
          const o = isObject(office) ? office : {};
          return { name: trimmed(o.name), short: trimmed(o.short), services: o.services };
        })
      : r.offices,
  };
}

/** Every problem with the prepared answers, and the warnings that do not stop a write. */
function validate(p) {
  const problems = [];
  const warnings = [];
  const check = (ok, message) => {
    if (!ok) problems.push(message);
  };

  const texts = [
    ['name', p.name],
    ['province', p.province],
    ['brand', p.brand],
    ['toolName', p.toolName],
    ['siteUrl', p.siteUrl],
    ['repoUrl', p.repoUrl],
    ['officialSiteUrl', p.officialSiteUrl],
    ['charter.title', p.charter.title],
    ['charter.edition', p.charter.edition],
    ['charter.url', p.charter.url],
    ['census.source', p.census.source],
    ['census.referenceDate.en', p.census.referenceDate.en],
    ['census.referenceDate.fil', p.census.referenceDate.fil],
  ];
  for (const [label, value] of texts) {
    check(isText(value), `${label} must be text and not blank (got ${show(value)})`);
  }

  check(TYPES.includes(p.type), `type must be "municipality" or "city" (got ${show(p.type)})`);
  if (isText(p.toolName)) {
    check(
      TOOL_NAME.test(p.toolName),
      `toolName must be lowercase letters, digits, and hyphens, 1 to 63 characters, not starting or ending with a hyphen (got ${show(p.toolName)})`,
    );
  }

  const urls = [
    ['siteUrl', p.siteUrl],
    ['repoUrl', p.repoUrl],
    ['officialSiteUrl', p.officialSiteUrl],
    ['charter.url', p.charter.url],
  ];
  for (const [label, value] of urls) {
    if (isText(value)) {
      check(isWebAddress(value), `${label} must be a web address (got ${show(value)})`);
    }
  }
  if (isText(p.siteUrl) && isWebAddress(p.siteUrl)) {
    check(
      new URL(p.siteUrl).protocol === 'https:',
      `siteUrl must start with https:// (got ${show(p.siteUrl)})`,
    );
  }

  const counts = [
    ['charter.services', p.charter.services],
    ['charter.offices', p.charter.offices],
    ['census.population', p.census.population],
    ['census.barangays', p.census.barangays],
  ];
  for (const [label, value] of counts) {
    check(isCount(value), `${label} must be a whole number above 0 (got ${show(value)})`);
  }
  const years = [
    ['charter.year', p.charter.year],
    ['census.year', p.census.year],
  ];
  for (const [label, value] of years) {
    check(isYear(value), `${label} must be a year from 1990 to 2100 (got ${show(value)})`);
  }

  if (!Array.isArray(p.offices) || p.offices.length === 0) {
    problems.push('offices must list at least one office');
  } else {
    const seen = new Set();
    p.offices.forEach((office, i) => {
      check(
        isText(office.name),
        `offices[${i}].name must be text and not blank (got ${show(office.name)})`,
      );
      check(
        isText(office.short),
        `offices[${i}].short must be text and not blank (got ${show(office.short)})`,
      );
      check(
        isCount(office.services),
        `offices[${i}].services must be a whole number above 0 (got ${show(office.services)})`,
      );
      if (isText(office.short)) {
        check(
          !seen.has(office.short),
          `short key "${office.short}" is used by more than one office`,
        );
        seen.add(office.short);
      }
    });
    if (isCount(p.charter.offices)) {
      check(
        p.offices.length === p.charter.offices,
        `charter.offices is ${p.charter.offices} but ${p.offices.length} offices are listed`,
      );
    }
    if (isCount(p.charter.services) && p.offices.every((office) => isCount(office.services))) {
      const sum = p.offices.reduce((total, office) => total + office.services, 0);
      check(
        sum === p.charter.services,
        `the offices' services add up to ${sum} but charter.services is ${p.charter.services}`,
      );
    }
    if (!p.offices.some((office) => TILE_KEYS.includes(office.short))) {
      warnings.push(
        `no office uses a tile key (${TILE_KEYS.join(', ')}), so no service tile will fill. Check the short keys.`,
      );
    }
  }

  return { problems, warnings };
}

/** Source of `src/config/lgu.ts`, in the same shape as Palo's file. Not yet formatted. */
function renderConfig(p) {
  const v = (value) => JSON.stringify(value);
  const rows = p.offices
    .map((o) => `    { name: ${v(o.name)}, short: ${v(o.short)}, services: ${o.services} },`)
    .join('\n');
  return `/**
 * The LGU's identity, facts, and URLs. Owned by the LGU: the template never edits
 * this file, and \`pnpm init:lgu\` writes it. Change a number only with its source.
 *
 * Sources: record where each figure and URL comes from in docs/data-sources.md.
 */
import type { LguConfig } from '../lib/lgu';

export const lgu: LguConfig = {
  name: ${v(p.name)},
  type: ${v(p.type)},
  province: ${v(p.province)},
  brand: ${v(p.brand)},
  siteUrl: ${v(p.siteUrl)},
  repoUrl: ${v(p.repoUrl)},
  officialSiteUrl: ${v(p.officialSiteUrl)},
  charter: {
    title: ${v(p.charter.title)},
    edition: ${v(p.charter.edition)},
    year: ${p.charter.year},
    url: ${v(p.charter.url)},
    services: ${p.charter.services},
    offices: ${p.charter.offices},
  },
  census: {
    population: ${p.census.population},
    source: ${v(p.census.source)},
    year: ${p.census.year},
    referenceDate: { en: ${v(p.census.referenceDate.en)}, fil: ${v(p.census.referenceDate.fil)} },
    barangays: ${p.census.barangays},
  },
  /** External services per office or unit, as the Charter lists them. */
  offices: [
${rows}
  ],
};
`;
}

/** Formats with the repository's prettier config. Returns null if prettier cannot run. */
async function formatTypeScript(text, file) {
  try {
    const prettier = await import('prettier');
    const options = await prettier.resolveConfig(file);
    return await prettier.format(text, { ...options, filepath: file });
  } catch {
    return null;
  }
}

/** Changes only the first "name" line of wrangler.jsonc, so comments survive. */
function renameWorker(text, toolName) {
  if (!WORKER_NAME.test(text)) return null;
  return text.replace(WORKER_NAME, () => `"name": ${JSON.stringify(toolName)}`);
}

function renamePackage(text, toolName) {
  const pkg = JSON.parse(text);
  pkg.name = toolName;
  return `${JSON.stringify(pkg, null, 2)}\n`;
}

function readOrProblem(path, problems) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    problems.push(`Cannot read ${path}. Is --root the folder of a copy of this template?`);
    return null;
  }
}

/** Asks every question in order. A blank fact is asked again; brand and tool name have suggestions. */
async function askInteractively(root) {
  // Lines come from the async iterator, which buffers them, so piped input is not lost.
  // The prompt is written by hand; the terminal echoes what the user types.
  const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
  const lines = rl[Symbol.asyncIterator]();
  const ask = async (question) => {
    process.stdout.write(question);
    const next = await lines.next();
    if (next.done) {
      throw new Error('Input ended before every answer was given. Nothing was written.');
    }
    return next.value;
  };

  const text = async (label, meaning, suggestion) => {
    for (;;) {
      const shown = suggestion === undefined ? '' : ` [${suggestion}]`;
      const answer = (await ask(`${label}${shown}\n  ${meaning}\n> `)).trim();
      if (answer !== '') return answer;
      if (suggestion !== undefined) return suggestion;
      console.log('  This fact has no default. Enter it from the official source.');
    }
  };
  // Digits become a number; anything else stays text so validation can name it.
  const number = async (label, meaning) => {
    const answer = await text(label, meaning);
    return /^\d+$/.test(answer) ? Number(answer) : answer;
  };

  try {
    console.log(`Set up a copy of this template for one local government.
Have your Citizen's Charter and census source open. Never guess a number.
Files will be written under: ${root}
`);

    const name = await text('Place name', 'Name only, for example Palo.');
    const type = await text('Type', `Kind of local government: ${TYPES.join(' or ')}.`);
    const province = await text('Province', 'The province the place is in, for example Leyte.');
    const brand = await text(
      'Brand',
      'Site brand, for example BetterPalo.',
      `Better${name.replace(/\s+/g, '')}`,
    );
    const toolName = await text(
      'Tool name',
      'Worker and package name: lowercase letters, digits, and hyphens, for example betterpalo.',
      brand.toLowerCase(),
    );
    const siteUrl = await text('Site address', 'Where the site is served, https://...');
    const repoUrl = await text(
      'Repository address',
      'Your copy of the repository, for example https://github.com/your-org/your-repo.',
    );
    const officialSiteUrl = await text('LGU website', 'The official website of your LGU.');
    const chartTitle = await text(
      'Charter title',
      "As printed on the Charter, for example Palo Citizen's Charter 2026.",
    );
    const chartEdition = await text('Charter edition', 'As printed, for example 2nd Edition.');
    const chartYear = await number('Charter year', 'The year of the Charter, for example 2026.');
    const chartUrl = await text('Charter PDF address', 'Link to the Charter PDF.');
    const chartServices = await number(
      'Charter services',
      'Total external services the Charter lists.',
    );
    const chartOffices = await number('Charter offices', 'Number of offices the Charter lists.');
    const population = await number('Population', 'Population from the census, as a whole number.');
    const censusSource = await text('Census source', 'For example PSA 2024 Census.');
    const censusYear = await number('Census year', 'The year of the census, for example 2024.');
    const referenceEn = await text('Census reference date (English)', 'For example July 1, 2024.');
    const referenceFil = await text(
      'Census reference date (Filipino)',
      'The same date in Filipino, for example Hulyo 1, 2024.',
    );
    const barangays = await number('Barangays', 'Number of barangays.');

    console.log(`Offices. Add each office or unit the Charter lists with external services.
A blank name ends the list. Short keys group service tiles; known keys: ${TILE_KEYS.join(', ')}.`);
    const offices = [];
    for (let n = 1; ; n += 1) {
      const officeName = (
        await ask(`Office ${n} name (blank to finish)\n  As printed in the Charter.\n> `)
      ).trim();
      if (officeName === '') break;
      const short = await text(
        `Office ${n} short key`,
        'A short name for grouping, for example treasurer.',
      );
      const services = await number(
        `Office ${n} services`,
        'External services this office lists in the Charter.',
      );
      offices.push({ name: officeName, short, services });
    }

    return {
      name,
      type,
      province,
      brand,
      toolName,
      siteUrl,
      repoUrl,
      officialSiteUrl,
      charter: {
        title: chartTitle,
        edition: chartEdition,
        year: chartYear,
        url: chartUrl,
        services: chartServices,
        offices: chartOffices,
      },
      census: {
        population,
        source: censusSource,
        year: censusYear,
        referenceDate: { en: referenceEn, fil: referenceFil },
        barangays,
      },
      offices,
    };
  } finally {
    rl.close();
  }
}

async function main(argv) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    if (!(error instanceof UsageError)) throw error;
    console.error(error.message);
    console.error(USAGE);
    return 2;
  }
  if (options.help) {
    console.log(USAGE);
    return 0;
  }
  if (options.answers !== undefined && options.root === undefined && !options.yes) {
    console.error(
      `Refusing to run. --answers without --root would overwrite this repository's own config:\n` +
        `  ${join(REPO_ROOT, 'src', 'config', 'lgu.ts')}\n` +
        `  ${join(REPO_ROOT, 'wrangler.jsonc')}\n` +
        `  ${join(REPO_ROOT, 'package.json')}\n` +
        `Pass --root <dir> to write into a copy instead, or add --yes to overwrite this repository.`,
    );
    return 2;
  }

  const root = resolve(options.root ?? REPO_ROOT);
  let raw;
  if (options.answers !== undefined) {
    const file = resolve(options.answers);
    try {
      raw = JSON.parse(readFileSync(file, 'utf8'));
    } catch (error) {
      console.error(`Cannot read the answers file ${file}: ${error.message}`);
      return 1;
    }
  } else {
    raw = await askInteractively(root);
  }

  const prepared = prepare(raw);
  const { problems, warnings } = validate(prepared);
  for (const warning of warnings) console.warn(`Warning: ${warning}`);
  if (problems.length > 0) {
    console.error(`Nothing was written. Fix these ${problems.length} problem(s) and run again:`);
    for (const problem of problems) console.error(`  - ${problem}`);
    return 1;
  }

  const paths = {
    config: join(root, 'src', 'config', 'lgu.ts'),
    wrangler: join(root, 'wrangler.jsonc'),
    pkg: join(root, 'package.json'),
  };
  const fileProblems = [];
  const wranglerText = readOrProblem(paths.wrangler, fileProblems);
  const packageText = readOrProblem(paths.pkg, fileProblems);
  let nextWrangler = null;
  let nextPackage = null;
  if (wranglerText !== null) {
    nextWrangler = renameWorker(wranglerText, prepared.toolName);
    if (nextWrangler === null) {
      fileProblems.push(`${paths.wrangler} has no "name" line to change.`);
    }
  }
  if (packageText !== null) {
    try {
      nextPackage = renamePackage(packageText, prepared.toolName);
    } catch {
      fileProblems.push(`${paths.pkg} is not valid JSON.`);
    }
  }
  if (fileProblems.length > 0) {
    console.error('Nothing was written:');
    for (const problem of fileProblems) console.error(`  - ${problem}`);
    return 1;
  }

  const source = renderConfig(prepared);
  const formatted = await formatTypeScript(source, paths.config);

  mkdirSync(dirname(paths.config), { recursive: true });
  writeFileSync(paths.config, formatted ?? source);
  writeFileSync(paths.wrangler, nextWrangler);
  writeFileSync(paths.pkg, nextPackage);

  console.log(`Wrote under ${root}:
  src/config/lgu.ts
  wrangler.jsonc (Worker name: ${prepared.toolName})
  package.json (name: ${prepared.toolName})`);
  if (formatted === null) {
    console.warn('Could not format src/config/lgu.ts with prettier. Run pnpm format.');
  }
  console.log(`
Next steps:
  1. Set the repository variable PRODUCTION_URL to your site address (Settings, Secrets
     and variables, Actions, Variables). Deploys and monitoring need it.
  2. Update the links in .github/ISSUE_TEMPLATE/*.yml to your repository.
  3. Run: pnpm check && pnpm test && pnpm build
  4. Read docs/adapt-for-your-lgu.md for the rest of the setup.`);
  return 0;
}

main(process.argv.slice(2)).then(
  (code) => {
    process.exitCode = code;
  },
  (error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  },
);
