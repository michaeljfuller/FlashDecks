const {CLIEngine} = require('eslint/lib/api');
const path = require("path");
const fs = require("fs")
const generateHtmlReport = require('./generateHtmlReport');

const RESET = "\x1b[0m";
const UNDERSCORE = "\x1b[4m"
const GREEN = "\x1b[32m";
const CYAN = "\x1b[36m";

/** @var {function} stylishFormatter */
const stylishFormatter = CLIEngine.getFormatter("stylish");

const reportsPath = path.resolve(process.cwd(), "test/output/reports");
ensureDirectoryExists(reportsPath);

/**
 * Run multiple formatters.
 * @param {LintResult[]} results  - Test results.
 * @param {object} data.rulesMeta - Dictionary containing metadata for each rule executed by the analysis.
 * @return {string}
 *
 * @link https://eslint.org/docs/developer-guide/working-with-custom-formatters
 */
module.exports = function(results, data) {
    console.log(`${GREEN}%s${RESET}`, '[Report Results]', `Checked ${results.length} files.`);

    // Write HTML report file
    const htmlReportPath = path.resolve(reportsPath, "lint/index.html");
    const htmlReport = generateHtmlReport(results, data);
    ensureDirectoryExists(path.dirname(htmlReportPath))
    fs.writeFileSync(htmlReportPath, htmlReport);
    console.log(`${GREEN}%s ${RESET}%s ${CYAN}${UNDERSCORE}%s${RESET}`,'[HTML Report]', 'Generated at', htmlReportPath);

    // return stylishFormatter(results, data);
    return '';

    // Output for debugging
    // return JSON.stringify(results, null,  2);
    // return JSON.stringify(data.rulesMeta, null,  2);
};

/**
 * If the directory doesn't exist - create it.
 * @param {string} path
 */
function ensureDirectoryExists(path) {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
}
