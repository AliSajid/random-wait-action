module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testTimeout: 30000,
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
}
