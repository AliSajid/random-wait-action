// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import vitest from '@vitest/eslint-plugin'

export default tseslint.config(
    {
        ignores: [
            '**/dist/**',
            '**/lib/**'
        ]
    },
    eslint.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin
        },

        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 9,
            sourceType: 'module',

            parserOptions: {
                project: './tsconfig.eslint.json',
                tsconfigRootDir: import.meta.dirname
            }
        }
    },

    tseslint.configs.stylistic,

    {
        files: ['__tests__/**', 'src/**/*.spec.ts'], // or any other pattern
        plugins: {
            vitest
        },
        rules: {
            ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
            'vitest/max-nested-describe': ['error', { max: 3 }] // you can also modify rules' behavior using option like this
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
            ...vitest.configs.recommended.rules,
            'vitest/max-nested-describe': ['error', { max: 3 }],
            // Disable overly strict type-checking rules for test files
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off'
        }
    },
    {
        files: ['**/*.config.js', '**/*.config.cjs'],
        languageOptions: {
            globals: {
                module: 'readonly',
                require: 'readonly'
            }
        }
    }
)
