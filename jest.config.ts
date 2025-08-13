import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  globalSetup: '<rootDir>/src/__tests__/globalSetup.ts',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app.ts',
    'src/routes/**/*.ts',
    'src/controllers/**/*.ts',
    'src/validators/**/*.ts',
    '!src/server.ts',
    '!src/scripts/**',
    '!src/drizzle/**',
    '!src/db.ts',
    '!src/middleware/**',
    '!src/utils/**',
    'src/services/**' 
  ],
  coverageThreshold: {
    global: { statements: 100, branches: 100, functions: 100, lines: 100 }
  }
};

export default config;
