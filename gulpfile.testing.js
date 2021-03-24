const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('reports', shellTask(`node test/output/servers/run-all.js`));

gulp.task('lint',     shellTask(`eslint src/**/*.ts src/**/*.tsx --config .eslintrc.js --format ./test/lint/eslint-formatter.js`));
gulp.task('lint:fix', shellTask(`eslint src/**/*.ts src/**/*.tsx --config .eslintrc.js --format ./test/lint/eslint-formatter.js --fix`));

gulp.task('test',           shellTask(`jest --coverage --coverageReporters=html text-summary`));
gulp.task('test:dev',       shellTask(`jest --watch`));
gulp.task('test:tdd',       shellTask(`jest --watch --notify`));
gulp.task('test:android',   shellTask(`jest --config="jest.config.android.js"`));
gulp.task('test:universal', shellTask(`jest --config="jest.config.universal.js"`));

gulp.task('coverage',           shellTask(`jest --coverage --silent --reporters="<rootDir>/test/jest/silent-report.js"`));
gulp.task('coverage:verbose',   shellTask(`jest --coverage --verbose`));
gulp.task('coverage:universal', shellTask(`jest --coverage --config="jest.config.universal.js"`));

gulp.task('debug:config', shellTask(`jest --showConfig`));
gulp.task('debug:test',   shellTask(`jest --runInBand --verbose --bail=1`));

function shellTask(command) {
    return () => {
        const task = shell.task(command);
        const promise = task();
        return promise.catch( error => { throw ShellTaskError(error.message); } );
    }
}
function ShellTaskError(msg) {
    Error.call(this);
    Error.prepareStackTrace = (err, stack) => msg;
}
