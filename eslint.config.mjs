// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import jestPlugin from 'eslint-plugin-jest'
import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

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
            jest: jestPlugin,
            '@typescript-eslint': tseslint.plugin
        },

        languageOptions: {
            globals: {
                ...globals.node
            },

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
        // enable jest rules on test files
        files: ['__test__/**'],
        ...jestPlugin.configs['flat/recommended']
    }
)
