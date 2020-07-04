const blacklist = require('metro-config/src/defaults/blacklist');

// Print default blacklistRE
// require('metro-config').getDefaultConfig().then(data => console.log('blacklistRE', data.resolver.blacklistRE));
// /(node_modules\\react\\dist\\.*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/,

module.exports = {
    resolver: {
        blacklistRE: blacklist([
            // Blacklist `amplify/#current-cloud-backend` because it duplicates `amplify/backend`.
            // Otherwise a "jest-haste-map: Haste module naming collision:" error is raised.
            /#current-cloud-backend\/.*/
        ]),
    },
};
