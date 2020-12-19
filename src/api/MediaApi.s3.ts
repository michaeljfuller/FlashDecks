import {ImageMimeType, VideoMimeType} from "../utils/MimeTypes";
import {Storage} from "aws-amplify";
import {logMethod} from "../utils/debugging/decorators/logMethod";
import {logger} from "../utils/debugging";

/**
 * Upload files to S3 bucket.
 */
export class S3Storage {

    /** Get a pre-signed URL of the file or the object data when download:true */
    get<
        Type = any,
        Options extends StorageGetOptions|undefined = undefined,
        Response = StorageGetResponse<Type, Options>
    >(
        key: string,
        options?: Options
    ): Promise<Response> {
        return Storage.get(key, options) as Promise<Response>;
    }

    /** Put a file in storage bucket specified to configure method */
    @logMethod()
    put(
        key: string,
        object: any,
        options?: StoragePutOptions
    ): Promise<StoragePutResponse> {
        return Storage.put(key, object, options).then(
            response => {
                logger.addLogRef(this).log(' put response', { key, object, response });
                return response as StoragePutResponse;
            },
            error => {
                logger.addLogRef(this).warning(' put response', { key, object, error });
                throw error;
            }
        );
    }

    /** Remove the object for specified key */
    remove(key: string, options?: StorageRemoveOptions): Promise<void> {
        return Storage.remove(key, options);
    }

    /** List bucket objects relative to the level and prefix specified */
    list(path: string, options?: StorageListOptions): Promise<string[]> {
        return Storage.list(path, options);
    }

}

const s3 = new S3Storage;
export default s3;

//<editor-fold desc="Types">

export type StorageLevel = 'private'|'protected'|'public';

export interface StoragePutOptions {
    level?: StorageLevel;
    contentType?: string|ImageMimeType|VideoMimeType;
    progressCallback?: StoragePutProgressCallback;
}
export type StoragePutProgressCallback = (progress: StoragePutProgress) => void;
export interface StoragePutProgress {
    loaded: number;
    total: number;
}

export interface StoragePutResponse {
    key: string;
}

export interface StorageGetOptions {
    level?: StorageLevel;
    download?: boolean;
}

/** Returns the file or the url, depending on the Options. */
export type StorageGetResponse<Type, Options> = Options extends {download: true} ? Type : string;

export interface StorageRemoveOptions {
    level?: StorageLevel;
}

export interface StorageListOptions {
    level?: StorageLevel;
    maxKeys?: number;
}

//</editor-fold>
