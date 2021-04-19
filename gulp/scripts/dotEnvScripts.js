const color = require('../util/color');
const {updateEnvFile} = require('../util/dotEnvHelpers');

async function updateEnv() {
    return updateEnvFile().then(changed => {
        if (changed) console.log(`${color.FgYellow}%s${color.Reset}`, 'Updated .env file');
    });
}

module.exports = {
    updateEnv,
};
