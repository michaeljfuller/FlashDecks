import {ApiCardContent, CardContentModel} from "./CardContentModel";
import Model from "./core/Model";
import {ApiList} from "./core/ApiTypes";
import {insertItem} from "../utils/array";

export interface ApiCardSide {
    content?: ApiList<ApiCardContent>;
}

export class CardSideModel extends Model {
    readonly content = [] as readonly CardContentModel[];

    static fromApi(obj: ApiCardSide) {
        return (new CardSideModel).update(draft => {
            draft.content = obj.content?.items?.map(CardContentModel.fromApi) || [];
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
