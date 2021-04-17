// @ts-ignore
import { SAMPLE_USER_NAME, SAMPLE_USER_PASS, USER_BRANCH, AWS_BRANCH, AWS_COMMIT_ID } from 'react-native-dotenv';

// Values from AWS Amplify environment variables on AWS builds, or from `.env` file for local builds.
export const isTest = window.process?.env?.NODE_ENV === 'test';
export const backendBranch: string = USER_BRANCH || ''; // Backend Environment (i.e. "dev" | "prod")
export const frontendBranch: string = AWS_BRANCH || ''; // The branch name of the current build (i.e. main, develop, beta, v2.0)
export const commitId: string = ((AWS_COMMIT_ID || '') as string).substr(0, 7); // Short hash

export const sampleUsername: string = SAMPLE_USER_NAME || '';
export const samplePassword: string = SAMPLE_USER_PASS || '';
export const showSampleCredentials = Boolean(sampleUsername && samplePassword);
