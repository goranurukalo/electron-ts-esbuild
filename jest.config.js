module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'output/jest',
  moduleDirectories: ['node_modules', 'src'],
};