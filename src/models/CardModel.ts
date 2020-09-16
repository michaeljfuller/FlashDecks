import {isEqual} from "underscore";
import Model, {ModelUpdate} from "./core/Model";
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

    static create(input: ModelUpdate<CardModel>) {
        return (new CardModel).update(input, false);
    }

    nameOrPlaceholder(placeholder = "Untitled") {
        return this.name || placeholder;
    }

    static same(first: CardModel|null|undefined, second: CardModel|null|undefined): boolean {
        if (!first !== !second) return false; // If only one is truthy, not the same.
        return isEqual(first, second);
    }
    static different(first: CardModel|null|undefined, second: CardModel|null|undefined): boolean {
        return !CardModel.same(first, second);
    }

    static fromApi(obj: ApiCard) {
        return CardModel.create({
            id: obj.id,
            ownerId: obj.ownerId,
            owner: obj.owner ? UserModel.fromApi(obj.owner as ApiUser) : undefined,
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
