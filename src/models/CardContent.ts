import Model from "./Model";

export type CardContentType = 'Text' | 'Image' | 'Video' | 'Link'|undefined;

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

class CardContentModel extends Model implements ApiCardContent {
    readonly id: string = '';
    readonly type: CardContentType = undefined;
    readonly value: string = '';
    readonly size: number = 0;

    static fromApi(obj: ApiCardContent) {
        return (new CardContentModel).update(obj);
    }
}
export default CardContentModel;
