const config = require('./jest.config');
config.preset = 'jest-expo/universal'; // https://www.npmjs.com/package/jest-expo#platforms

config.reporters.forEach(reporter => {
    if (Array.isArray(reporter)) {
        var [path, config] = reporter;

        // Modify jest-html-reporter
        if (path === "./node_modules/jest-html-reporter") {
            config.pageTitle = "Test Report (Universal)";
        }
    }
    return reporter;
});

module.exports = config;
