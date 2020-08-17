import Model from "./core/Model";

export type CardContentType = 'Text' | 'Image' | 'Video' | 'Link'|undefined;
export const cardContentTypes: readonly Exclude<CardContentType, undefined>[] = ["Text", "Image", "Video", "Link"];

export interface ApiCardContent {
    // A unique ID for the content.
    id: string;
    // The type of content.
    type: CardContentType;
    // The content's value.
    value: string;
    // Fraction of the CardSide height. Total is able to exceed 1.00.
    // If set, content scales to fit size, otherwise no scaling is applied.
    size?: number;
}

export class CardContentModel extends Model implements ApiCardContent {
    readonly id: string = '';
    readonly type: CardContentType = undefined;
    readonly value: string = '';
    readonly size: number = 0;

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
        return (new CardContentModel).update(obj);
    }
}
