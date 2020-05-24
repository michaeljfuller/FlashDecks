const {spawn} = require('child_process');
const {servers} = require('./server-configs');

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const MAGENTA = "\x1b[35m";
const CYAN = "\x1b[36m";

const serverNameLengths = Object.values(servers).map(server => server.shortName.length);
const longestName = serverNameLengths.reduce((current, next) => Math.max(current, next));

run(servers.test.shortName, servers.test.file, CYAN);
run(servers.coverage.shortName, servers.coverage.file, MAGENTA);
run(servers.lint.shortName, servers.lint.file, YELLOW);
run(servers.combined.shortName, servers.combined.file, GREEN);
run(servers.runner.shortName, servers.runner.file, RED);
console.log('');

/**
 * @param {string} name
 * @param {string} file
 * @param {string} labelColor
 */
function run(name, file, labelColor) {
    const proc = spawn('node', [file], { shell: true, cwd: __dirname });
    const label = `[${name.padEnd(longestName, ' ')}]`;

    console.log(labelColor + label, `Starting ${file}...`);

    proc.stdout.on('data', (data) => {
        console.log(labelColor + '%s' + RESET, label, formatData(data, label.length + 1));
    });
    proc.stderr.on('data', (data) => {
        console.error(labelColor + '%s' + RED + '%s' + RESET, label, ' [ERROR]', formatData('\n' + data, 2));
    });
    proc.on('close', (code) => {
        console.log(labelColor + '%s' + (code ? RED : YELLOW), `[${name}]`, `Closed with code ${code}.`);
    });
}

function formatData(data, newlineIndentLength) {
    let str = data.toString();
    if (str.endsWith('\n')) str = str.substring(0, str.length-1); // Remove trailing line break
    const newLineIndent = ''.padEnd(newlineIndentLength, ' '); // Create indent string
    return str.replace(/\n/g, '\n' + newLineIndent); // Add an indent when there's a new line
}
