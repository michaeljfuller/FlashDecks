export function getErrorText(e: Error|string|unknown, defaultText = '') {
    if (e instanceof Error) return e.message;
    if (typeof e === 'string') return e;
    return defaultText
}
