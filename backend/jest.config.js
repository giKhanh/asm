module.exports = {
    // Test environment
    testEnvironment: 'node',

    // Test file patterns
    testMatch: [
        '**/tests/**/*.test.js',
        '**/__tests__/**/*.js'
    ],

    // Coverage settings
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/app.js', // Exclude main app file
        '!src/config/database.js', // Exclude database connection
        '!**/node_modules/**'
    ],

    // Coverage thresholds for 80% target
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },

    // Coverage output
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],

    // Setup files
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

    // Clear mocks between tests
    clearMocks: true,

    // Verbose output
    verbose: true
};