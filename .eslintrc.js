module.exports = {
    env: {
        "browser": true,
        "es6": true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint"
    ],
    settings: {
        react: { // https://github.com/yannickcr/eslint-plugin-react#configuration
            version: "detect"
        }
    },
    ignorePatterns: [
        "*.test.*",
        "**/__mocks__/*",
        "**/graphql/*"
    ],
    rules: { // https://eslint.org/docs/user-guide/configuring#configuring-rules
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#extension-rules

        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/interface-name-prefix.md
        '@typescript-eslint/interface-name-prefix': 'off',

        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules/camelcase.md
        '@typescript-eslint/camelcase': ["error", {
            allow: ["_"]
        }],

        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
        '@typescript-eslint/no-use-before-define': ["error", {
            functions: false, // Hoisted
            classes: true,    // Not hoisted
            variables: false, // Time consuming and not needed if not using 'var'
        }],
        'no-var': "warn",

        // https://github.com/typescript-eslint/typescript-eslint/blob/v2.21.0/packages/eslint-plugin/docs/rules/no-empty-function.md
        '@typescript-eslint/no-empty-function': "off",

        // https://github.com/typescript-eslint/typescript-eslint/blob/v2.21.0/packages/eslint-plugin/docs/rules/no-empty-interface.md
        '@typescript-eslint/no-empty-interface': "off",

        // https://github.com/typescript-eslint/typescript-eslint/blob/v2.21.0/packages/eslint-plugin/docs/rules/no-unused-vars.md
        '@typescript-eslint/no-unused-vars': ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "React"
        }],

        // https://github.com/typescript-eslint/typescript-eslint/blob/v2.21.0/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
        '@typescript-eslint/explicit-function-return-type': 'off',

        // https://github.com/typescript-eslint/typescript-eslint/blob/v2.21.0/packages/eslint-plugin/docs/rules/no-explicit-any.md
        '@typescript-eslint/no-explicit-any': 'off',

        // https://github.com/typescript-eslint/typescript-eslint/blob/v2.26.0/packages/eslint-plugin/docs/rules/ban-ts-ignore.md
        '@typescript-eslint/ban-ts-ignore': 'off',

        // https://reactjs.org/docs/hooks-rules.html
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    }
};
