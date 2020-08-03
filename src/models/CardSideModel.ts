import {ApiCardContent, CardContentModel} from "./CardContentModel";
import Model from "./core/Model";

export interface ApiCardSide {
    content?: ApiCardContent[];
}

export class CardSideModel extends Model {
    readonly content = [] as readonly CardContentModel[];

    static fromApi(obj: ApiCardSide) {
        const { content=[] } = obj;
        return (new CardSideModel).update(draft => {
            draft.content = content.map(CardContentModel.fromApi);
        });
    }

    setContent(item: CardContentModel, index: number) {
        return this.update(draft => draft.content[index] = item);
    }

    insertContent(item: CardContentModel, index: number) {
        return this.update(draft => {
            draft.content = [
                ...this.content.slice(0, index),
                item,
                ...this.content.slice(index)
            ];
        });
    }

    deleteContent(index: number) {
        return this.update(draft => draft.content.splice(index, 1));
    }
}
