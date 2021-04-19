const Metro = require('metro');

async function getConfig() {
    return await Metro.loadConfig();
}

module.exports = {
    getConfig,
};
