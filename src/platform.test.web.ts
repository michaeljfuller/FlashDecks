import * as platform from './platform';
jest.mock('react-native', () => ({
    Platform: { OS: 'web' },
}));

describe('platform module (web)', () => {
    it('has properties in the expected values', () => {
        expect(platform.platformOS).toBe('web');
        expect(platform.isPlatformWeb).toBe(true);
        expect(platform.isPlatformAndroid).toBe(false);
        expect(platform.isPlatformIos).toBe(false);
    });
});
