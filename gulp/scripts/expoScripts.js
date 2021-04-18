const shell = require('gulp-shell');
const {nameTask} = require('../util/taskHelpers');

module.exports = {
    standard: shell.task('npm start'),
    prod: shell.task('npm run start:prod'),

}
