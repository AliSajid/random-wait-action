// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['js', 'ts'],
    testTimeout: 30000,
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '__tests__',
        'jest.config.js',
        'jest.config.ts',
        'dist',
        'src/main.ts'
    ],
    verbose: true
}
