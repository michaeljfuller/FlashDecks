/**
 * Log a message, if enabled at this level.
 * @param {...string} messages
 */
function log(...messages) {
    //console.log(...messages);
}

/**
 * Log a message, if enabled at this level.
 * @param {...string} messages
 */
function error(...messages) {
    console.log(...messages);
}

/**
 * Log a message, if enabled at this level.
 * @param {...string} messages
 */
function warning(...messages) {
    console.log(...messages);
}

module.exports = {
    log, error, warning
};
