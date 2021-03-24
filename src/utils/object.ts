/** Use the given partial, but fill in any missing with the given defaults. */
import {repeat} from "./array";

/** Create a new object based on the passed partial, with defaults and/or overrides. */
export function withDefaults<T>(
    partial: Partial<T>|null|undefined,
    defaults?: T|null,
    overrides?: Partial<T>|null
): T {
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
    const keys = Array.isArray(obj)
        ? repeat(obj.length, index => index as Key)
        : Object.keys(obj) as Key[];

    keys.forEach((originalKey, index) => {
        const originalValue: ValuesIn = obj[originalKey] as any;
        const {value, key, skip, descriptor} = callback(originalValue, originalKey, index);
        const keyOut: KeysOut = (key || originalKey) as any;
        if (!skip) {
            result[keyOut] = value;
            if (descriptor) Object.defineProperty(result, keyOut, descriptor);
        }
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
    key: keyof Target,
    index: number,
) => {
    value?: ValuesOut;
    key?: KeysOut;
    skip?: boolean;
    descriptor?: PropertyDescriptor;
};

/** A safe way of calling hasOwnProperty, now objects can have a different prototype via Object.create(). */
export function hasProperty(obj: Record<string, any>, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

export function isObject(obj: any, includeNull=true, includeUndefined=false): boolean {
    if (!includeNull && obj === null) return false;
    if (includeUndefined && obj === undefined) return true;
    return typeof obj === "object";
}
