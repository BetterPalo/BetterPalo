import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default defineConfig(
  {
    ignores: [
      'dist/',
      '.astro/',
      '.wrangler/',
      'node_modules/',
      'playwright-report/',
      'test-results/',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  astro.configs['jsx-a11y-recommended'],
  { files: ['**/*.{jsx,tsx}'], ...jsxA11y.flatConfigs.recommended },
  { files: ['**/*.{jsx,tsx}'], ...reactHooks.configs.flat.recommended },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
);
