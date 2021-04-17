export function getErrorText(e: Error|string|unknown, defaultText = ''): string {
    if (e instanceof Error) return e.message;
    if (typeof e === 'string') return e;

    if (e && typeof e === "object") {
        const obj = e as any;
        // If it contains an 'errors' array (i.e. GraphQL error), recursive call.
        if (Array.isArray(obj.errors)) {
            const errors: any[] = obj.errors;
            return errors.map(
                err => getErrorText(err)
            ).filter(v => v).join(' ');
        }
        // If it contains a 'message' string (i.e. GraphQL error), return
        if (typeof obj.message === 'string') return obj.message as string;
    }

    return defaultText
}
export function getErrorName(e: Error|string|unknown, defaultTitle = 'Error'): string {
    return (e instanceof Error && e.name) || defaultTitle;
}

export function validUrl(url?: string): boolean {
    return Boolean(url && urlRegex.test(url));
}
/// @link https://stackoverflow.com/a/5717133/15316701
const urlRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$','i') // fragment locator
;

export function capitalise(string: string): string {
    return string.substr(0, 1).toUpperCase() + string.substr(1);
}

export function removeWhitespace(str: string): string {
    return str.replace(/\s/g, '');
}

type StringifyParam = Parameters<JSON['stringify']>;
/** Return the result of JSON.stringify, or defaultValue if it fails (e.g. due to cyclical references). */
export function safeJsonStringify<T>(
    value: StringifyParam[0],
    defaultValue: T,
    replacer?: StringifyParam[1],
    space?: StringifyParam[2]
): string|T {
    try {
        return JSON.stringify(value, replacer, space);
    } catch (e) {
        return defaultValue;
    }
}

/** Add padding to the left of a number if it's under the defined number of digits. */
export function padNumber(number: number, integers = 4, decimals = 0, padding='0'): string {
    let [integerStr, decimalStr] = number.toString(10).split('.', 2);
    integerStr = integerStr.padStart(integers, padding);
    if (decimals > 0) decimalStr = (decimalStr||'').padEnd(decimals, padding);
    return !decimalStr ? integerStr : integerStr + '.' + decimalStr;
}

/** Convert a string to kebab-case. */
export function toKebabCase(string: string): string {
    return string.replace(
        /\s+/g,  // Replace whitespace
        '-'      // with a dash.
    ).replace(
        /([a-z])([A-Z])/g,  // Replace a lower case character going to an upper case character
        "$1-$2"             // with both the characters with a dash between them.
    ).toLowerCase();
}

// /** Split a string in two, at the given index. */
// export function divideString(str: string, index: number): [string, string] {
//     return [str.slice(0, index), str.slice(index)];
// }
//
// /** Insert a string at the give index. */
// export function insertString(original: string, index: number, addition: string): string {
//     const [start, end] = divideString(original, index);
//     return start + addition + end;
// }
