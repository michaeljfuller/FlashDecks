import * as platform from './platform';
import {objectToTypeMap} from "../test/test-utils";
import {PlatformType} from "./platform";

jest.mock('expo-constants');
jest.mock('react-native', () => ({
    Platform: { OS: 'web' }
}));

describe('platform module', () => {
    it('has the correct properties', () => {
        const typeMap = objectToTypeMap(platform);
        expect(typeMap).toEqual(objectToTypeMap({
            PlatformType,
            platformOS: '',
            deviceName: '',
            isPlatformWeb: true,
            isPlatformAndroid: true,
            isPlatformIos: true
        }));
    });
    it('has properties in the expected values', () => {
        expect(platform.platformOS).toBe('web');
        expect(platform.deviceName).toBe('mock-deviceName');
        expect(platform.isPlatformWeb).toBe(true);
        expect(platform.isPlatformAndroid).toBe(false);
        expect(platform.isPlatformIos).toBe(false);
    });
});
