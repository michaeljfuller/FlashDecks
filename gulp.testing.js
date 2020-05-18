const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('lint',     shellTask(`eslint src/**/*.ts src/**/*.tsx --config .eslintrc.js`));
gulp.task('lint:fix', shell.task(`eslint src/**/*.ts src/**/*.tsx --config .eslintrc.js --fix`));

gulp.task('test', shell.task(`jest --coverage --coverageReporters=html text-summary`));
gulp.task('test:dev', shell.task(`jest --watch`));
gulp.task('test:tdd', shell.task(`jest --watch --notify`));
gulp.task('test:android', shell.task(`jest --config="jest.config.android.js"`));
gulp.task('test:universal', shell.task(`jest --config="jest.config.universal.js"`));

gulp.task('coverage', shell.task(`jest --coverage --silent --reporters="<rootDir>/test/jest/silent-report.js"`));
gulp.task('coverage:verbose', shell.task(`jest --coverage`));
gulp.task('coverage:universal', shell.task(`jest --coverage --config="jest.config.universal.js"`));

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
