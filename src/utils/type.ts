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