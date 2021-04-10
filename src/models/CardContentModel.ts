import Model, {ModelUpdate} from "./core/Model";
import {fileFromImageData, fileFromVideoData} from "../utils/file";
import {ApiCardSide} from "./CardSideModel";
import {CardSideContentType} from "../graphql/API";
import {v4 as uuid} from "uuid";
import {validUrl} from "../utils/string";

export type ApiCardContent = NonNullable<ApiCardSide["content"]>[0];
export const ApiCardContentType = CardSideContentType;

export type CardContentType = 'Text' | 'Image' | 'Video' | 'Link' | undefined;
export const cardContentTypes: readonly Exclude<CardContentType, undefined>[] = ["Text", "Image", "Video", "Link"];
export type CardContentFormat = 'String' | 'S3Key' | 'ImageData' | 'VideoData' | 'LocalURI';
export const cardContentFormats: readonly CardContentFormat[] = ["String", "S3Key", "ImageData", "VideoData", "LocalURI"];

export class CardContentModel extends Model implements Omit<ApiCardContent, '__typename'|'type'> {
    /** The type of content. */
    readonly type: CardContentType = undefined;

    /** The value of the content. */
    readonly value: string = '';

    /**
     * Fraction of the CardSide height. Total is able to exceed 1.00.
     * If set, content scales to fit size, otherwise no scaling is applied.
     */
    readonly size: number = 0;

    /** How to interpret the value. */
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
        switch (this.type) {
            case "Link": return validUrl(this.value);
        }
        return this.value.length > 0;
    }

    static fromApi(obj: ApiCardContent) {
        let format: CardContentFormat|undefined;
        if (obj.type === CardSideContentType.Image || obj.type === CardSideContentType.Video) {
            if (obj.value.startsWith('media/')) format = "S3Key";
        }
        return CardContentModel.create({
            size: obj.size || undefined,
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
                case "VideoData": return fileFromVideoData(this.value);
            }
        }
    }
}
export default CardContentModel;
