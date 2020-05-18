const startReportServer = require('./startReportServer');
const {servers} = require('./server-configs');
const fs = require('fs');
const css = fs.readFileSync(__dirname + '/report-lint.css', 'utf8');

startReportServer(
    servers.lint.name,
    servers.lint.reportDirectory,
    servers.lint.port,
    servers.lint.reloadPort,
    /** @param {string} html */
    (html) => html.replace(
        '</head>',
        '<style type="text/css">\n' + css + '</style>\n</head>'
    )
);

