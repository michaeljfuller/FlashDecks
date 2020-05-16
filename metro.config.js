// Blacklist is a function that takes an array of RegExes and combines them with the default blacklist to return a single RegEx.
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
    resolver: {
        blacklistRE: blacklist([
            /dist\/.*/,
            /amplify\/.*/
        ])
    }
};
