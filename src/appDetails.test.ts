import * as appDetails from './appDetails';
jest.mock('expo-constants');

describe('appDetails module', () => {
   it('has appName', () => expect(appDetails.appName).toBe('mock-name'));
   it('has version', () => expect(appDetails.version).toBe('mock-version'));
   it('has description', () => expect(appDetails.description).toBe('mock-description'));
});

