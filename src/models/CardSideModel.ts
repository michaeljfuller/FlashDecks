import {CardContentModel} from "./CardContentModel";
import Model, {ModelUpdate} from "./core/Model";
import {insertItem} from "../utils/array";
import {ApiCard} from "./CardModel";

export type ApiCardSide = NonNullable<ApiCard['sides']>[0];

export class CardSideModel extends Model {
    readonly content: CardContentModel[] = [];

    static create(input: ModelUpdate<CardSideModel>) {
        return (new CardSideModel).update(input, false);
    }

    static fromApi(obj: ApiCardSide) {
        return CardSideModel.create(draft => {
            draft.content = obj.content?.map(
                item => CardContentModel.fromApi(item as any) // TODO remove `any` with ApiCardContent
            ) || [];
        });
    }

    setContent(item: CardContentModel, index: number) {
        return this.update(draft => draft.content[index] = item);
    }

    insertContent(item: CardContentModel, index: number) {
        return this.update(draft => {
            draft.content = insertItem(this.content, index, item);
        });
    }

    deleteContent(index: number) {
        return this.update(draft => draft.content.splice(index, 1));
    }
}
