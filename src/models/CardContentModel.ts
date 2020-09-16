import Model, {ModelUpdate} from "./core/Model";
import {ApiCardSide} from "./CardSideModel";

type _ApiCardContent = NonNullable<ApiCardSide["content"]>[0];
export interface ApiCardContent extends _ApiCardContent { // TODO Add `id` and `size` to API.
    // Fraction of the CardSide height. Total is able to exceed 1.00.
    // If set, content scales to fit size, otherwise no scaling is applied.
    size?: number;
}

export type CardContentType = 'Text' | 'Image' | 'Video' | 'Link'|undefined;
export const cardContentTypes: readonly Exclude<CardContentType, undefined>[] = ["Text", "Image", "Video", "Link"];

export class CardContentModel extends Model implements Omit<ApiCardContent, '__typename'|'type'> {
    readonly type: CardContentType = undefined;
    readonly value: string = '';
    readonly size: number = 0;

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
        return CardContentModel.create({
            size: obj.size,
            value: obj.value,
            type: obj.type as any,
        });
    }
}
