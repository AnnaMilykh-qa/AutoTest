import * as js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import * as globals from 'globals'
import playwright from 'eslint-plugin-playwright'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  // 1. Базовые правила JavaScript + TypeScript
  {
    ignores: ['node_modules/**', 'dist/**', 'playwright-report/**', 'test-results/**'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    extends: ['js/recommended', ...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    plugins: { js },
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },

  // 2. Правила для Playwright тестов
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off',
    },
  },

  // 3. Дополнительные строгие правила
  {
    rules: {
      '@typescript-eslint/no-floating-promises': 'error', // Забытый await
      '@typescript-eslint/no-unused-vars': 'error', // Неиспользуемые переменные
    },
  },

  // 4. Отключить правила, конфликтующие с Prettier (ДОЛЖЕН БЫТЬ ПОСЛЕДНИМ!)
  eslintConfigPrettier,
])
