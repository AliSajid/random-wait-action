// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['js', 'ts'],
    setupFiles: ['./jest.setup.ts'],
    testTimeout: 30000,
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    verbose: true
}
