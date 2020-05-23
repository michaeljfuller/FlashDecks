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
    setupFiles: ['./test/jest/setupJest.js'],
    globals: Object.assign({
            window: {}
        },
        parseEnvFile(__dirname + '/.env.development') // use same version used on watch re-run
    )
};

/**
 * Convert env file into an object.
 */
function parseEnvFile(path) {
    const result = {};
    const text = require('fs').readFileSync(path, 'utf8');
    const lines = text.split('\n').filter(s => s);
    lines.forEach(line => {
        const [key, value] = line.split('=', 2);
        result[key] = value.trim();
    });
    return result;
}
