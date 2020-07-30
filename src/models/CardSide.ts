import CardContentModel, {ApiCardContent} from "./CardContent";
import Model from "./Model";

export interface ApiCardSide {
    content: ApiCardContent[];
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
export default CardSideModel;
