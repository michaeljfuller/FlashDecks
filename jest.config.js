// https://jestjs.io/docs/en/configuration
const PRESET_DEFAULTS = require('jest-config').defaults;
// const PRESET_EXPO = require('jest-expo/jest-preset.js') // require('jest-expo/web/jest-preset.js')
const PRESETS = [ PRESET_DEFAULTS ];

module.exports = {
    preset: 'jest-expo/web',

    //<editor-fold desc="Transforms">

    transformIgnorePatterns: [
        `node_modules/(${[
            // Default
            "?!(jest-)?react-native",
            "react-clone-referenced-element",
            "@react-native-community",
            "expo(nent)?",
            "@expo(nent)?/.*",
            "react-navigation",
            "@react-navigation/.*",
            "@unimodules/.*",
            "unimodules",
            "sentry-expo",
            "native-base",
            "react-native-svg",
            "@sentry/.*",
            // Custom
            "@codler/.*"
        ].join("|")})`,
    ],
    moduleNameMapper: {
        "expo-constants": "<rootDir>/test/mocks/expo-constants.js",
        "\\.(css|less)$": "<rootDir>/test/mocks/MockStyle.js",
    },

    //</editor-fold>
    //<editor-fold desc="Reports">

    coverageDirectory: './test/output/reports/coverage',
    coveragePathIgnorePatterns: PRESET_DEFAULTS.coveragePathIgnorePatterns.concat([
        ".mock.",
        '/amplify/'
    ]),
    coverageReporters: ["html", "text", "text-summary"],
    collectCoverageFrom: [
        'src/*.{ts,tsx,js,jsx}',
        'src/**/*.{ts,tsx,js,jsx}',
    ],
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            pageTitle: "Test Report (Web)",
            outputPath: './test/output/reports/unit-test/index.html',
            includeFailureMsg: true,
            includeConsoleLog: true,
            sort: "status"
        }]
    ],

    //</editor-fold>
    //<editor-fold desc="Setup">

    setupFiles: extendPreset('setupFiles', [
        'react-native-gesture-handler/jestSetup.js',
        './test/jest/setupJest.js'
    ]),
    setupFilesAfterEnv: extendPreset('setupFilesAfterEnv', [
        "@testing-library/jest-native/extend-expect",
        './test/jest/setupJestAfterEnv.ts'
    ]),
    globals: Object.assign({
            window: {}
        },
        parseEnvFile(__dirname + '/.env.development') // use same version used on watch re-run
    ),

    //</editor-fold>
};

// logModule("JEST CONFIG", module.exports);

//<editor-fold desc="Helpers">

/**
 * Log the contents of the module.
 * @param {string} name     - The name of the module.
 * @param {object} [module] - The module data. Of not passed, use require(name).
 */
function logModule(name, module) {
    try {
        module = module || require(name);
        console.log(name, JSON.stringify(module, null, 4));
    } catch (e) {
        console.error("[ERROR]", name, e.message ? ":\n\t"+e.message : JSON.stringify(e, null, 4));
    }
    return module;
}

/** Return output of either Array.concat() or Object.assign() */
function extend(source, ...others) {
    if (Array.isArray(source)) {
        return source.concat(...others);
    }
    return Object.assign({}, source, ...others);
}

/** Return output of either Array.concat() or Object.assign() */
function extendPreset(name, extension) {
    const allValues = PRESETS.map(preset => preset[name]).concat(extension);
    const isArray = allValues.filter(
        value => value && typeof value === 'object'
    ).reduce(
        (total, current) => total || Array.isArray(current),
        null
    );
    if (isArray) {
        const result =  [].concat(...allValues).filter(v => v).filter(
            (item, index, array) => array.indexOf(item) === index // Remove duplicates
        );
        return result;
    }
    return Object.assign({}, ...allValues);
}

/**
 * Convert env file into an object.
 */
function parseEnvFile(path) {
    const result = {};
    const text = require('fs').readFileSync(path, 'utf8');
    const lines = text.split('\n').filter(s => s);
    lines.forEach(line => {
        const [key, value] = line.split('=', 2);
        result[key] = value.trim();
    });
    return result;
}

//</editor-fold>
