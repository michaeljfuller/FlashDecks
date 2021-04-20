const { exec } = require('child_process');

function getUserPoolClientId() {
    const {auth} = require('../../amplify/backend/amplify-meta.json');
    const app = (auth && Object.values(auth).pop()) || {};
    const {AppClientIDWeb} = app.output || {};
    return AppClientIDWeb || '';
}

function getCurrentEnv() {
    return new Promise(resolve => {
        exec('amplify env list', (err, stdout, stderr) => {
            resolve((stdout || '').match(/\*\w+/)?.pop()?.substr(1) || ''); // "| *prod   |" -> "prod"
        });
    });
}

module.exports = {
    getUserPoolClientId,
    getCurrentEnv,
}
