/**
 * Resolves/rejects from the callback, after the set duration.
 */
export function delayedPromise<T>(
    callback: (() => T),
    duration = 500
): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let result;
            try {
                result = callback();
            } catch (e) {
                reject(e);
            }
            resolve(result);
        }, duration);
    });
}
