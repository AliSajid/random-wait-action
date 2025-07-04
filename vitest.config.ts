// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true, // So you don't need to import `describe`, `it`, etc.
        environment: 'node',
        coverage: {
            enabled: true,
            provider: 'v8', // Or 'c8'
            reporter: ['text', 'html', 'json', 'json-summary', 'lcov'],
            exclude: [
                '**/*.test.ts',
                '**/__tests__/**',
                'dist/',
                'eslint.config.mjs',
                'guide/',
                'lib',
                'node_modules',
                'node_modules/**',
                'rollup.config.ts',
                'src/main.ts',
                'dist/',
                'eslint.config.mjs',
                'rollup.config.ts',
                'vitest.config.ts',
                'guide/**'
            ]
        },
        testTimeout: 30000
    }
});
