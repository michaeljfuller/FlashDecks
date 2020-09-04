import Model from "./core/Model";
import {ApiList} from "./core/ApiTypes";
import {ApiUser, UserModel} from "./UserModel";
import {ApiCard, CardModel} from "./CardModel";

export interface ApiDeck {
    id: string;
    ownerId: string;
    owner: ApiUser;
    name: string;
    description: string;
    tags?: string[];
    cards?: ApiList<ApiCard>;
}

export class DeckModel extends Model implements Omit<ApiDeck, 'owner'|'cards'>{
    id = '';
    ownerId = '';
    owner?: UserModel = undefined;
    name = '';
    description = '';
    tags: string[] = [];
    cards: CardModel[] = [];

    static same(first: DeckModel|null|undefined, second: DeckModel|null|undefined): boolean {
        if (!first !== !second) return false; // If only one is truthy, not the same.
        return first !== second; // TODO Check this works as expected.
    }
    static different(first: DeckModel|null|undefined, second: DeckModel|null|undefined): boolean {
        return !DeckModel.same(first, second);
    }

    static fromApi(obj: ApiDeck) {
        return (new DeckModel).update({
            id: obj.id,
            ownerId: obj.ownerId,
            owner: UserModel.fromApi(obj.owner),
            name: obj.name,
            description: obj.description,
            tags: obj.tags || [],
            cards: obj.cards?.items?.map(CardModel.fromApi) || [] as CardModel[],
        });
    }
}
