import Model from "./core/Model";
import {ApiUser, UserModel} from "./User";
import {ApiCard, CardModel} from "./Card";

export interface ApiDeck {
    id: string;
    ownerId: string;
    owner: ApiUser;
    name: string;
    description: string;
    tags?: string[];
    cards?: ApiCard[];
}

export class DeckModel extends Model implements Omit<ApiDeck, 'owner'|'cards'>{
    id = '';
    ownerId = '';
    owner?: UserModel = undefined;
    name = '';
    description = '';
    tags: string[] = [];
    cards: CardModel[] = [];

    static fromApi(obj: ApiDeck) {
        return (new DeckModel).update({
            id: obj.id,
            ownerId: obj.ownerId,
            owner: UserModel.fromApi(obj.owner),
            name: obj.name,
            description: obj.description,
            tags: obj.tags,
            cards: obj.cards?.map(CardModel.fromApi) || [] as CardModel[],
        });
    }
}
