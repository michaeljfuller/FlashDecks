import * as platform from './platform';
jest.mock('react-native', () => ({
    Platform: { OS: 'android' },
}));

describe('platform module (android)', () => {
    it('has properties in the expected values', () => {
        expect(platform.platformOS).toBe('android');
        expect(platform.isPlatformWeb).toBe(false);
        expect(platform.isPlatformAndroid).toBe(true);
        expect(platform.isPlatformIos).toBe(false);
    });
});
