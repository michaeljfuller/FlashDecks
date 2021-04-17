const {CLIEngine} = require('eslint/lib/api');
const generateRuleTable = require('./generateRuleTable');

/** @var {function} htmlFormatter */
const htmlFormatter = CLIEngine.getFormatter("html");

/**
 * Generate a HTML file with lint results.
 * @param {LintResult[]} results  - Test results.
 * @param {object} data.rulesMeta - Dictionary containing metadata for each rule executed by the analysis.
 * @return {string}
 */
module.exports = function generateHtmlReport(results, data){
    // Sort by fewest errors first, followed by fewest warnings. 
    // Idea is that fewest errors are things actively being looked at.
    results = results.sort((a, b) => { // Negative => [a,b]; Positive => [b,a]; Zero => [?,?];
        // When comparing errors
        if (a.errorCount !== b.errorCount) {
            if (a.errorCount && b.errorCount) return a.errorCount - b.errorCount; // If both above 0, lowest at the top.
            return b.errorCount - a.errorCount; // If either is zero, put it at the bottom.
        }

        // When comparing warnings
        if (a.warningCount !== b.warningCount) {
            if (a.errorCount || b.errorCount) return a.warningCount - b.warningCount; // If either has errors, lowest at the top.
            if (a.warningCount && b.warningCount) return a.warningCount - b.warningCount; // If both above 0, lowest at the top.
            return b.warningCount - a.warningCount; // If either is zero, put it at the bottom.
        }

        // When comparing file paths
        return a.filePath > b.filePath ? 1 : -1; // Alphabetical ascending.
    });

    const ruleTable = generateRuleTable(results, data);
    return htmlFormatter(
        results, data
    ).replace('<table>', `
        <style>
            #rule-table th, #results-header th {
                cursor: default;
            }
            #results-header {
                margin-bottom: 0;
            }
            #results {
                margin-top: 0;
            }
        </style>
        ${ruleTable}
        <table id="results-header" style="margin-bottom: 0">
            <tr><th>Results</th></tr>
        </table>
        <table id="results">`,
    );
}
