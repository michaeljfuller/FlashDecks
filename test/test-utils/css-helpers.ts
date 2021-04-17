/** Get computed styles for the passed element. */
export function getStylesFor(element: HTMLElement) {
    const {ownerDocument} = element;
    if (!ownerDocument) throw new Error("No ownerDocument");
    if (!ownerDocument.defaultView) throw new Error("No ownerDocument.defaultView");
    return ownerDocument.defaultView.getComputedStyle(element);
}

/** Get an array of key-value pairs of styles for the passed element. */
export function getStylesArrayFor(element: HTMLElement): Array<[string, string]> {
    const styles = getStylesFor(element);
    const result: Array<[string, string]> = [];
    for (let i=0; i < styles.length; i++) {
        const style = styles.item(i);
        if (style) {
            result.push([
                style,
                styles.getPropertyValue(style)
            ]);
        }
    }
    return result;
}

/** Log computed styles styles for the passed element. */
export function logStylesFor(
    element: HTMLElement,
    options?: LogStylesForOptions,
) {
    const {
        logElement=true,
    } = options || {}

    if (logElement) {
        process.stdout.write(
            "\nStyles for \x1b[36m" +
            element.outerHTML.split(">", 2)[0] + ">" +
            "\x1b[0m:\n"
        );
    }
    getStylesArrayFor(element).forEach(([style, value]) => {
        process.stdout.write("  \x1b[33m" + style + ": \x1b[32m"+ value + "\x1b[0m\n");
    });
}

interface LogStylesForOptions {
    logElement?: boolean;
}
