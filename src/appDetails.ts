import ExpoConstants from 'expo-constants';
const { manifest } = ExpoConstants || {};

// App details
export const { version = 'unknown', description = '' } = manifest || {};
export const appName: string = (manifest && manifest.name) || 'unknown';
