/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  forceExit: true,
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/singleton.ts'],
};