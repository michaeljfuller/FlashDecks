import {Image} from "react-native";

/**
 * Preload an image - load the data and size.
 */
export async function preloadImage(uri: string) {
    try {
        await Image.prefetch(uri);
        await getImageSize(uri);
    } catch (e) {
        console.warn('preloadImage', e);
    }
}

/** Get the size of an image - cached or otherwise. */
export async function getImageSize(uri: string): Promise<Readonly<ImageSize>> {
    const cached = getCachedImageSize(uri);
    if (cached) return cached;
    try {
        return preloadedImageSizes[uri] = await _getImageSize(uri);
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
export function getCachedImageSize(uri: string): Readonly<ImageSize>|undefined {
    const cached = preloadedImageSizes[uri];
    return cached ? { ...cached } : undefined;
}
