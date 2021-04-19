const fs = require("fs");

//<editor-fold desc="Env Helpers">

// Read constants from .env file
const envFile = {};
try {
  fs.readFileSync(".env", 'utf8').split("\n").filter(s => s).forEach(line => {
    const [key, value=''] = line.split("=", 2);
    envFile[key] = value.trim();
  });
} catch(e) {}

// Get constant from environment variable, or .env file.
const getEnvVar = name => process.env[name] || envFile[name] || '';

//</editor-fold>
//<editor-fold desc="Environment Variables">

const isTest = process.env.NODE_ENV === 'test';

const backendBranch  = getEnvVar('USER_BRANCH'); // Backend Environment (i.e. "dev" | "prod")
const frontendBranch = getEnvVar('AWS_BRANCH'); // Frontend Environment (i.e. "dev" | "master")
const frontendCommit = getEnvVar('AWS_COMMIT_ID').substr(0, 7); // Frontend commit - Short hash

const sampleUsername = getEnvVar('SAMPLE_USER_NAME');
const samplePassword = getEnvVar('SAMPLE_USER_PASS');
const showSampleCredentials = Boolean(sampleUsername && samplePassword);

//</editor-fold>

export default {
  "name": "FlashDecks",
  "slug": "FlashDecks",
  "scheme": "fdecks",
  "description": "An app for creating and sharing flash cards.",
  "platforms": [ "android", "web" ],
  "version": "1.0.0",
  "orientation": "default",
  "icon": "./assets/icon.png",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#eeeeee"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "android": {
    "package": "io.github.michaeljfuller.flashdecks",
    "versionCode": 1
  },
  extra: {
    isTest,
    backendBranch,
    frontendBranch,
    frontendCommit,
    sampleUsername,
    samplePassword,
    showSampleCredentials,
  },
};
