const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('amplify:status', shell.task('amplify status'));
gulp.task('amplify:print:auth:client_id', logUserPoolClientId);
gulp.task('amplify:api:compile', shell.task('amplify gql-compile'));

gulp.task('amplify:console', shell.task('amplify console'));
gulp.task('amplify:console:api', shell.task('amplify api console'));
gulp.task('amplify:console:auth', shell.task('amplify auth console'));

gulp.task('amplify:push', shell.task('amplify push'));

const color = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

function logUserPoolClientId(cb) {
  const {auth} = require('./amplify/backend/amplify-meta.json');
  const app = auth && Object.values(auth).pop();
  console.log(
    `${color.FgYellow}%s${color.FgCyan}%s${color.Reset}`,
    'User Pool Client ID: ',
    app && app.output.AppClientIDWeb,
  );
  cb();
}
