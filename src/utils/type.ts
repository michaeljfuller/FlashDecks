/** Return the class name, function name, the JS data type, or "null". */
export function getType(target: any): DataType | "null" | string {
    if (target === null) return "null";
    const type = typeof target;
    switch (type) {
        case "object":
            if (target?.constructor?.name) return target?.constructor?.name;
            break;
        case "function":
            if (isClass(target)) return `Class<${target.prototype.constructor.name}>`;
            if (target.name) return target.name;
            break;
    }
    return type;
}
export type DataType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

export function isClass(target: any): boolean {
    return (typeof target === "function") && typeof target.prototype?.constructor === "function";
}

/**
 * Creates a new type from Target, with only properties of type Type.
 * @example PickValuesWithType<{a: number; b: string; c: string}, string> // { b: string, c: string }
 */
export type PickValuesWithType<Target extends object, Type> = Pick<Target, {
    [K in keyof Target]: Target[K] extends Type ? K : never
}[keyof Target]>;

/**
 * Creates a union of keys from Target, where those keys only relate to properties of type Type.
 * @example PickKeysWithType<{a: number; b: string; c: string}, string> // "b"|"c"
 */
export type PickKeysWithType<Target extends object, Type> = keyof PickValuesWithType<Target, Type>;
