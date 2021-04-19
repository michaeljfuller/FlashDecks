import ExpoConstants from 'expo-constants';
// @link https://docs.expo.io/guides/environment-variables/
// Values from AWS Amplify environment variables on AWS builds, or from `.env` file for local builds.
export const {
    isTest=false,
    backendBranch='',
    frontendBranch='',
    frontendCommit='',
    sampleUsername='',
    samplePassword='',
    showSampleCredentials=false,
} = ExpoConstants?.manifest?.extra || {};


