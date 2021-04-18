const gulp = require('gulp');
const shell = require('gulp-shell');

function namedSeries(tasks) {
    return gulp.series(
        ...Object.keys(tasks).map( key => nameTask(tasks[key], key) )
    );
}

function nameTask(task, displayName) {
    if (typeof task === "string") task = shell.task(task);
    task.displayName = displayName;
    return task;
}

module.exports = {
    namedSeries,
    nameTask,
}
