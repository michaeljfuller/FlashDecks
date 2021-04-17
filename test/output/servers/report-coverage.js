const startReportServer = require('./startReportServer');
const {servers} = require('./server-configs');
const fs = require('fs');
const css = fs.readFileSync(__dirname + '/report-coverage.css', 'utf8');

startReportServer(
    servers.coverage.name,
    servers.coverage.reportDirectory,
    servers.coverage.port,
    servers.coverage.reloadPort,
    /** @param {string} html */
    (html) => html.replace(
        '<h1>',
        '<h1 style="font-size: 2em; margin-top: 6px;">Coverage Report</h1>\n<h1>'
    ).replace(
        '</head>',
        '<style type="text/css">\n' + css + '</style>\n</head>'
    )
);

