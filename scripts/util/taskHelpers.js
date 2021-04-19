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

function stripStackTrace(shellTask) {
    return () => {
        if (typeof shellTask === "string") shellTask = shell.task(shellTask);
        const promise = shellTask();
        return promise.catch( error => { throw ShellTaskError(error.message); } );
    };
}
function ShellTaskError(msg) {
    Error.call(this);
    Error.prepareStackTrace = (err, stack) => msg;
}

module.exports = {
    namedSeries,
    nameTask,
    stripStackTrace,
}
