import {Image} from "react-native";
import {Observable, of} from "rxjs";

/** Preload an image - load the data and size. */
export function preloadImage(uri: string, key?: string): Observable<ImageSize> {
    key = key || uri;
    return new Observable<ImageSize>(subscriber => {
        (Image.prefetch(uri) as Promise<boolean>).then(
            () => getImageSize(uri, key).subscribe(subscriber),
            error => subscriber.error(error),
        );
    });
}

/** Get the size of an image - cached or otherwise. */
export function getImageSize(uri: string, key?: string): Observable<ImageSize> {
    key = key || uri;
    const cached = getCachedImageSize(key);
    if (cached) return of(cached);

    return new Observable<Readonly<ImageSize>>(subscriber => {
        Image.getSize(
            uri,
            (width, height) => {
                subscriber.next({width, height});
                subscriber.complete();
            },
            error => subscriber.error(error),
        );
    });
}

export interface ImageSize {
    readonly width: number;
    readonly height: number;
}

/** Cached image sizes */
const preloadedImageSizes: Record<string, ImageSize> = {};

/** Immediately get the cached image size */
export function getCachedImageSize(key: string): ImageSize|undefined {
    const cached = preloadedImageSizes[key];
    return cached ? { ...cached } : undefined;
}
