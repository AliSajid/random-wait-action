// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true, // So you don't need to import `describe`, `it`, etc.
        environment: 'node',
        coverage: {
            provider: 'v8', // Or 'c8'
            reporter: ['text', 'html', 'json']
        },
        testTimeout: 30000
    }
})
