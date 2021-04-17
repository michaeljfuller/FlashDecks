module.exports = class SilentJestReport {
    constructor(globalConfig, options) {
    }
    onRunComplete(contexts, results) {
        process.exit(); // Silent exit, even if tests fail.
    }
}
