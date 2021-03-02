import {GenericFunction} from "./function";

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

/** Returns a readable DataType value, or the type. */
export function getTypeOrValue(target: any, maxValueLength=0): ReturnType<typeof getType>|string {
    maxValueLength = Math.max(0, maxValueLength);
    const type = getType(target);
    let value: string = type;
    switch (type) {
        case "string":
            if (maxValueLength && (target as string).length+2 > maxValueLength) {
                value = `'${(target as string).substr(0, maxValueLength-3)}…'`;
            } else {
                value = `'${target}'`;
            }
            break;
        case "number":
            value = (target as number).toString(10);
            if (maxValueLength && value.length > maxValueLength) {
                const [integer] = value.split('.', 2);
                const exponent = `e+${integer.length-1}`;
                const fractionDigits = maxValueLength-exponent.length;
                value = (target as number).toExponential(fractionDigits);
            }
            break;
        case "boolean":
            value = target ? 'true' : 'false';
            break;
    }
    return value;
}

export function isClass(target: any): boolean {
    return (typeof target === "function") && target.prototype?.constructor?.name;
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
export type PickKeysWithType<
    Target extends object, Type
> = keyof PickValuesWithType<Target, Type>;

/** Type which is a union of keys to the passed Target's methods. */
export type MethodKey<
    Target extends object
> = PickKeysWithType<Target, GenericFunction>;

/** Method based on the passed Type and Key. */
export type MethodFromClassAndKey<
    Target extends object,
    Key extends MethodKey<Target>
> = Target[Key];

/**
 * Omit the first type from a tuple. Works well with OmitFirst<Parameters<MyFunction>>
 * @link https://stackoverflow.com/questions/55344670/remove-item-from-inferred-parameters-tuple/55344772#55344772
 */
export type OmitFirst<Tuple extends any[]> = (
    (...types: Tuple) => void // Redefine Tuple as function parameters
) extends (
    (first: infer First, ...rest: infer Rest) => void // Extract the Rest type
) ? Rest : never; // Conditional type of either Rest or never, so only Rest is returned.
