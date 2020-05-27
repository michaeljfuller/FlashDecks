import ExpoConstants from 'expo-constants';
import {Platform} from 'react-native';

export enum PlatformType {
    Default = 'default',
    Web = 'web',
    Android = 'android',
    iOS = 'ios',
}

// Platform & device
export const platformOS = Platform.OS;
export const isPlatformWeb = platformOS === PlatformType.Web;
export const isPlatformAndroid = platformOS === PlatformType.Android;
export const isPlatformIos = platformOS === PlatformType.iOS;
export const { deviceName = 'unknown' } = ExpoConstants || {};
