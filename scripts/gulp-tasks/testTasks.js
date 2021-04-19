const shell = require('gulp-shell');
const {stripStackTrace} = require('../util/taskHelpers');

module.exports = {
    reports: shell.task('node test/output/servers/run-all.js'),
    lint: {
        standard: stripStackTrace(`eslint src/**/*.ts src/**/*.tsx --config .eslintrc.js --format ./test/lint/eslint-formatter.js`),
        fix:      stripStackTrace(`eslint src/**/*.ts src/**/*.tsx --config .eslintrc.js --format ./test/lint/eslint-formatter.js --fix`),
    },
    unit: {
        standard:  stripStackTrace(`jest --coverage --coverageReporters=html text-summary`),
        android:   stripStackTrace(`jest --config="jest.config.android.js"`),
        universal: stripStackTrace(`jest --config="jest.config.universal.js"`),
        watch:     stripStackTrace(`jest --watch`),
        notify:    stripStackTrace(`jest --watch --notify`),
    },
    coverage: {
        standard:  stripStackTrace(`jest --coverage --silent --reporters="<rootDir>/test/jest/silent-report.js"`),
        verbose:   stripStackTrace(`jest --coverage --verbose`),
        universal: stripStackTrace(`jest --coverage --config="jest.config.universal.js"`),
    },
    debug: {
        jestConfig: stripStackTrace(`jest --showConfig`),
        unitTest: stripStackTrace(`jest --runInBand --verbose --bail=1`),
    }
};
