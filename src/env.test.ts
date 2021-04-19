import * as env from './env';

jest.mock('expo-constants', () => ({
   manifest: {
      extra: {
         isTest: true,
         backendBranch: 'Backend Branch',
         frontendBranch: 'Frontend Branch',
         frontendCommit: 'Frontend Commit',
         sampleUsername: 'Sample Username',
         samplePassword: 'Sample Password',
         showSampleCredentials: true,
      }
   },
}));

describe('env module', () => {
   it('has isTest', () => expect(env.isTest).toBe(true));
   it('has backendBranch', () => expect(env.backendBranch).toBe('Backend Branch'));
   it('has frontendBranch', () => expect(env.frontendBranch).toBe('Frontend Branch'));
   it('has frontendCommit', () => expect(env.frontendCommit).toBe('Frontend Commit'));
   it('has sampleUsername', () => expect(env.sampleUsername).toBe('Sample Username'));
   it('has samplePassword', () => expect(env.samplePassword).toBe('Sample Password'));
   it('has showSampleCredentials', () => expect(env.showSampleCredentials).toBe(true));
});
