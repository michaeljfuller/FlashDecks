const blacklist = require('metro').createBlacklist;

module.exports = {
    resolver: {
        blacklistRE: blacklist([
            /#current-cloud-backend\/.*/ // Blacklist `amplify/#current-cloud-backend` because it duplicates `amplify/backend`.
        ]),
    },
};
