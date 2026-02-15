// SPDX-FileCopyrightText: 2022 - 2026 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true, // So you don't need to import `describe`, `it`, etc.
        environment: 'node',
        coverage: {
            provider: 'v8', // Or 'c8'
            reporter: ['text', 'html', 'json', 'json-summary', 'lcov'],
            exclude: [
                'lib',
                'node_modules',
                'node_modules/**',
                'vitest.config.ts',
                '**/*.test.ts',
                '**/__tests__/**',
                'src/main.ts',
                'dist/',
                'eslint.config.mjs',
                'rollup.config.ts'
            ]
        },
        testTimeout: 30000
    }
})
