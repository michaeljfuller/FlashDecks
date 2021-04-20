const fs = require('fs');
const {exec} = require('child_process');
const {getCurrentEnv} = require("./amplifyHelpers");

/**
 * Get the contents of the env file.
 * @param {string} path
 * @returns {string}
 */
const getEnvFile = (path) => {
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (e) {
        return "";
    }
}

/**
 * Get the contents of the env file as an object.
 * @param {string} path
 * @returns {object}
 */
const getEnvFileObject = (path) => {
    const result = {};
    getEnvFile(path).split("\n").filter(s => s).forEach(line => {
        const [key, value=''] = line.split("=", 2);
        result[key] = value.trim();
    });
    return result;
}

/**
 * Add/replace the key-value pair to the source.
 * @param {string} source
 * @param {string} key
 * @param {string} value
 * @returns {string}
 */
const updateEnvVar = (source, key, value) => {
    const replacement = key+"="+value;
    const regExp = new RegExp("^" + key + "=.*$", 'm');
    if (regExp.test(source)) { // If it exists, replace it
        return source.replace(regExp, replacement);
    } // Otherwise, add it.
    return source + "\n" + replacement;
}

/**
 * Return the current branch name.
 * @returns {Promise<string>}
 */
const getBranch = async () => new Promise(resolve => {
    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        resolve( (stdout || '').trim() );
    });
});

/**
 * Return the current commit hash.
 * @returns {Promise<string>}
 */
const getCommit = async () => new Promise(resolve => {
    exec('git rev-parse HEAD', (err, stdout, stderr) => {
        resolve( (stdout || '').trim()) ;
    });
});

/**
 * Update the values of discoverable variables.
 * @returns {Promise<boolean>} File changed.
 */
async function updateEnvFile() {
    const original = getEnvFile(".env");
    let env = original || getEnvFile(".env.template"); // Fall back on template
    env = updateEnvVar(env, "AWS_BRANCH", await getBranch());
    env = updateEnvVar(env, "AWS_COMMIT_ID", await getCommit());
    env = updateEnvVar(env, "USER_BRANCH", await getCurrentEnv());

    const changed = original.trim() !== env.trim();

    if (changed) {
        // Update .env file
        await new Promise((resolve, reject) => {
            fs.writeFile('.env', env, error => {
                if (error) reject(error);
                resolve();
            });
        });
        // Update the file importing .env, triggering a clean cache - BUT UNDONE WHEN CHANGE IS REMOVED
        await new Promise(((resolve, reject) => {
            fs.appendFile("src/env.ts", "\n", error => {
                if (error) reject(error);
                resolve();
            });
        }));
    }

    return changed;
}

module.exports = {
    getEnvFile,
    getEnvFileObject,
    updateEnvFile,
    updateEnvVar,
    getBranch,
    getCommit,
}
