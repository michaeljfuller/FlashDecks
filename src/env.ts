// @ts-ignore
import { ENVIRONMENT_NAME, TESTUSER_USERNAME, TESTUSER_PASSWORD, USER_BRANCH } from 'react-native-dotenv';

// Environment details
export const isTest = window.process?.env?.NODE_ENV === 'test';
export const envName: string = (isTest ? 'test-' : '') + (ENVIRONMENT_NAME || 'unknown');
export const branchName: string = USER_BRANCH || 'unknown'; // AWS Amplify Environment Variable (i.e. "dev" | "prod")
export const isProduction = envName.toLowerCase() === 'production';

export const testUsername: string = TESTUSER_USERNAME || '';
export const testPassword: string = TESTUSER_PASSWORD || '';

// console.log('env', { ENVIRONMENT_NAME, TESTUSER_USERNAME, TESTUSER_PASSWORD });
