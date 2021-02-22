// @ts-ignore
import { ENVIRONMENT_NAME, TESTUSER_USERNAME, TESTUSER_PASSWORD } from 'react-native-dotenv';

// Environment details
export const isTest = window.jest !== undefined;
export const envName: string = (isTest ? 'test-' : '') + (ENVIRONMENT_NAME || 'unknown');
export const isProduction = envName.toLowerCase() === 'production';

export const testUsername: string = TESTUSER_USERNAME || '';
export const testPassword: string = TESTUSER_PASSWORD || '';

// console.log('env', { ENVIRONMENT_NAME, TESTUSER_USERNAME, TESTUSER_PASSWORD });
