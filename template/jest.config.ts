/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@config(.*)$": "<rootDir>/config$1",
    "^@routes(.*)$": "<rootDir>/routes$1",
    "^@Middlewares(.*)$": "<rootDir>/app/Http/Middlewares$1",
    "^@Controllers(.*)$": "<rootDir>/app/Http/Controllers$1",
    "^@Exceptions(.*)$": "<rootDir>/app/Exceptions$1",
    "^@Requests(.*)$": "<rootDir>app/Http/Requests$1",
    "^@DTOs(.*)$":"<rootDir>/app/DTOs$1",
    "^@Services(.*)$": "<rootDir>/app/Http/Services$1",
    "^@Repositories(.*)$": "<rootDir>/app/Http/Repositories$1",
    "^@Models(.*)$": "<rootDir>/app/Models$1"
  },
  moduleFileExtensions: ['ts','js'],
  transformIgnorePatterns: ['/node_modules', '/.*/dist']
};