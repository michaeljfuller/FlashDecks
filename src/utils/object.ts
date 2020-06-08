/** Use the given partial, but fill in any missing with the given defaults. */
export function withDefaults<T>(partial: Partial<T>, defaults: T, overrides?: Partial<T>): T {
    return Object.assign({}, defaults, partial, overrides);
}

/** Map an object to a new object. */
export function mapToObject<
    Target,
    ValuesOut=any,
    KeysOut extends string|number|symbol = keyof Target,
    ValuesIn=any
>(
    obj: Target,
    callback: MapToObjectCallback<Target, ValuesOut, KeysOut, ValuesIn>
): Record<KeysOut, ValuesOut> {
    type Key = keyof Target;
    type Result = Record<KeysOut, ValuesOut>;

    const result: Partial<Result> = {};
    const keys = Object.keys(obj) as Key[];

    keys.forEach(originalKey => {
        const originalValue: ValuesIn = obj[originalKey] as any;
        const {value, key, skip} = callback(originalValue, originalKey);
        const keyOut: KeysOut = (key || originalKey) as any;
        if (!skip) result[keyOut] = value;
    });

    return result as Result;
}
export type MapToObjectCallback<
    Target,
    ValuesOut=any,
    KeysOut=keyof Target,
    ValuesIn=any
> = (
    value: ValuesIn,
    key?: keyof Target
) => {
    value: ValuesOut;
    key?: KeysOut;
    skip?: boolean;
};

/** A safe way of calling hasOwnProperty, now objects can have a different prototype via Object.create(). */
export function hasProperty(obj: Record<string, any>, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
