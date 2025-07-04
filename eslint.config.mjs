// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        ignores: [
            'dist/',
            'lib/',
            '*.config.[tj]s',
            'guide/'
        ]
    },
    {
        files: ['*.ts'],
        languageOptions: {
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
    }
);
