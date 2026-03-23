module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./src/setupTests.js']
  };