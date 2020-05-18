const path = require("path");
const fs = require("fs")

let nextPort = 4600;
const reportsDirectory = path.resolve(__dirname, '../reports');

const servers = {
    combined: {
        name: 'Combined Report',
        shortName: 'Combined',
        file: 'report-combined.js',
        port: nextPort++
    },
    runner: {
        name: 'Script Runner',
        shortName: 'S.Runner',
        file: 'script-runner.js',
        port: nextPort++
    },
    test: {
        name: 'UnitTest Report',
        shortName: 'UnitTest',
        file: 'report-tests.js',
        npmScript: 'test',
        port: nextPort++,
        reloadPort: nextPort++,
        reportDirectory: path.resolve(reportsDirectory, 'unit-test')
    },
    coverage: {
        name: 'Coverage Report',
        shortName: 'Coverage',
        file: 'report-coverage.js',
        npmScript: 'coverage',
        port: nextPort++,
        reloadPort: nextPort++,
        reportDirectory: path.resolve(reportsDirectory, 'coverage')
    },
    lint: {
        name: 'Lint Report',
        shortName: 'ESLinter',
        file: 'report-lint.js',
        npmScript: 'lint',
        port: nextPort++,
        reloadPort: nextPort++,
        reportDirectory: path.resolve(reportsDirectory, 'lint')
    }
}

// Ensure reports exist
ensureDirectoryExists(reportsDirectory);
Object.values(servers).filter(server => server.reportDirectory).forEach(server => {
    ensureDirectoryExists(server.reportDirectory);
    ensureFileExists(
        path.resolve(server.reportDirectory, 'index.html'), `
        <html>
            <head></head>
            <body>
                <p>${server.name} not generated yet.</p>
            </body>
        </html>
    `);
});

function ensureDirectoryExists(path) {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
}
function ensureFileExists(path, defaultContent) {
    if (!fs.existsSync(path)) fs.writeFileSync(path, defaultContent || '');
}

module.exports = {
    servers
};
