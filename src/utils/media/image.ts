import {Image} from "react-native";

/**
 * Preload an image - load the data and size.
 */
export async function preloadImage(uri: string, key?: string) {
    key = key || uri;
    try {
        await Image.prefetch(uri);
        await getImageSize(uri, key);
    } catch (e) {
        console.warn('preloadImage', e);
    }
}

/** Get the size of an image - cached or otherwise. */
export async function getImageSize(uri: string, key?: string): Promise<Readonly<ImageSize>> {
    key = key || uri;
    const cached = getCachedImageSize(key);
    if (cached) return cached;
    try {
        return preloadedImageSizes[key] = await _getImageSize(uri);
    } catch (error) {
        return { width: 0, height: 0, error };
    }
}

/** Promisify Image.getSize() */
async function _getImageSize(uri: string): Promise<{ width: number; height: number }> {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
        Image.getSize(
            uri,
            (width, height) => resolve({ width, height }),
            (error: any) => error && reject(error)
        );
    });
}

export interface ImageSize {
    width: number;
    height: number;
    error?: any;
}

/** Cached image sizes */
const preloadedImageSizes: Record<string, ImageSize> = {};

/** Immediately get the cached image size */
export function getCachedImageSize(key: string): Readonly<ImageSize>|undefined {
    const cached = preloadedImageSizes[key];
    return cached ? { ...cached } : undefined;
}
