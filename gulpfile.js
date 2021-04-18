const expo = require('./gulp/scripts/expoScripts');
const tests = require('./gulp/scripts/testScripts');
const amplify = require('./gulp/scripts/amplifyScripts');

const noopTask = () => Promise.resolve();

exports.default = noopTask; // Do nothing for now, so remote build doesn't fail, as this is in the Build Settings.

exports['start'] = expo.standard;
exports['start:prod'] = expo.prod;

exports['reports'] = tests.reports;

exports['amp:status'] = amplify.status;
exports['amp:print:auth:client_id'] = amplify.logUserPoolClientId;
exports['amp:api:compile'] = amplify.api.compile;
exports['amp:api:codegen'] = amplify.api.codegen;
exports['amp:console'] = amplify.console.dash;
exports['amp:console:api'] = amplify.console.api;
exports['amp:console:auth'] = amplify.console.auth;
exports['amp:push'] = amplify.push;
exports['amp:env:list'] = amplify.env.list;
exports['amp:env:pull'] = amplify.env.pull;
exports['amp:env:restore'] = amplify.env.restore;
exports['amp:env:current'] = amplify.env.logCurrent;
