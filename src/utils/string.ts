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
