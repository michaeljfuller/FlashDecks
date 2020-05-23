const { exec } = require("child_process");
const express = require('express');
const cors = require('cors');
const http = require('http');
const {servers} = require('./server-configs');

process.chdir('../../..'); // From "./test/output/servers" to "./"

const app = express();
app.set('port', servers.runner.port);
const corsOptions = {};

app.get('/run/:cmd', (req, res) => {
    console.log(`Running ${req.params.cmd}...`);
    exec(`gulp --gulpfile ./gulpfile.testing.js ${req.params.cmd}`, (error, stdout, stderr) => {
        console.info(stdout);
        if (stderr) console.error(stderr);
        if (error && error.code) {
            console.error(error.message);
            console.info(`Task ${req.params.cmd} exited with code ${error.code}.`);
            res.status(500).send(`Task ${req.params.cmd} exited with code ${error.code}.`);
        } else {
            console.info(`Task ${req.params.cmd} succeeded.`);
            res.send(`Task ${req.params.cmd} succeeded.`);
        }
    });
});

app.use(cors(corsOptions)); // To enable CORS.
app.options('*', cors(corsOptions)); // To enable CORS pre-flight checks for complex requests.
const server = http.createServer(app);

server.listen(servers.runner.port, () => console.log(`${servers.runner.name} server listening on port ${servers.runner.port}.`));
