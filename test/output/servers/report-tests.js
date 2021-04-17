const startReportServer = require('./startReportServer');
const {servers} = require('./server-configs');
const fs = require('fs');
const css = fs.readFileSync(__dirname + '/report-test.css', 'utf8');

startReportServer(
    servers.test.name,
    servers.test.reportDirectory,
    servers.test.port,
    servers.test.reloadPort,
    /** @param {string} html */
    (html) => html.replace(
        '</head>',
        '<style type="text/css">\n' + css + '</style>\n</head>'
    )
);
