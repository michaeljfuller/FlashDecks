import {ApiCardContent, CardContentModel} from "./CardContent";
import Model from "./core/Model";

export interface ApiCardSide {
    content?: ApiCardContent[];
}

export class CardSideModel extends Model {
    readonly content = Object.freeze<CardContentModel>([]);

    static fromApi(obj: ApiCardSide) {
        const { content=[] } = obj;
        return (new CardSideModel).update(draft => {
            draft.content = content.map(CardContentModel.fromApi);
        });
    }
}
