// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import vitest from '@vitest/eslint-plugin'
import globals from 'globals'

export default tseslint.config(
    {
        ignores: [
            '**/dist/**',
            '**/lib/**',
            'docs/**'
        ]
    },
    eslint.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            '@stylistic': stylistic
        },

        languageOptions: {
            globals: {
                ...globals.node
            },

            parser: tseslint.parser,
            ecmaVersion: 9,
            sourceType: 'module',

            parserOptions: {
                project: './tsconfig.eslint.json'
            }
        },

        rules: {
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/ban-ts-comment': 'error',
            '@typescript-eslint/consistent-type-assertions': 'error',

            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true
                }
            ],

            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'no-public'
                }
            ],

            '@stylistic/func-call-spacing': ['error', 'never'],
            '@typescript-eslint/no-array-constructor': 'error',
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-extraneous-class': 'error',
            '@typescript-eslint/no-for-in-array': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/no-unnecessary-qualifier': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-useless-constructor': 'error',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/prefer-for-of': 'warn',
            '@typescript-eslint/prefer-function-type': 'warn',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
            '@typescript-eslint/promise-function-async': 'error',
            '@typescript-eslint/require-array-sort-compare': 'error',
            '@typescript-eslint/restrict-plus-operands': 'error',
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/type-annotation-spacing': 'error',
            '@typescript-eslint/unbound-method': 'error',
            camelcase: 'off',
            'eslint-comments/no-use': 'off',
            'i18n-text/no-en': 'off',
            'import/no-namespace': 'off',
            'no-unused-vars': 'off',
            semi: 'off'
        }
    },
    {
        files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
        ...tseslint.configs.disableTypeChecked
    },
    {
        files: ['__tests__/*.test.ts'],
        plugins: { vitest },
        rules: {
            ...vitest.configs.all.rules,
            'vitest/max-nested-describe': ['error', { max: 3 }]
        }
    }
)
