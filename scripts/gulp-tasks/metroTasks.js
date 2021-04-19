
const {getConfig} = require('../util/metroHelpers');
const color = require('../util/color');

module.exports = {
    logConfig: async () => {
        const config = await getConfig();
        console.log(`${color.FgYellow}%s${color.FgCyan}`, 'Metro Config:');
        console.log(config);
        console.log(color.Reset);
    },
};
