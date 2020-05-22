/** Use the given partial, but fill in any missing with the given defaults. */
export function withDefaults<T>(partial: Partial<T>, defaults: T, overrides?: Partial<T>): T {
    return Object.assign({}, defaults, partial, overrides);
}
