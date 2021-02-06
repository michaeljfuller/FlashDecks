export function fileFromImageData(dataUri: string): Blob {
    const {data, type} = parseDataUri(dataUri);
    return fileFromBase64(data, {type});
}
export function fileFromVideoData(dataUri: string): Blob {
    const {data, type} = parseDataUri(dataUri);
    return fileFromBase64(data, {type});
}

/** Extract data from a Data URI. */
function parseDataUri(dataUri: string): ParsedDataURI {
    // Split the dataUri string (e.g. "data:image/png;base64,AbCdEfG")
    const split = dataUri.split(";"); // e.g. ["data:image/png", "base64,AbCdEfG"]
    const type = split[0].split(":")[1]; // e.g. "image/png"
    const baseAndData = split[1].split(",", 2);
    const base64 = baseAndData.length === 2; // e.g. ["base64", "AbCdEfG"] -> true
    const data = baseAndData.pop() as string; // e.g. "AbCdEfG"

    return { type, data, base64 };
}
interface ParsedDataURI {
    data: string;
    type: string;
    base64: boolean;
}

/**
 * @param {string}          data        - The data to convert.
 * @param {BlobPropertyBag} [options]   - Options for creating the file.
 * @param {number}          [sliceSize] - Size of the chunks to process.
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 */
function fileFromBase64(data: string, options?: BlobPropertyBag, sliceSize = 512): Blob {
    const byteCharacters = atob(data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, options);
}
