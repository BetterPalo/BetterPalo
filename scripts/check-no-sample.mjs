#!/usr/bin/env node
// Fails when sample content (the fictional guide from ADR 0014) is in the built
// site. A production build must never contain it.
//
//   node scripts/check-no-sample.mjs [dir]     (default: dist)
//
// Exit codes: 0 = clean, 1 = sample content found, 2 = the folder does not exist.
// No dependencies, so the build, e2e, and deploy jobs can all run it as is.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const MARKER = 'betterlgu-sample-content'; // keep equal to SAMPLE_MARKER in src/lib/sample-content.ts
const ID_PREFIX = '/services/sample-';
const DIR_PATTERN = /(^|\/)services\/sample-/;
const TEXT_EXTENSIONS = ['.html', '.xml', '.txt', '.json', '.js'];

const root = process.argv[2] || 'dist';

if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(`No folder at ${root}. Run pnpm build first, or pass the folder to check.`);
  process.exit(2);
}

const findings = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    const rel = relative(root, path).split(sep).join('/');
    if (entry.isDirectory()) {
      if (DIR_PATTERN.test(`${rel}/`)) findings.push(`${rel}/`);
      walk(path);
    } else if (
      entry.isFile() &&
      TEXT_EXTENSIONS.some((extension) => entry.name.endsWith(extension))
    ) {
      const text = readFileSync(path, 'utf8');
      if (text.includes(MARKER) || text.includes(ID_PREFIX)) findings.push(rel);
    }
  }
}

walk(root);

if (findings.length > 0) {
  console.error(`Sample content found in ${root}:`);
  for (const finding of findings) console.error(`  ${finding}`);
  process.exit(1);
}

console.log(`No sample content in ${root}.`);
