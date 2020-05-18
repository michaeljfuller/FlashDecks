// https://jestjs.io/docs/en/configuration

/** @type {object} */
const defaults = require('jest-config').defaults;

module.exports = {
    preset: 'jest-expo/web',
    coverageDirectory: './test/output/reports/coverage',
    coveragePathIgnorePatterns: defaults.coveragePathIgnorePatterns.concat([
        ".mock.", 'amplify/'
    ]),
    coverageReporters: ["html", "text", "text-summary"],
    collectCoverageFrom: [
        './src/*.{ts,tsx,js,jsx}',
        './src/**/*.{ts,tsx,js,jsx}'
    ],
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            pageTitle: "Test Report (Web)",
            outputPath: './test/output/reports/unit-test/index.html',
            includeFailureMsg: true,
            includeConsoleLog: true,
            sort: "status"
        }]
    ],
    notifyMode: 'failure-change',
    setupFiles: ['./test/jest/setupJest.js']
};
