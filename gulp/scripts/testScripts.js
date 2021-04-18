const shell = require('gulp-shell');

module.exports = {
    reports: shell.task('node test/output/servers/run-all.js'),
};
