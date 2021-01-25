import Model, {ModelUpdate} from "./core/Model";
import {fileFromImageData} from "../utils/file";
import {ApiCardSide} from "./CardSideModel";
import {CardSideContentType} from "../graphql/API";
import {v4 as uuid} from "uuid";

type _ApiCardContent = NonNullable<ApiCardSide["content"]>[0];
export interface ApiCardContent extends _ApiCardContent { // TODO Add `size` to API.
    // Fraction of the CardSide height. Total is able to exceed 1.00.
    // If set, content scales to fit size, otherwise no scaling is applied.
    size?: number;
}

export type CardContentType = 'Text' | 'Image' | 'Video' | 'Link' | undefined;
export const cardContentTypes: readonly Exclude<CardContentType, undefined>[] = ["Text", "Image", "Video", "Link"];
export type CardContentFormat = 'String' | 'S3Key' | 'ImageData' | 'VideoData' | 'LocalURI';
export const cardContentFormats: readonly CardContentFormat[] = ["String", "S3Key", "ImageData", "VideoData", "LocalURI"];

export class CardContentModel extends Model implements Omit<ApiCardContent, '__typename'|'type'> {
    readonly type: CardContentType = undefined;
    readonly value: string = '';
    readonly size: number = 0;
    readonly format: CardContentFormat = "String";

    static create(input: ModelUpdate<CardContentModel>) {
        return (new CardContentModel).update(input, false);
    }

    get valid(): boolean {
        return this.validType && this.validValue;
    }

    get validType(): boolean {
        return cardContentTypes.indexOf(this.type as any) >= 0;
    }

    get validValue(): boolean {
        return this.value.length > 0;
    }

    static fromApi(obj: ApiCardContent) {
        let format: CardContentFormat|undefined;
        if (obj.type === CardSideContentType.Image || obj.type === CardSideContentType.Video) {
            if (obj.value.startsWith('media/')) format = "S3Key";
        }
        return CardContentModel.create({
            size: obj.size,
            value: obj.value,
            type: obj.type as any,
            format,
        });
    }

    static generateKey(): string {
        return 'media/'+uuid();
    }

    asFile(): Blob|undefined {
        if (this.value) {
            switch (this.format) {
                case "ImageData": return fileFromImageData(this.value);
            }
        }
    }
}
