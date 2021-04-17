import * as appDetails from './appDetails';

jest.mock('expo-constants', () => ({
   manifest: {
      name: 'test-name',
      version: 'test-version',
      description: 'test-description',
   },
}));

describe('appDetails module', () => {
   it('has appName', () => expect(appDetails.appName).toBe('test-name'));
   it('has version', () => expect(appDetails.version).toBe('test-version'));
   it('has description', () => expect(appDetails.description).toBe('test-description'));
});
