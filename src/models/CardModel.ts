import Model from "./core/Model";
import {ApiUser, UserModel} from "./UserModel";
import {ApiCardSide, CardSideModel} from "./CardSideModel";
import {GetCardQuery} from "../API";

export type ApiCard = NonNullable<GetCardQuery['getCard']>;

export class CardModel extends Model implements Omit<ApiCard, '__typename'|'owner'|'sides'|'deck'> {
    readonly id: string = '';
    readonly name: string = '';
    readonly ownerId: string = '';
    readonly owner?: UserModel;
    readonly sides: readonly CardSideModel[] = [];
    readonly popularity: number = 0;
    // readonly deck?: DeckModel; TODO
    readonly deckID: string = '';
    readonly tags: string[] = [];

    nameOrPlaceholder(placeholder = "Untitled") {
        return this.name || placeholder;
    }

    static fromApi(obj: ApiCard) {
        return (new CardModel()).update({
            id: obj.id,
            ownerId: obj.ownerId,
            owner: UserModel.fromApi(obj.owner as ApiUser),
            name: obj.name,
            popularity: obj.popularity || 0,
            deckID: obj.deckID,
            tags: obj.tags || [],
            sides: obj.sides?.map(
                (side: ApiCardSide) => CardSideModel.fromApi(side as ApiCardSide)
            ) || [],
        });
    }
}
