const shell = require('gulp-shell');
const {getUserPoolClientId, getCurrentEnv} = require('../util/amplifyHelpers');
const color = require('../util/color');

module.exports = {
    status: shell.task('amplify status'),
    logUserPoolClientId: cb => {
        console.log(
            `${color.FgYellow}%s${color.FgCyan}%s${color.Reset}`,
            'User Pool Client ID: ', getUserPoolClientId()
        );
        cb();
    },
    api: {
        compile: shell.task('amplify api gql-compile'),
        codegen: shell.task('amplify codegen'),
    },
    console: {
        dash: shell.task('amplify console'),
        api: shell.task('amplify api console'),
        auth: shell.task('amplify auth console'),
    },
    push: shell.task('amplify push'),
    env: {
        list: shell.task('amplify env list'), // Displays a list of all the environments in your Amplify project
        pull: shell.task('amplify pull'), // Pulls your environment with the current cloud environment.
        restore: shell.task('amplify pull --restore'), // Pulls your environment with the current cloud environment and overwrite your local backend configs.
        logCurrent: () => getCurrentEnv().then(name => {
            console.log(
                `${color.FgYellow}%s${color.FgCyan}%s${color.Reset}`,
                'Current Environment: ', name,
            );
        }),
    },
};
