import * as platform from './platform';
import {objectToTypeMap} from "../test/test-utils";
import {PlatformType} from "./platform";

jest.mock('expo-constants', () => ({
    deviceName: 'test-deviceName',
}));
jest.mock('react-native', () => ({
    Platform: { OS: 'test-os' },
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
        expect(platform.platformOS).toBe('test-os');
        expect(platform.deviceName).toBe('test-deviceName');
        expect(platform.isPlatformWeb).toBe(false);
        expect(platform.isPlatformAndroid).toBe(false);
        expect(platform.isPlatformIos).toBe(false);
    });
});
