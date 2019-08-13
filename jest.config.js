module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  moduleFileExtensions: ['js', 'jsx', 'json'],
  bail: 1,
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native)'],
  testPathIgnorePatterns: ['<rootDir>/tests'],
  collectCoverageFrom: ["src/**/*.js"]
};
