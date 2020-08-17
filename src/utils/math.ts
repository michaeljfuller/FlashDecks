/** Round a number to the given number of significant digits. */
export function roundTo(value: number, digits?: number): number {
    if (digits === undefined) {
        digits = value > 1 ? 2 : 4;
    }
    const modifier = Math.pow(10, digits);
    return Math.round((value||0) * modifier) / modifier;
}

/** Return value within the bounds of low + high */
export function minMax(value: number, low: number, high: number) {
    return Math.min(Math.max(value, low), high);
}

/** Return the passed value if it's a number, or the defaultValue. */
export function numberOrDefault<T>(value: any, defaultValue: T): number|T {
    if (typeof value === "number" && !Number.isNaN(value)) {
        return value;
    }
    return defaultValue;
}
