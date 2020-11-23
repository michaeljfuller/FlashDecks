const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('start', shell.task('npm start'));
gulp.task('start:prod', shell.task('npm run start:prod'));

gulp.task('reports', shell.task('node test/output/servers/run-all.js'));

gulp.task('amp:status', shell.task('amplify status'));
gulp.task('amp:print:auth:client_id', logUserPoolClientId);
gulp.task('amp:api:compile', shell.task('amplify api gql-compile'));
gulp.task('amp:api:codegen', shell.task('amplify codegen'));

gulp.task('amp:console', shell.task('amplify console'));
gulp.task('amp:console:api', shell.task('amplify api console'));
gulp.task('amp:console:auth', shell.task('amplify auth console'));

gulp.task('amp:push', shell.task('amplify push'));

gulp.task('amp:env:list', shell.task('amplify env list')); // Displays a list of all the environments in your Amplify project
gulp.task('amp:env:pull', shell.task('amplify pull')); // Pulls your environment with the current cloud environment.
gulp.task('amp:env:pull:initial', shell.task('amplify env checkout initial')); // Moves your environment to "initial".
gulp.task('amp:env:restore', shell.task('amplify pull --restore')); // Pulls your environment with the current cloud environment and overwrite your local backend configs.
gulp.task('amp:env:restore:initial', shell.task('amplify env checkout initial')); // Moves your environment to "initial" and overwrite your local backend configs.

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
