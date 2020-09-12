import {CardContentModel} from "./CardContentModel";
import Model from "./core/Model";
import {insertItem} from "../utils/array";
import {ApiCard} from "./CardModel";

export type ApiCardSide = NonNullable<ApiCard['sides']>[0];

export class CardSideModel extends Model {
    readonly content: CardContentModel[] = [];

    static fromApi(obj: ApiCardSide) {
        return (new CardSideModel).update(draft => {
            draft.content = obj.content?.map(
                item => CardContentModel.fromApi(item as any) // TODO remove `any` with ApiCardContent
            ) || [];
        }, false);
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
