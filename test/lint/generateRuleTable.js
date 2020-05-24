const cwd = process.cwd();

/**
 * Create a table containing a list of rules broken.
 * @param {LintResult[]} results  - Test results.
 * @param {object} data.rulesMeta - Dictionary containing metadata for each rule executed by the analysis.
 * @return {string}
 */
module.exports = function generateRuleTable(results, data){
    // Map rule names with the number of times broken
    const rulesBroken = {};
    results.forEach(({filePath, messages}) => {
        messages.forEach(message => {
            const {ruleId, severity} = message;
            if (!rulesBroken[ruleId]) { // Create new entry
                rulesBroken[ruleId] = {count: 0, severity, messages: []};
            }
            const ruleBroken = rulesBroken[message.ruleId];
            ruleBroken.count++;
            ruleBroken.messages.push({ ...message, filePath });
        });
    });

    // For each rule broken, create a table row
    const dataRows = Object.keys(
        rulesBroken
    ).sort((ruleA, ruleB) => {
        // Sort by: severity (desc), count (desc) & name (asc)
        const severityA = rulesBroken[ruleA].severity, severityB = rulesBroken[ruleB].severity;
        const countA = rulesBroken[ruleA].count, countB = rulesBroken[ruleB].count;
        if (severityA !== severityB) return severityB - severityA;
        if (countA !== countB) return countB - countA;
        return ruleA > ruleB ? 1 : -1;
    }).map((name, index) => {
        // Create a row with information about the rule.
        const {count, severity, messages} = rulesBroken[name];
        const {category, description, url} = data.rulesMeta[name].docs;
        return ruleRow(`rule-${index}`, name, count, severity, category, description, url, messages);
    });

    if (dataRows.length === 0) return '';

    // HTML output
    return `
        <style>
            #rule-table [onclick] {
                cursor: pointer;
            }
            #rule-table tr.error td {
                color: #b94a48;
                background-color: #f2dede;
            }
            #rule-table tr.warning td {
                color: #f0ad4e;
                background-color: #fcf8e3;
            }
            #rule-table .rule-references {
                display: none;
            }
            #rule-table .rule-references.show {
                display: table-row;
            }
            #rule-table .rule-references > td {
                padding: 0;
            }
            #rule-table .rule-references th {
                border-bottom: 1px solid #ddd;
            }
        </style>
        <script>
            function toggleRowDetails(id) {
                const row = document.getElementById(id);
                if (row) row.classList.toggle('show');
            }
        </script>
        <table id="rule-table">
            <tr>
                <th>Rule</th>
                <th>Count</th>
                <th>Severity</th>
                <th>Category</th>
                <th>Description</th>
            </th>
            ${dataRows.join('\n')}
        </table>
    `;
}

/**
 * Create a row with information about the rule.
 * @param {string} ruleId
 * @param {string} name
 * @param {number} count
 * @param {number} severity
 * @param {string} category
 * @param {string} description
 * @param {string} url
 * @param {object[]} messages
 * @param {string}   messages[].message
 * @param {number}   messages[].line
 * @param {number}   messages[].column
 * @param {string}   messages[].nodeType
 * @return {string} HTML
 */
function ruleRow(ruleId, name, count, severity, category, description, url, messages) {
    const referenceRowId = `${ruleId}-refs`;

    const referenceRows = messages.map((
        {filePath, message, line, column}
    ) => {
        return `<tr>
            <td>${filePath.substr(cwd.length)}</td>
            <td>${line}:${column}</td>
            <td>${message}</td>
        </tr>`;
    });

    return `
        <tr class="${severity === 1 ? 'warning' : 'error'}" onclick="toggleRowDetails('${referenceRowId}')">
            <td><a href="${url}" target="_blank">${name}</a></td>
            <td>${count}</td>
            <td>${severity === 1 ? 'Warning' : 'Error'}</td>
            <td>${category}</td>
            <td>${capitalise(description)}</td>
        </tr>
        <tr id="${referenceRowId}" class="rule-references">
            <td colspan="5">
                <table>
                    <tr>
                        <th>File</th>
                        <th>Line:Column</th>
                        <th>Message</th>
                    </tr>
                    ${referenceRows.join('')}
                </table>
            </td>
        </tr>
    `;
}

/**
 * Capitalise the first character in the string
 * @param {string} str
 * @return {string}
 */
function capitalise(str) {
    if (str) str = str[0].toUpperCase() + str.slice(1);
    return str;
}
