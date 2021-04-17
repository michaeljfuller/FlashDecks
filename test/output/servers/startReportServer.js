const express = require('express');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const reload = require('reload');
const open = require('open');

const autoOpen = process.argv.indexOf('--open') >= 0;

/**
 * Start a server that serves html files and reloads on change.
 * @param {string} name            - Name to use in the console.
 * @param {string} targetDirectory - Directory report is located in.
 * @param {number} port            - Port to run on.
 * @param {number} reloadPort       - Port 'reload' runs on.
 * @param {function} [htmlInjector] - A function to inject HTML. Accepts HTML string and must return it.
 */
function startReportServer(name, targetDirectory, port, reloadPort, htmlInjector) {
    const app = express();
    app.set('port', port);
    const corsOptions = {
        origin: 'http://localhost:*'
    };

    // Routes
    app.get('/', (req, res) => res.send(getHtml(targetDirectory + '/index.html', htmlInjector)));
    app.get('/*.html', (req, res) => res.send(getHtml(targetDirectory + req.url, htmlInjector)));

    // Create server
    app.use(express.static(targetDirectory));
    app.use(cors(corsOptions)); // To enable CORS.
    app.options('*', cors(corsOptions)); // To enable CORS pre-flight checks for complex requests.
    const server = http.createServer(app);

    // Reload handler
    reload(app, { port: reloadPort}).then(function (reloadReturned) {

        // If the root index has changed, a new coverage report was generated.
        fs.watch(targetDirectory + '/index.html', (event, filename) => {
            console.log(`[${timeString()}] ${name} Updated.`);
            reloadReturned.reload();
        });

        // Reload started, start web server
        server.listen(port, function () {
            console.log(`${name} server listening on port ${port}.`);
            if (autoOpen) open(`http://localhost:${port}`);
        });

    }).catch(function (err) {
        console.error(`Reload could not start, could not start the ${name} server.`, err);
    });
}

/** Get an HTML file and inject the reload script */
function getHtml(filePath, htmlInjector) {
    // Load file
    let html = fs.readFileSync(filePath, 'utf8');
    html = html.replace(/\\/g, '/'); // TODO Non-hacky fix for slashes

    // Inject reload
    html = html.replace('<body>', '<body>\n<script src="/reload/reload.js"></script>');

    // Inject label
    const modifiedMs = fs.statSync(filePath).mtimeMs;
    const modifiedDate = new Date(modifiedMs);
    const label = `<div id="floating-info">
        <span style="color: red;"><strong>Created: </strong></span>
        <span style="color: blue;">${timeString(modifiedDate)} - ${dateString(modifiedDate)}</span>
        <span style="color: blueviolet;">(<span id="elapsed"></span>)</span>
    </div>`;
    html = html.replace('<body>', '<body>\n' + label);

    // Inject styles
    html = html.replace(
        '<head>',
        `<head>\n<style type="text/css">
                        @keyframes bodyFadeIn {
                          0% { opacity: 0; }
                          100% { opacity: 1; }
                        }
                        body { 
                            animation: 1s ease-out bodyFadeIn; 
                        }
                        #floating-info {
                            position: fixed; 
                            top: 0; 
                            right: 0; 
                            padding: 2px 4px; 
                            font-size: 9pt; 
                            background-color: lightgray; 
                            font-family: monospace;
                        }
                    </style>`
    );

    // Inject timer update
    html = html.replace('</body>',`
        <script>
            const elapsedField = document.getElementById('elapsed');
            const floatingInfo = document.getElementById('floating-info');
            function setElapsedTime() {
                var milliseconds = Date.now() - Math.floor(${modifiedMs});
                var seconds = Math.floor(milliseconds / 1000);
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);
                elapsedField.innerText = [
                    days ? days + 'd' : '',
                    hours ? ((hours % 24) + 'h').padStart(3, '0') : '',
                    minutes ? ((minutes % 60) + 'm').padStart(3, '0') : '',
                    ((seconds % 60) + 's').padStart(3, '0')
                ].filter(v => v).join(' ');
                const grey = 200;
                const r = Math.max(255 - Math.floor(milliseconds / 350), grey);
                const g = grey, b = grey;
                const backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                floatingInfo.style.setProperty('background-color', backgroundColor);
            }
            setInterval(setElapsedTime, 350);
            (function(){
                setElapsedTime();
            })()
        </script>
    </body>`);

    // Custom injector callback
    if (htmlInjector) {
        html = htmlInjector(html, filePath);
    }
    return html;
}

function dateString(date) {
    return date.toLocaleDateString('en-UK', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
}

function timeString(date) {
    if (!date) date = new Date(Date.now());
    return date.toLocaleTimeString('en-UK', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
}

module.exports = startReportServer;
