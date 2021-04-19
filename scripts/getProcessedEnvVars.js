const {getEnvFileObject} = require("./util/dotEnvHelpers");

/**
 * Get vars from environment variables or .env file.
 * @param {string} envFilePath
 * @returns {object}
 */
module.exports = function getProcessedEnvVars(envFilePath) {
    const envFile = getEnvFileObject(envFilePath);

    // Get constant from environment variable, or .env file.
    const getEnvVar = name => process.env[name] || envFile[name] || '';

    const isTest = process.env.NODE_ENV === 'test';

    const backendBranch  = getEnvVar('USER_BRANCH'); // Backend Environment (i.e. "dev" | "prod")
    const frontendBranch = getEnvVar('AWS_BRANCH'); // Frontend Environment (i.e. "dev" | "master")
    const frontendCommit = getEnvVar('AWS_COMMIT_ID').substr(0, 7); // Frontend commit - Short hash

    const sampleUsername = getEnvVar('SAMPLE_USER_NAME');
    const samplePassword = getEnvVar('SAMPLE_USER_PASS');
    const showSampleCredentials = Boolean(sampleUsername && samplePassword);

    return {
        isTest,
        backendBranch,
        frontendBranch,
        frontendCommit,
        sampleUsername,
        samplePassword,
        showSampleCredentials,
    };
}
