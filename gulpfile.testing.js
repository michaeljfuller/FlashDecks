const tests = require('./gulp/scripts/testScripts');

exports.default = tests.reports;
exports['reports'] = tests.reports;

exports['lint'] = tests.lint.standard;
exports['lint:fix'] = tests.lint.fix;

exports['test'] = tests.unit.standard;
exports['test:dev'] = tests.unit.watch;
exports['test:tdd'] = tests.unit.notify;
exports['test:android'] = tests.unit.android;
exports['test:universal'] = tests.unit.universal;

exports['coverage'] = tests.coverage.standard;
exports['coverage:verbose'] = tests.coverage.verbose;
exports['coverage:universal'] = tests.coverage.universal;

exports['debug:config'] = tests.debug.jestConfig;
exports['debug:test'] = tests.debug.unitTest;
