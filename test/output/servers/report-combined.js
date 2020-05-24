const express = require('express');
const fs = require('fs');
const open = require('open');
const {servers} = require('./server-configs');

const port = servers.combined.port;
const app = express();
app.set('port', port);

let html = fs.readFileSync(__filename.replace('.js', '.html'), 'utf8');
html = replacePlaceholder(html, 'TITLE', servers.combined.name);
html = replacePlaceholder(html, 'RUN_API', `http://localhost:${servers.runner.port}/run/`);
[servers.test, servers.coverage, servers.lint].forEach((server, index) => {
    html = replacePlaceholder(html, `PORT_${index+1}`, server.port);
    html = replacePlaceholder(html, `NAME_${index+1}`, server.shortName);
    html = replacePlaceholder(html, `SCRIPT_${index+1}`, server.npmScript);
});

/**
 * @param {string} source
 * @param {string} placeholder
 * @param {*} replacement
 * @return {string}
 */
function replacePlaceholder(source, placeholder, replacement){
    return source.replace(new RegExp('\\$\\(' + placeholder + '\\)', 'gm'), replacement);
}

app.get('/', (req, res) => res.send(html));

app.listen(port, () => {
    console.log(`${servers.combined.name} listening on port ${port}!`);
    open(`http://localhost:${port}`);
});

