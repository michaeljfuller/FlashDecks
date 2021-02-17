import * as platform from './platform';
jest.mock('react-native', () => ({
    Platform: { OS: 'ios' },
}));

describe('platform module (ios)', () => {
    it('has properties in the expected values', () => {
        expect(platform.platformOS).toBe('ios');
        expect(platform.isPlatformWeb).toBe(false);
        expect(platform.isPlatformAndroid).toBe(false);
        expect(platform.isPlatformIos).toBe(true);
    });
});
